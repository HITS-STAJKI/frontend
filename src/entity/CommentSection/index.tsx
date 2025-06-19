import { ActionIcon, Avatar, Container, Flex, Group, Indicator, MantineColor, Space, Stack, Text, Textarea, Title } from "@mantine/core"
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react"
import { CreateCommentForm } from "features/CreateCommentForm"
import { useEffect, useState } from "react"
import { MessageDto } from "services/api/api-client.types"
import { useDeleteMessageMutation, useEditMessageMutation } from "services/api/api-client/Messages_in_chatQuery"
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"
import { hashCode, InterviewsComment } from "shared/lib"

const AvatarColor: Array<MantineColor> = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']

type CommentSectionProps = {
    comments: Array<InterviewsComment>
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
    return (
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
    )
}

function dateFormatter(isoDateStr: string): string {
  if (!isoDateStr) return '';

  const date = new Date(isoDateStr);
  if (isNaN(date.getTime())) return isoDateStr;

  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${minutes}:${seconds} ${year}.${month}.${day}`;
}


export const Comment = ({ id, content, senderId, isRead, isEdited, sentAt, modifiedAt, chatId, onMessageUpdate }: MessageDto & { chatId: string; onMessageUpdate: () => void }) => {
    const { data: author, isLoading } = useGetUserByIdQuery(senderId ?? '');
    const userId = localStorage.getItem('userId');
    const isOwnMessage = senderId === userId;
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(content ?? '');

    const { mutate: editMessage } = useEditMessageMutation(chatId, id!, {
        onSuccess: () => {
            setIsEditing(false);
            onMessageUpdate?.();
        }
    });

    const { mutate: deleteMessage } = useDeleteMessageMutation(chatId, id!, {
        onSuccess: () => {
            onMessageUpdate?.();
        }
    });
    const handleEdit = () => {
        editMessage({ content: editValue });
    };

    return (
        <Group w="100%"> 
            <Flex align="flex-start" gap="sm" w="100%">
                <Indicator disabled={isRead} size={10} offset={4} position="top-end" color="blue">
                    <Avatar color={AvatarColor[Math.abs(hashCode(id ?? '')) % AvatarColor.length]}>
                        {author?.fullName?.[0]?.toUpperCase() ?? '?'}
                    </Avatar>
                </Indicator>
                <Flex direction="column" maw="32rem" style={{ flex: 1 }}>
                    <Group justify="space-between">
                        <Group gap="xs">
                            <Text fw={500}>
                                {isLoading ? 'Загрузка...' : author?.fullName ?? 'Неизвестный'}
                            </Text>
                            <Text c="gray" size="sm">
                                {dateFormatter((modifiedAt ?? sentAt)?.toISOString() ?? '')}
                                {isEdited && ' (изменено)'}
                            </Text>
                        </Group>
                        {isOwnMessage && !isEditing && (
                            <Group gap={4}>
                                <ActionIcon variant="subtle" onClick={() => setIsEditing(true)}>
                                    <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="red" onClick={() => deleteMessage()} >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>
                        )}
                    </Group>
                    {isEditing ? (
                        <Flex direction="column" gap={4} w="100%">
                            <Textarea value={editValue} onChange={(e) => setEditValue(e.currentTarget.value)} autosize minRows={1} w="100%" />
                            <Group gap={4}>
                                <ActionIcon color="green" variant="filled" onClick={handleEdit} disabled={editValue.trim() === ''} >
                                    <IconCheck size={16} />
                                </ActionIcon>
                                <ActionIcon variant="light" onClick={() => { setEditValue(content ?? ''); setIsEditing(false); }}>
                                    <IconX size={16} />
                                </ActionIcon>
                            </Group>
                        </Flex>
                    ) : (
                        <Text style={{ wordWrap: 'break-word' }}>{content}</Text>
                    )}
                </Flex>
            </Flex>
        </Group>
    );
};