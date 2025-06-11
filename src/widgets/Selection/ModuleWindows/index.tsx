import { Button, Container, Flex, Space, Stack, Title } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateSelectionForm, EditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom, TrashSvgrepoCom, SvgCommentIcon } from "assets/icons";
import { CreateCommentForm } from "features/CreateCommentForm";
import { useEffect, useState } from "react";
import { GET_INTERVIEWS_COMMENTS, InterviewsComment } from "shared/lib";
import { Comment } from "entity";


export function CreateSelection({ id }: { id : string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                minWidth: '9rem'}}>{"Создать отбор"}</Button>}
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

export function EditSelection({ id }: { id : string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                aspectRatio: '1 / 1', marginInline: '10px' }}>{<PencilSvgrepoCom fontSize={'30'}/>}</Button>}
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

export const DeleteSelection = ({ id }: { id : string }) => {

    const handleDelete = (close: () => void) => {
        console.log(`Тело запроса удаления ${id}:`);
        close()
    }
    return (
        <Modal
            render={open => <Button color="red" onClick={() => open()} style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom fontSize={'27'}/>
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
            title={'Вы уверены, что хотите удалить данный отбор?'}
        />

    )
}

export const SuccedSelection = ({ id }: { id : string }) => {

    const handleSucced = (close: () => void) => {
        console.log(`Тело запроса подтверждения ${id}:`);
        close()
    }
    return (
        <Modal
            render={open => 
            <Button color="#1cac78" onClick={() => open()} className={"PRACTICE"}>
                {"Пройти практику"}
            </Button>}
            content={({ close }) => <Button onClick={() => handleSucced(close)} color='green'>{'Подтвердить'}</Button>}
            title={'Вы уверены, что хотите проходить практику здесь?'}
        />

    )
}

export const CommentSelection = ({ id }: { id : string }) => {
    const [comments, setComments] = useState<InterviewsComment[]>([]);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if (opened) {
            console.log(`Отправляем запрос на получение комментариев ${id}:`);
            fetchComments(id).then(data =>
            {
                setComments(data);
            });
        }
    }, [opened, id]);

    const fetchComments = async (reportId: string): Promise<InterviewsComment[]> => 
    {
        return new Promise((resolve) => {
            setTimeout(() => resolve(GET_INTERVIEWS_COMMENTS.items), 1000);
        });
    };

    return (
        <Modal
            render={open => <Button color="green" onClick={() => {open(); setOpened(true)}} style={{ padding: '0', 
                aspectRatio: '1 / 1'}}>{<SvgCommentIcon fontSize={'30'}/>}</Button>}
            content={({ close }) => (
                <Flex direction="column" style={{ width: '100%' }} gap="md" mb="md">
                    <Container fluid w="100%">
                        <Space h="md" />
                        <Stack>
                            {comments.map(comment => (
                                <Comment key={comment.id} {...comment} id={comment.id} />
                            ))}
                        </Stack>
                        <Space h="md" />
                        <CreateCommentForm id={'some_id'} />
                    </Container>
                </Flex>
            )}
            title={<Title order={3}>Комментарии</Title>}
            size={"lg"}
        />
    );
}