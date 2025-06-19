import { Box, Card, Center, Checkbox, Container, Flex, Grid, Loader, Modal, Space, Stack, Text, Title } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { Comment } from "entity"
import { CreateCommentForm } from "features/CreateCommentForm";
import { GET_INTERVIEWS_COMMENTS, InterviewsComment } from "shared/lib";
import { useGetMessagesListQuery } from "services/api/api-client/Messages_in_chatQuery";

interface StudentProps {
    index: number,
    studentId: string,
    userId: string,
    fullName: string,
    groupNumber?: string,
    lastLoginDate: Date,
    unreadMessagesCount?: number,
    chatId: string,
    isSelected: boolean,
    onToggleSelect: () => void,
}

export function StudentListCard({ index, studentId, userId, fullName, groupNumber, lastLoginDate, unreadMessagesCount, chatId, isSelected, onToggleSelect }: StudentProps) {
    const [modalOpened, setModalOpened] = useState(false);

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).closest('input, button, svg')) {
            return;
        }
        setModalOpened(true);
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Card key={studentId} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex', cursor: 'pointer', transition: 'box-shadow 0.2s ease, background-color 0.2s ease', boxShadow: isHovered ? '0 0 10px rgba(0,0,0,0.1)' : undefined, backgroundColor: isHovered ? '#f9f9f9' : undefined }} onClick={handleCardClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Box style={{ width: '40px', textAlign: 'center' }}><Text>{index}</Text></Box>
                    <Box style={{ width: '40px', textAlign: 'center' }}>
                        <Checkbox size="sm" checked={isSelected} onChange={onToggleSelect} onClick={(e) => e.stopPropagation()} />
                    </Box>
                    <Grid style={{ width: '100%' }}>
                        <Grid.Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</Text>
                        </Grid.Col>
                        <Grid.Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{groupNumber}</Text>
                        </Grid.Col>
                        <Grid.Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {lastLoginDate ? lastLoginDate.toLocaleString() : ''}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {unreadMessagesCount ? (unreadMessagesCount > 9 ? '9+' : unreadMessagesCount) : 0}
                            </Text>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>

            <StudentCommentsModal opened={modalOpened} onClose={() => setModalOpened(false)} chatId={chatId} />
        </>
    );
}

export function StudentListCardEmpty() {
    return (
        <>
            <Card shadow="sm" style={{ width: '100%', height: '64px', display: 'flex', transition: 'box-shadow 0.2s ease, background-color 0.2s ease', backgroundColor: undefined }} >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Box style={{ width: '40px', textAlign: 'center' }}></Box>
                    <Box style={{ width: '40px', textAlign: 'center' }}></Box>
                    <Grid style={{ width: '100%' }}>
                        <Grid.Col style={{ whiteSpace: 'pre', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text>{"                                                   "}</Text>
                        </Grid.Col>
                        <Grid.Col style={{ whiteSpace: 'pre', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text>{"                                                   "}</Text>
                        </Grid.Col>
                        <Grid.Col style={{ whiteSpace: 'pre', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text>{"                                                   "}</Text>
                        </Grid.Col>
                        <Grid.Col style={{ whiteSpace: 'pre', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text>{"                                                   "}</Text>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>
        </>
    );
}




interface StudentCommentsModalProps {
    opened: boolean;
    onClose: () => void;
    chatId: string;
}

export function StudentCommentsModal({ opened, onClose, chatId }: StudentCommentsModalProps) {
    const { data, isLoading, error, refetch } = useGetMessagesListQuery(chatId, 0, 10000, undefined, { enabled: opened });
    const comments = data?.items ?? [];

    const commentsRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (commentsRef.current) 
        {
            commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [comments, opened]);

    return (
        <Modal opened={opened} onClose={onClose} size="lg" title={<Text fw={700} size="xl">Комментарии</Text>} centered >
            <Flex direction="column" style={{ width: '100%', height: '70vh' }} gap="md">
                {isLoading ? (
                    <Center style={{ height: '50vh' }}>
                        <Loader size="lg" />
                    </Center>
                ) : (
                    <>
                        <Box ref={commentsRef} style={{ flex: 1, overflowY: 'auto' }}>
                            <Space h="md" />
                            <Stack gap="sm">
                                {!error && comments.slice().reverse().map(comment => (
                                    <Comment key={comment.id} {...comment} id={comment.id ?? ''} chatId={chatId} onMessageUpdate={() => { setTimeout(() => { refetch().then(scrollToBottom); }, 1500); }}/>
                                ))}
                            </Stack>
                            <Space h="md" />
                        </Box>
                        <Box style={{ borderTop: '1px solid #eee', paddingTop: 12 }}>
                            <CreateCommentForm id={chatId} onMessageSent={() => { setTimeout(() => { refetch().then(scrollToBottom); }, 1500); }} />
                        </Box>
                    </>
                )}
            </Flex>
        </Modal>
    );
}