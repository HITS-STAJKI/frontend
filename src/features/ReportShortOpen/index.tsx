import { useEffect, useState } from "react";
import { Button, Container, Space, Stack, Title, Group, Flex } from "@mantine/core";
import { Modal } from '@mantine/core';
import { DocSvgrepoCom } from "assets/icons";

import { Comment } from "entity";
import { GET_INTERVIEWS_COMMENTS, InterviewsComment } from "shared/lib";
import { CreateCommentForm } from "features/CreateCommentForm";

type ReportIdProps = {
    id: string;
};

export const ReportShortOpen = ({ id }: ReportIdProps) => {
    const [opened, setOpened] = useState(false);
    const [comments, setComments] = useState<InterviewsComment[]>([]);

    const [buttonState, setButtonState] = useState<'attach' | 'edit' | 'document'>();

    useEffect(() => 
    {
        if (opened) 
        {
            fetchComments(id).then(data =>
            {
                setComments(data);
            });
        }
    }, [opened, id]);

    useEffect(() => 
    {
        {
            //TODO: Сделать отображжение кнопок от роли
        }
        
        const states: ('attach' | 'edit' | 'document')[] = ['attach', 'edit', 'document'];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setButtonState(randomState);
    }, []);

    const fetchComments = async (reportId: string): Promise<InterviewsComment[]> => 
    {
        return new Promise((resolve) => {
            setTimeout(() => resolve(GET_INTERVIEWS_COMMENTS.content), 1000);
        });
    };

    const renderOpenButton = () => {
        switch (buttonState) {
        case 'attach':
            return (
                <Button color="green"  size="sm" onClick={() => setOpened(true)}>
                    Прикрепить
                </Button>
            );
        case 'edit':
            return (
                <Button variant="light" size="sm" onClick={() => setOpened(true)}>
                    Изменить
                </Button>
            );
        case 'document':
            return (
                <Button component="a" href="/path/to/file.pdf" target="_blank" size="sm" rel="noopener noreferrer" variant="default">
                    Документ
                </Button>
            );
        default:
            return null;
        }
    };

    return (
        <>
            {renderOpenButton()}

            <Modal opened={opened} onClose={() => setOpened(false)} title={<Title order={2}>Отчёт</Title>} size="xl">
                <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                {/* Тут оставил фиксированные кнопки для примера, нужно сделать условными */}
                    <Button color="green" size="xs">
                        Прикрепить
                    </Button>
                    <Button component="a" href="/path/to/file.pdf"  download variant="outline" size="xs" color="blue">
                        Скачать файл
                    </Button>
                </Group>

                <Flex direction="column" style={{ width: '100%' }} gap="md" mb="md">
                    <Container fluid w="100%">
                        <Title order={3}>Комментарии</Title>
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

                <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <Button variant="light" onClick={() => setOpened(false)}>
                        Отменить
                    </Button>
                    <Button color="blue">Сохранить</Button>
                </Group>
            </Modal>
        </>
    );
};
