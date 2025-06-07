import { Button, Container, Space, Stack, Title } from "@mantine/core"
import { DocSvgrepoCom } from "assets/icons"

import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Flex } from '@mantine/core';

import { Comment } from "entity"
import { GET_INTERVIEWS_COMMENTS, InterviewsComment } from "shared/lib";
import { CreateCommentForm } from "features/CreateCommentForm";
import { useEffect, useState } from "react";

type ReportIdProps = {
  id: string;
};

export const ReportOpen = ({ id }: ReportIdProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [comments, setComments] = useState<InterviewsComment[]>([]);
  const [loading, setLoading] = useState(false);
  const showAttach = true;

  useEffect(() => {
    if (opened) {
      setLoading(true);
      fetchComments(id)
        .then((data) => {
          setComments(data);
        })
        .finally(() => setLoading(false));
    }
  }, [opened, id]);

  const fetchComments = async (reportId: string): Promise<InterviewsComment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return setComments(GET_INTERVIEWS_COMMENTS.content);
      }, 1000);
    });
  };

    return (
        <>
            <Button color="green" onClick={open} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <span style={{ fontSize: '2em' }}>
                    <DocSvgrepoCom />
                </span>
            </Button>

            <Modal opened={opened} onClose={close} title={<Title order={2}>Отчёт</Title>} size="xl">
                <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                {showAttach ? (
                    <Button color="green" size="xs">
                        Прикрепить
                    </Button>
                ) : (
                    <Button variant="light" size="xs">
                        Изменить
                    </Button>
                )}
                <Button
                    component="a"
                    href="/path/to/file.pdf"
                    download
                    variant="outline"
                    size="xs"
                    color="blue"
                >
                    {
                    //TODO переделать под нормальное скачивание
                    }
                    Скачать файл
                </Button>
                </Group>

                <Flex direction="column" style={{width:'100%'}} gap="md" mb="md">
                    <Container fluid>
                        <Title order={3}>{"Комментарии"}</Title>
                        <Space h='md' />
                        <Stack>
                            {comments.map(comment => {
                                return (
                                    <Comment key={comment.id} {...comment} id={comment.id} />
                                )
                            })}
                        </Stack>
                        <Space h='md' />
                        <CreateCommentForm id={'some_id'} />
                    </Container >
                </Flex>

                <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <Button variant="light" onClick={close}>
                        Отменить
                    </Button>
                    <Button color="blue">Сохранить</Button>
                </Group>
            </Modal>
        </>
    );
};
