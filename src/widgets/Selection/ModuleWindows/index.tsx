import { Button, Container, Flex, Select, Space, Text, Card } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateSelectionForm, EditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom, TrashSvgrepoCom, SvgCommentIcon } from "assets/icons";
import { CommentSectionAlt } from "entity";
import { useApproveStudentPracticeMutation, useCreateStudentPracticeMutation } from "services/api/api-client/PracticeQuery";
import { useForm } from "@mantine/form";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";
import { useState } from "react";
import { useDeleteInterviewMutation } from "services/api/api-client/InterviewsQuery";
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'

export function CreateSelection({ id, onRefresh }: { id: string; onRefresh?: () => void }) {
    return (
        <Modal
            render={(open) => (
                <Button onClick={() => open()} style={{ padding: '0', minWidth: '9rem' }}>
                    {"Создать отбор"}
                </Button>
            )}
            content={({ close }) => (
                <CreateSelectionForm
                    onSuccess={() => {
                        onRefresh?.();
                        close();
                    }}
                    id={id}
                />
            )}
            title={"Создать отбор"}
        />
    );
}

export function EditSelection({ id, onSuccess }: { id: string, onSuccess: () => void }) {
    return (
        <Modal
            render={open => (
                <Button
                    onClick={() => open()}
                    style={{ padding: '0', aspectRatio: '1 / 1', marginInline: '10px' }}
                >
                    <PencilSvgrepoCom fontSize={'30'} />
                </Button>
            )}
            content={({ close }) => (
                <EditSelectionForm
                    id={id}
                    onSuccess={() => {
                        close();
                        onSuccess();
                    }}
                />
            )}
            title={"Редактировать отбор"}
        />
    );
}

export const DeleteSelection = ({ id, onSuccess }: { id: string; onSuccess: () => void }) => {
    const { mutateAsync, isPending: isDeleting, isError, error } = useDeleteInterviewMutation(id);

    const handleDelete = async (close: () => void) => {
        try {
            await mutateAsync();
            close();
            onSuccess();
        }
        catch { }
    };

    return (
        <Modal
            render={(open) => (
                <Button color="red" onClick={() => open()} style={{ aspectRatio: '1 / 1', padding: 0 }}>
                    <TrashSvgrepoCom fontSize={'27'} />
                </Button>
            )}
            content={({ close }) => (
                <>
                    {isError && (
                        <Text color="red" size="sm" mb="xs">
                            {getErrorMessage(error)}
                        </Text>
                    )}
                    <Button
                        onClick={() => handleDelete(close)}
                        color="red"
                        loading={isDeleting}
                        fullWidth
                    >
                        {'Удалить'}
                    </Button>
                </>
            )}
            title={'Вы уверены, что хотите удалить данный отбор?'}
        />
    );
};

export const SuccedSelection = ({ id, onSuccess }: { id: string, onSuccess: () => void }) => {
    const form = useForm<{ isPaid: 'true' | 'false' }>({
        initialValues: { isPaid: 'false' }
    });

    const { mutateAsync, isPending, isError, error } = useCreateStudentPracticeMutation();

    const handleSucced = (close: () => void) => {
        return async ({ isPaid }: { isPaid: 'true' | 'false' }) => {
            try {
                await mutateAsync({ interviewId: id, isPaid: isPaid === "true" });
                close();
                onSuccess();
            }
            catch (err) { }
        };
    };

    return (
        <Modal
            render={open =>
                <Button color="#1cac78" onClick={() => open()} className="PRACTICE">
                    {"Пройти практику"}
                </Button>}
            content={({ close }) =>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(handleSucced(close))}>
                    <Select
                        data={[
                            { value: 'true', label: 'Оплачиваемая' },
                            { value: 'false', label: 'Не оплачиваемая' }
                        ]}
                        defaultValue={'true'}
                        key={form.key('isPaid')}
                        {...form.getInputProps('isPaid')}
                    />

                    {isError && (
                        <Text color="red" size="sm">
                            {getErrorMessage(error)}
                        </Text>
                    )}

                    <Button type="submit" color="green" loading={isPending}>
                        {'Подтвердить'}
                    </Button>
                </form>
            }
            title={'Вы уверены, что хотите проходить практику здесь?'}
        />
    );
};


export const SuccedTeacherSelection = ({ id }: { id: string }) => {
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient()

    const mutation = useApproveStudentPracticeMutation(id);

    const handleSucced = async (close: () => void) => {
        setLoading(true);
        setError(null);
        try {
            await mutation.mutateAsync();
            await queryClient.invalidateQueries({
                queryKey: QueryFactory.PracticeQuery.getPracticeRequestsQueryKey().slice(-1, 0)
            })
            close();
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Modal render={(open) => (
            <span onClick={() => open()} style={{ whiteSpace: "nowrap", borderRadius: "5px", aspectRatio: "1 / 1", padding: "0px", margin: "0px", fontSize: "24px", cursor: "pointer" }} >
                ✅
            </span>
        )}
            content={({ close }) => (
                <>
                    {error && (
                        <Card mt="md" p="md" style={{ backgroundColor: "#ffe6e6", borderRadius: 6, width: "100%" }} >
                            <Text color="red" size="sm" style={{ textAlign: "center" }}>
                                Ошибка: {getErrorMessage(error)}
                            </Text>
                        </Card>
                    )}
                    <Button mt="md" fullWidth onClick={() => handleSucced(close)} color="green" loading={loading} disabled={loading} >
                        Подтвердить
                    </Button>
                </>
            )}
            title="Подтвердить практику студента?"
        />
    );
};

export const CommentSelection = ({ id, refetchStudent }: { id: string, refetchStudent?: () => void }) => {
    return (
        <Modal
            render={open => <Button color="green" onClick={() => open()} style={{
                padding: '0',
                aspectRatio: '1 / 1'
            }}>{<SvgCommentIcon fontSize={'30'} />}</Button>}
            content={() => (
                <Flex direction="column" style={{ width: '100%' }} gap="md" mb="md">
                    <Container fluid w="100%">
                        <Space h="md" />
                        <Messages id={id} refetchStudent={refetchStudent} />
                        <Space h="md" />
                    </Container>
                </Flex>
            )}
            title={'Комментарии'}
            size={"fullscreen"}
        />
    );
}

const Messages = ({ id, refetchStudent }: { id: string, refetchStudent?: () => void }) => {
    return (
        <CommentSectionAlt chatId={id} height="50vh" refetchStudent={refetchStudent} />
    )
}