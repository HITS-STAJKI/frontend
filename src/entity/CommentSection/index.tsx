import { ActionIcon, Avatar, Box, Center, Flex, Group, Indicator, Loader, MantineColor, Space, Stack, Text, Textarea } from "@mantine/core"
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react"
import { CreateCommentForm } from "features/CreateCommentForm"
import { useEffect, useRef, useState } from "react"
import { MessageDto } from "services/api/api-client.types"
import { useDeleteMessageMutation, useEditMessageMutation, useGetMessagesListQuery } from "services/api/api-client/Messages_in_chatQuery"
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"
import { hashCode } from "shared/lib"
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage"

const AvatarColor: Array<MantineColor> = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']

// type CommentSectionProps = {
//     comments: Array<InterviewsComment>
// }

// export const CommentSection = ({ comments }: CommentSectionProps) => {
//     return (
//         <Container fluid>
//             <Title order={3}>{"Комментарии"}</Title>
//             <Space h='md' />
//             <Stack>
//                 {comments.map(comment => {
//                     return (
//                         <Comment key={comment.id} {...comment} id={comment.id} />
//                     )
//                 })}
//             </Stack>
//             <Space h='md' />
//             <CreateCommentForm id={'some_id'} />
//         </Container >
//     )
// }

function dateFormatter(isoDateStr: string): string {
    if (!isoDateStr) return '';

    const date = new Date(isoDateStr);
    if (isNaN(date.getTime())) return isoDateStr;

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    //const seconds = String(date.getSeconds()).padStart(2, '0');
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

type CommentSectionAltProps = {
    chatId: string;
    height?: string | number;
    refetchStudent?: () => void
};

export const CommentSectionAlt = ({ chatId, height = '50vh', refetchStudent }: CommentSectionAltProps) => {
    const { data, isLoading, error, refetch } = useGetMessagesListQuery(chatId, 0, 10000, undefined);
    const comments = data?.items ?? [];
    const commentsRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (commentsRef.current) {
            commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
        refetchStudent?.()
    }, [comments]);

    return (
        <Flex direction="column" style={{ width: '100%', height }} gap="md">
            {isLoading ? (
                <Center style={{ height: '50vh' }}>
                    <Loader size="lg" />
                </Center>
            ) : (
                <>
                    {error && (
                        <Text color="red" style={{ textAlign: 'center' }} mb="sm">
                            Ошибка загрузки сообщений: {getErrorMessage(error)}
                        </Text>
                    )}
                    <Box ref={commentsRef} style={{ flex: 1, overflowY: 'auto' }}>
                        <Space h="md" />
                        <Stack gap="sm" style={{ width: '100%' }}>
                            {!error && comments.slice().reverse().map(comment => (
                                <Comment
                                    key={comment.id}
                                    {...comment}
                                    id={comment.id ?? ''}
                                    chatId={chatId}
                                    onMessageUpdate={() => {
                                        setTimeout(() => {
                                            refetch().then(scrollToBottom);
                                        }, 1500);
                                    }}
                                />
                            ))}
                        </Stack>
                        <Space h="md" />
                    </Box>
                    <Box style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                        <CreateCommentForm
                            id={chatId}
                            onMessageSent={() => {
                                setTimeout(() => {
                                    refetch().then(scrollToBottom);
                                }, 1500);
                            }}
                        />
                    </Box>

                </>
            )}
        </Flex>
    );
};



export const Comment = ({ id, content, senderId, isRead, isEdited, sentAt, modifiedAt, chatId, onMessageUpdate }: MessageDto & { chatId: string; onMessageUpdate: () => void }) => {
    const { data: author, isLoading, error: authorError } = useGetUserByIdQuery(senderId ?? '');
    const userId = localStorage.getItem('userId');
    const isOwnMessage = senderId === userId;

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(content ?? '');
    const [editError, setEditError] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const { mutate: editMessage } = useEditMessageMutation(chatId, id!, {
        onSuccess: () => {
            setIsEditing(false);
            setEditError(null);
            onMessageUpdate?.();
        },
        onError: (error) => {
            setEditError(getErrorMessage(error));
        },
    });

    const { mutate: deleteMessage } = useDeleteMessageMutation(chatId, id!, {
        onSuccess: () => {
            setDeleteError(null);
            onMessageUpdate?.();
        },
        onError: (error) => {
            setDeleteError(getErrorMessage(error));
        },
    });

    const handleEdit = () => {
        editMessage({ content: editValue });
    };

    return (
        <Group w="100%">
            <Flex align="flex-start" gap="sm" w="100%">
                <Indicator disabled={isRead} size={10} offset={4} position="top-end" color="blue">
                    <Avatar color={AvatarColor[Math.abs(hashCode(id ?? '')) % AvatarColor.length]}>{author?.fullName?.[0]?.toUpperCase() ?? '?'}</Avatar>
                </Indicator>
                <Flex direction="column" maw="90%" style={{ flex: 1 }}>
                    <Group justify="space-between">
                        <Group gap="xs">
                            <Text fw={500}>{isLoading ? 'Загрузка...' : author?.fullName ?? 'Неизвестный'}</Text>
                            <Text c="gray" size="sm">
                                {dateFormatter((modifiedAt ?? sentAt)?.toISOString() ?? '')}
                                {isEdited && ' (изменено)'}
                            </Text>
                        </Group>
                        {isOwnMessage && !isEditing && (userId == senderId) && (
                            <Group gap={4}>
                                <ActionIcon variant="subtle" onClick={() => setIsEditing(true)}>
                                    <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="red" onClick={() => deleteMessage()}>
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>
                        )}
                    </Group>
                    {authorError ? (
                        <Text color="red" size="sm" mb="xs">
                            Ошибка загрузки пользователя: {getErrorMessage(authorError)}
                        </Text>
                    ) : <></>}
                    {deleteError && (
                        <Text color="red" size="sm" mb="xs">
                            {deleteError}
                        </Text>
                    )}
                    {isEditing ? (
                        <Flex direction="column" gap={4} w="100%">
                            <Textarea value={editValue} onChange={(e) => setEditValue(e.currentTarget.value)} autosize minRows={1} w="100%" />
                            <Group gap={4}>
                                <ActionIcon color="green" variant="filled" onClick={handleEdit} disabled={editValue.trim() === ''}>
                                    <IconCheck size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    variant="light"
                                    onClick={() => { setEditValue(content ?? ''); setIsEditing(false); setEditError(null); }}
                                >
                                    <IconX size={16} />
                                </ActionIcon>
                            </Group>
                            {editError && (
                                <Text color="red" size="sm" mt="xs">
                                    {editError}
                                </Text>
                            )}
                        </Flex>
                    ) : (
                        <Text style={{ wordWrap: 'break-word' }}>{content}</Text>
                    )}
                </Flex>
            </Flex>
        </Group>
    );
};