import { Button, Card, Center, Container, FileInput, Loader, Select, Space, Text, Tooltip } from "@mantine/core"
import { DocSvgrepoCom } from "assets/icons"

import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Flex } from '@mantine/core';

import { CommentSectionAlt } from "entity"
import { useAttachFileToReportMutationWithParameters, useGetPracticeReportQuery, useSetGradeMutationWithParameters, useUnattachFileFromReportMutationWithParameters } from "services/api/api-client/Practice_reportsQuery";
import { downloadFileUrl, useDeleteFileMutationWithParameters, useGetFileMetadataQuery, useUploadFileMutation } from "services/api/api-client/FilesQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";
import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ReportId } from "services/api/api-client.types";
import { useGetStudentsByIdsMutation } from "services/api/api-client/StudentQuery";

type ReportIdProps = {
    practiceId: string;
    studentId: string;
};

export const ReportOpenModal = ({ practiceId, studentId, opened, onClose }: ReportIdProps & { opened: boolean; onClose: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { data: report, isLoading: reportLoading, isError: isReportError, error: reportError } = useGetPracticeReportQuery(practiceId, { enabled: opened });

    const { data: fileMetadata, isLoading: fileLoading, isError: fileError } = useGetFileMetadataQuery(report?.fileId ?? '', { enabled: !!report?.fileId && opened });

    const [grade, setGrade] = useState<string | null>(report?.grade?.toString() ?? null);
    const [originalGrade, setOriginalGrade] = useState<string | null>(report?.grade?.toString() ?? null);

    const [chatId, setChatId] = useState<string | null>(null);

    const [mutationError, setMutationError] = useState<string | null>(null);

    const uploadMutation = useUploadFileMutation();
    const attachMutation = useAttachFileToReportMutationWithParameters();
    const unattachMutation = useUnattachFileFromReportMutationWithParameters();
    const deleteMutation = useDeleteFileMutationWithParameters();
    const setGradeMutation = useSetGradeMutationWithParameters();
    const getStudentMutation = useGetStudentsByIdsMutation();


    useEffect(() => {
        if (report?.grade !== undefined && report?.grade !== null) 
        {
            const gradeStr = report.grade.toString();
            setGrade(gradeStr);
            setOriginalGrade(gradeStr);
        }
    }, [report]);

    useEffect(() => {
        if (opened && studentId) 
        {
            setMutationError(null);
            getStudentMutation.mutateAsync([studentId])
                .then((res) => {
                    const student = res?.[0];
                    setChatId(student?.chatId ?? null);
                })
                .catch((err) => {
                    const msg = getErrorMessage(err);
                    setMutationError(`Ошибка получения chatId: ${msg}`);
                });
        }
    }, [opened, studentId]);

    useEffect(() => {
        if (!opened) 
        {
            setMutationError(null);
        }
    }, [opened]);

    const handleDownload = () => {
        if (report?.fileId) 
        {
            const url = downloadFileUrl(report.fileId);
            window.open(url, '_blank');
        }
    };

    const handleAttach = async () => {
        if (!selectedFile || !report)
        {
            return;
        }

        setMutationError(null);
        try 
        {
            const data = await selectedFile.arrayBuffer();
            const fileParameter = {
                file: 
                {
                    data: new Uint8Array(data),
                    fileName: selectedFile.name,
                }
            };

            const uploadedFile = await uploadMutation.mutateAsync(fileParameter);
            if (!uploadedFile.id) 
            {
                throw new Error("ID загруженного файла отсутствует");
            }

            await attachMutation.mutateAsync({
                reportId: report.id as unknown as ReportId,
                fileId: uploadedFile.id
            });
        } 
        catch (err) 
        {
            const msg = getErrorMessage(err);
            setMutationError(`Ошибка прикрепления файла: ${msg}`);
        }
    };

    const handleReplace = async () => {
        if (!selectedFile || !report || !report.fileId)
        {
            return;
        }

        setMutationError(null);
        try 
        {
            await unattachMutation.mutateAsync({ reportId: { reportId: report.id } });
            await deleteMutation.mutateAsync({ id: report.fileId });

            const data = await selectedFile.arrayBuffer();
            const fileParameter = {
                file: 
                {
                    data: new Uint8Array(data),
                    fileName: selectedFile.name,
                }
            };
            const uploadedFile = await uploadMutation.mutateAsync(fileParameter);
            if (!uploadedFile.id) 
            {
                throw new Error("ID загруженного файла отсутствует");
            }

            await attachMutation.mutateAsync({
                reportId: report.id as unknown as ReportId,
                fileId: uploadedFile.id
            });
        } 
        catch (err) 
        {
            const msg = getErrorMessage(err);
            setMutationError(`Ошибка замены файла: ${msg}`);
        }
    };

    const handleGradeChange = (value: string | null) => {
        setGrade(value);
    };

    const handleGradeSubmit = async () => {
        if (!report || !grade) return;

        setMutationError(null);
        try 
        {
            await setGradeMutation.mutateAsync({
                reportId: report.id as unknown as ReportId,
                grade: parseInt(grade),
            })
            setOriginalGrade(grade);
        } 
        catch (err) 
        {
            const msg = getErrorMessage(err);
            setMutationError(`Ошибка изменения оценки: ${msg}`);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<Text size="xl" style={{ fontWeight: 700 }}>Отчёт</Text>} size="xl">
            {reportLoading ? (
                <Center mt="md"><Loader /></Center>
            ) : isReportError ? (
                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6' }}>
                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>Ошибка: {getErrorMessage(reportError)}</Text>
                </Card>
            ) : (
                <div style={{ width: '100%' }}>
                    <Group style={{ width: '80%', margin: '0 auto', justifyContent: 'space-between', marginBottom: '1rem' }} align="center" >
                        <Flex align="center" gap="sm" style={{ width: '100%' }}>
                            <Text style={{ flex: '1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700 }} > Отчет:</Text>
                            <FileInput
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(file) => setSelectedFile(file)}
                                disabled={uploadMutation.isPending || deleteMutation.isPending}
                                label={null}
                                style={{  flex: '2', minWidth: 0 }}
                            />
                            {!report?.fileId ? (
                                <Button
                                    color="green"
                                    size="xs"
                                    onClick={handleAttach}
                                    disabled={!selectedFile || uploadMutation.isPending}
                                    style={{
                                        flex: '1',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {uploadMutation.isPending ? 'Загрузка...' : 'Прикрепить'}
                                </Button>
                            ) : (
                                <Button
                                    size="xs"
                                    variant="default"
                                    color="gray"
                                    onClick={handleReplace}
                                    disabled={ !selectedFile || uploadMutation.isPending || deleteMutation.isPending || unattachMutation.isPending }
                                    style={{ flex: '1', whiteSpace: 'nowrap' }}
                                >
                                    {(uploadMutation.isPending || deleteMutation.isPending || unattachMutation.isPending) ? 'Заменяется...' : 'Изменить'}
                                </Button>
                            )}
                        </Flex>
                        {report?.fileId && (
                            fileLoading ? (
                                <Loader size="xs" />
                            ) : fileError ? (
                                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6' }}>
                                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                                        Ошибка загрузки файла: {getErrorMessage(reportError)}
                                    </Text>
                                </Card>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        size="xs"
                                        color="blue"
                                        leftSection={<IconDownload size={16} />}
                                        onClick={handleDownload}
                                    >
                                        {fileMetadata?.name ?? 'Скачать файл'}
                                    </Button>
                                    <Flex align="center" gap="sm" mt="sm">
                                        <Select
                                            label="Оценка за отчёт"
                                            placeholder="Выберите оценку"
                                            data={['2', '3', '4', '5']}
                                            value={grade}
                                            onChange={handleGradeChange}
                                            disabled={setGradeMutation.isPending}
                                            allowDeselect={false}
                                            size="xs"
                                            style={{ maxWidth: 120 }}
                                        />
                                        <Button
                                            size="xs"
                                            variant="filled"
                                            color="orange"
                                            onClick={handleGradeSubmit}
                                            disabled={!grade || grade === originalGrade || setGradeMutation.isPending}
                                        >
                                            {setGradeMutation.isPending ? 'Сохраняем...' : 'Изменить оценку'}
                                        </Button>
                                    </Flex>
                                </>
                            )
                        )}
                        {mutationError && (
                            <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6' }}>
                                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                                    {mutationError}
                                </Text>
                            </Card>
                        )}
                    </Group>
                    <Flex direction="column" style={{ width: '100%' }} gap="md" mb="md" align="center">
                        <div style={{ width: '95%' }}>
                            <Text size="xl" mb="md">Комментарии:</Text>
                            <Space h="md" />
                            {chatId ? (
                                <CommentSectionAlt chatId={chatId} height="50vh" />
                            ) : (
                                <Center style={{ height: '50vh' }}>
                                    <Loader size="lg" />
                                </Center>
                            )}
                        </div>
                    </Flex>
                    <Group style={{ justifyContent: 'space-between' }}>
                        <Button variant="light" onClick={onClose} style={{width: '100%'}}>Отменить</Button>
                    </Group>
                </div>
            )}
        </Modal>
    );
};

export const ReportOpen = ({ practiceId, studentId }: ReportIdProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Tooltip label="Просмотреть отчёт" withArrow position="top">
                <Button color="green" onClick={open} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }} >
                    <span style={{ fontSize: '2em' }}>
                        <DocSvgrepoCom />
                    </span>
                </Button>
            </Tooltip>

            <ReportOpenModal practiceId={practiceId} studentId={studentId} opened={opened} onClose={close} />
        </>
    );
};