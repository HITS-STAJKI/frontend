import { Box, Button, Card, Checkbox, Grid, Modal, Text } from "@mantine/core"
import { useState } from "react";
import { CommentSectionAlt } from "entity"
import { useNavigate } from "react-router-dom";

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

export function StudentListCard({ index, studentId, fullName, groupNumber, lastLoginDate, unreadMessagesCount, chatId, isSelected, onToggleSelect }: StudentProps) {
    const navigate = useNavigate();
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
                        <Grid.Col span={2.5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</Text>
                        </Grid.Col>
                        <Grid.Col span={2.5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{groupNumber}</Text>
                        </Grid.Col>
                        <Grid.Col span={2.5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {lastLoginDate ? lastLoginDate.toLocaleString() : ''}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2.5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                            {unreadMessagesCount != null && unreadMessagesCount > 0 && (
                                <Box style={{ padding: '4px 8px', border: '1px solid #ff6b6b', borderRadius: '12px', color: 'black', fontWeight: 500, fontSize: '14px', minWidth: '24px', textAlign: 'center' }} >
                                    {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                                </Box>
                            )}
                        </Grid.Col>
                        <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); navigate(`/practices/student/${studentId}`); }}>
                                Практика
                            </Button>
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
                        <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    return (
        <Modal opened={opened} onClose={onClose} size="lg" title={<Text fw={700} size="xl">Комментарии</Text>} centered >
            <CommentSectionAlt chatId={chatId} height="70vh" />
        </Modal>
    );
}