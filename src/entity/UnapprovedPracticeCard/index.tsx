import { Box, Button, Card, Grid, Text } from "@mantine/core"
import { PRACTICE_ROUTE } from "shared/lib";
import { ReportArchive, ReportDelete, ReportEdit, ReportOpen } from "features/PracticesFullButtons";
import { useNavigate } from "react-router-dom";
import { PracticeDto } from "services/api/api-client.types";
import { CommentSelection, SuccedTeacherSelection } from "widgets/Selection/ModuleWindows";
import { SvgCommentIcon } from "assets/icons";
import { StudentCommentsModal } from "entity/StudentListCard";
import { useEffect, useState } from "react";
import { useGetStudentsByIdsMutation } from "services/api/api-client/StudentQuery";

interface UnapprovedPracticeCardProps extends PracticeDto {
    index: number;
    onRefresh?: () => void;
}

export function UnapprovedPracticeCard({ id, user, group, company, stack, createdAt, isPaid, isArchived, isApproved, index, onRefresh }: UnapprovedPracticeCardProps) 
{
    const [modalOpened, setModalOpened] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);

    const getStudentMutation = useGetStudentsByIdsMutation();

    const studentRole = user?.roles?.find(role => role.userRole === 'STUDENT');
    
    useEffect(() => {
        if (studentRole?.id) 
        {
            getStudentMutation.mutateAsync([studentRole.id])
                .then((res) => {
                    const student = res?.[0];
                    setChatId(student?.chatId ?? null);
                })
                .catch((err) => {
                    setChatId(null);
                });
        }
    }, [studentRole]);

    return (
        <>
            <Card key={id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex', transition: 'box-shadow 0.2s ease, background-color 0.2s ease' }} >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Box style={{ width: '40px', textAlign: 'center' }}>
                        <Text>{index}</Text>
                    </Box>
                    <Grid style={{width: '100%'}}>
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {user?.fullName ?? 'Неизвестный пользователь'}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {group?.number ?? 'Неизвестная группа'}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {company?.name ?? 'Неизвестная компания'}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {stack?.name ?? 'Неизвестная технология'}
                            </Text>
                        </Grid.Col>                
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {createdAt ? createdAt.toLocaleString() : ''}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2} style={{ display: "flex", justifyContent: "space-evenly", width: "100%", alignItems: "center" }} >
                            {chatId && <Button color="green" onClick={() => {setModalOpened(true)}} style={{ padding: '0', aspectRatio: '1 / 1'}}>{<SvgCommentIcon fontSize={'30'}/>}</Button>}
                            {id && <SuccedTeacherSelection id={id} />}
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>

            {chatId && <StudentCommentsModal opened={modalOpened} onClose={() => setModalOpened(false)} chatId={chatId} />}
        </>
    );
}