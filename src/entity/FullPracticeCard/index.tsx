import { Box, Card, Grid, Text } from "@mantine/core"
import { PRACTICE_ROUTE } from "shared/lib";
import { ReportArchive, ReportDelete, ReportEdit, ReportOpen } from "features/PracticesFullButtons";
import { useNavigate } from "react-router-dom";
import { PracticeDto } from "services/api/api-client.types";

interface FullPracticeCardProps extends PracticeDto {
    index: number;
    onRefresh?: () => void;
}

export function FullPracticeCard({ id, user, group, company, createdAt, isPaid, isArchived, isApproved, index, onRefresh }: FullPracticeCardProps) {
    const navigate = useNavigate();

    const studentRole = user?.roles?.find(role => role.userRole === 'STUDENT');

    const handleClick = () => {
        if (studentRole?.id) {
            navigate(PRACTICE_ROUTE.replace(':id', studentRole.id));
        }
    };

    const isCardClickable = isApproved && !isArchived;

    return (
        <Card
            key={id}
            shadow="sm"
            style={{ width: '100%', height: '64px', display: 'flex', cursor: isCardClickable ? 'pointer' : 'default', transition: 'box-shadow 0.2s ease, background-color 0.2s ease' }}
            onClick={isCardClickable ? handleClick : undefined}
            onKeyDown={isCardClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            } : undefined}
            tabIndex={isCardClickable ? 0 : -1}
            onMouseEnter={(e) => {
                if (isCardClickable) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9f9f9';
                }
            }}
            onMouseLeave={(e) => {
                if (isCardClickable) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
                }
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Text>{index}</Text>
                </Box>
                <Grid style={{ width: '100%' }}>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {user?.fullName ?? 'Неизвестный пользователь'}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {group?.number ?? 'Неизвестная группа'}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {company?.name ?? 'Неизвестная компания'}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {isPaid == true ? "Да" : "Нет"}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {isApproved == true ? "Да" : "Нет"}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {isArchived == true ? "Да" : "Нет"}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {createdAt ? new Date(createdAt).toLocaleDateString("ru-RU") : '—'}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            {
                                //TODO: Сделать отображжение кнопок от роли
                            }
                            {id && (
                                <Grid.Col span={12} onClick={(e) => e.stopPropagation()}>
                                    <Box style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", width: "100%" }} >
                                        <Box style={{ visibility: id && studentRole ? "visible" : "hidden" }}>
                                            <ReportOpen practiceId={id!} studentId={studentRole?.id!} />
                                        </Box>
                                        <Box style={{ visibility: id ? "visible" : "hidden" }}>
                                            <ReportEdit id={id!} initialValue={isPaid} onSuccess={onRefresh} />
                                        </Box>
                                        <Box style={{ visibility: id ? "visible" : "hidden" }}>
                                            <ReportDelete id={id!} onSuccess={onRefresh} />
                                        </Box>
                                        <Box style={{ visibility: id ? "visible" : "hidden" }}>
                                            <ReportArchive id={id!} onSuccess={onRefresh} />
                                        </Box>
                                    </Box>
                                </Grid.Col>
                            )}
                        </div>
                    </Grid.Col>
                </Grid>
            </div>
        </Card>
    );
}