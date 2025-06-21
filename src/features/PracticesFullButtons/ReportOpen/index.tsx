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

type ReportIdProps = {
    practiceId: string;
};

export const ReportOpenModal = ({ practiceId, opened, onClose }: ReportIdProps & { opened: boolean; onClose: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { data: report, isLoading: reportLoading, isError: isReportError, error: reportError } = useGetPracticeReportQuery(practiceId, { enabled: opened });

    const { data: fileMetadata, isLoading: fileLoading, isError: fileError } = useGetFileMetadataQuery(report?.fileId ?? '', { enabled: !!report?.fileId && opened });

    const [grade, setGrade] = useState<string | null>(report?.grade?.toString() ?? null);
    const [originalGrade, setOriginalGrade] = useState<string | null>(report?.grade?.toString() ?? null);

    useEffect(() => {
        if (report?.grade !== undefined && report?.grade !== null) 
        {
            const gradeStr = report.grade.toString();
            setGrade(gradeStr);
            setOriginalGrade(gradeStr);
        }
    }, [report]);


    const uploadMutation = useUploadFileMutation();
    const attachMutation = useAttachFileToReportMutationWithParameters();
    const unattachMutation = useUnattachFileFromReportMutationWithParameters();
    const deleteMutation = useDeleteFileMutationWithParameters();
    const setGradeMutation = useSetGradeMutationWithParameters();

    const handleDownload = () => {
        if (report?.fileId) 
        {
            const url = downloadFileUrl(report.fileId);
            window.open(url, '_blank');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) 
        {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAttach = async () => {
        if (!selectedFile || !report)
        {
            return;
        }

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
            console.error("Ошибка прикрепления файла:", err);
        }
    };

    const handleReplace = async () => {
        if (!selectedFile || !report || !report.fileId)
        {
            return;
        }

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
            console.error("Ошибка замены файла:", err);
        }
    };

    const handleGradeChange = (value: string | null) => {
        setGrade(value);
    };

    const handleGradeSubmit = async () => {
        if (!report || !grade) return;

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
            console.error("Ошибка при сохранении оценки:", err);
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
                        <Group style={{ alignItems: 'center' }}>
                            <Text style={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 0, }} >
                                Отчет
                            </Text>
                            <FileInput
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                mb="xs"
                                onChange={(file) => setSelectedFile(file)}
                                disabled={uploadMutation.isPending || deleteMutation.isPending}
                                style={{ flexGrow: 1, minWidth: 0 }}
                                label={null}
                            />
                            {!report?.fileId ? (
                                <Button
                                    color="green"
                                    size="xs"
                                    onClick={handleAttach}
                                    disabled={!selectedFile || uploadMutation.isPending}
                                >
                                    {uploadMutation.isPending ? 'Загрузка...' : 'Прикрепить'}
                                </Button>
                            ) : (
                                <Button
                                    size="xs"
                                    variant="default"
                                    color="gray"
                                    onClick={handleReplace}
                                    disabled={!selectedFile || uploadMutation.isPending || deleteMutation.isPending || unattachMutation.isPending}
                                >
                                    {(uploadMutation.isPending || deleteMutation.isPending || unattachMutation.isPending) ? 'Заменяется...' : 'Изменить'}
                                </Button>
                            )}
                            </Group>
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
                    </Group>
                    <Flex direction="column" style={{ width: '100%' }} gap="md" mb="md" align="center">
                        <div style={{ width: '80%' }}>
                            <Text size="xl" mb="md"> Комментарии </Text>
                            <Space h="md" />
                            <CommentSectionAlt chatId="chatId" height="50vh" />
                        </div>
                    </Flex>
                    <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <Button variant="light" onClick={onClose}>Отменить</Button>
                    </Group>
                </div>
            )}
        </Modal>
    );
};

export const ReportOpen = ({ practiceId }: ReportIdProps) => {
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

            <ReportOpenModal practiceId={practiceId} opened={opened} onClose={close} />
        </>
    );
};