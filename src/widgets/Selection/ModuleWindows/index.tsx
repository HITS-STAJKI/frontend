import { Button, Container, Flex, Select, Space } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateSelectionForm, EditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom, TrashSvgrepoCom, SvgCommentIcon } from "assets/icons";
import { CommentSectionAlt } from "entity";
import { useApproveStudentPracticeMutation, useCreateStudentPracticeMutation } from "services/api/api-client/PracticeQuery";
import { useGetInterviewListQuery } from "services/api/api-client/InterviewsQuery";
import { useForm } from "@mantine/form";


export function CreateSelection({ id }: { id: string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{
                padding: '0',
                minWidth: '9rem'
            }}>{"Создать отбор"}</Button>}
            content={({ close }) => (
                <CreateSelectionForm
                    onSuccess={() => close()}
                    id={id}
                />
            )}
            title={"Создать отбор"}
        />
    );
}

export function EditSelection({ id }: { id: string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{
                padding: '0',
                aspectRatio: '1 / 1', marginInline: '10px'
            }}>{<PencilSvgrepoCom fontSize={'30'} />}</Button>}
            content={({ close }) => (
                <EditSelectionForm
                    onSuccess={() => close()}
                    id={id}
                />
            )}
            title={"Редактировать отбор"}
        />
    );
}

export const DeleteSelection = ({ id }: { id: string }) => {

    const handleDelete = (close: () => void) => {
        console.log(`Тело запроса удаления ${id}:`);
        close()
    }
    return (
        <Modal
            render={open => <Button color="red" onClick={() => open()} style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom fontSize={'27'} />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
            title={'Вы уверены, что хотите удалить данный отбор?'}
        />

    )
}

export const SuccedSelection = ({ id }: { id: string }) => {

    const form = useForm<{ isPaid: 'true' | 'false' }>({
        initialValues: {
            isPaid: 'false'
        }
    })
    const { mutateAsync } = useCreateStudentPracticeMutation()
    const handleSucced = (close: () => void) => {
        return ({ isPaid }: { isPaid: 'true' | 'false' }) => {
            mutateAsync({ interviewId: id, isPaid: isPaid === "true" ? true : false }).then(() => {
                close()
            })
        }
    }
    return (
        <Modal
            render={open =>
                <Button color="#1cac78" onClick={() => open()} className={"PRACTICE"}>
                    {"Пройти практику"}
                </Button>}
            content={({ close }) =>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(handleSucced(close))}>
                    <Select data={[{ value: 'true', label: 'Оплачиваемая' }, { value: 'false', label: 'Не оплачиваемая' }]} defaultValue={'true'} key={form.key('isPaid')} {...form.getInputProps('isPaid')} />
                    <Button type='submit' color='green'>{'Подтвердить'}</Button>
                </form>
            }
            title={'Вы уверены, что хотите проходить практику здесь?'}
        />

    )
}

export const SuccedTeacherSelection = ({ id }: { id: string }) => {
    const { mutateAsync } = useApproveStudentPracticeMutation(id)
    const { refetch } = useGetInterviewListQuery()
    const handleSucced = (close: () => void) => {
        console.log(`"${id}"`)
        mutateAsync().then(() => {
            refetch()
        }).then(() => close())

    }
    return (
        <Modal
            render={open =>
                <span color="#1cac78" onClick={() => open()} style={{
                    whiteSpace: 'nowrap',
                    borderRadius: '5px', aspectRatio: '1 / 1', padding: "0px", margin: "0px", fontSize: '24px', cursor: 'pointer'
                }}>
                    {"✅"}
                </span>}
            content={({ close }) => <Button onClick={() => handleSucced(close)} color='green'>{'Подтвердить'}</Button>}
            title={'Подтвердить практику студента?'}
        />

    )
}

export const CommentSelection = ({ id }: { id: string }) => {
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
                        <Messages id={id} />
                        <Space h="md" />
                    </Container>
                </Flex>
            )}
            title={'Комментарии'}
            size={"fullscreen"}
        />
    );
}

const Messages = ({ id }: { id: string }) => {
    return (
        <CommentSectionAlt chatId={id} height="50vh" />
    )
}