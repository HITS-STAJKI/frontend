import { Box, Card, Grid, Text } from "@mantine/core"
import { Practice, PRACTICE_ROUTE } from "shared/lib";
import { ReportArchive, ReportDelete, ReportEdit, ReportOpen } from "features/PracticesFullButtons";
import { useNavigate } from "react-router-dom";
import { PracticeDto } from "services/api/api-client.types";

interface FullPracticeCardProps extends PracticeDto {
  index: number;
}

export function FullPracticeCard({ id, user, group, company, stack, createdAt, isPaid, isArchived, isApproved, index }: FullPracticeCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        const studentRole = user?.roles?.find(role => role.userRole === 'STUDENT');
        if (studentRole?.id) 
        {
            navigate(PRACTICE_ROUTE.replace(':id', studentRole.id));
        }
    };
    
    return (
        <Card key={id}
            shadow="sm"
            style={{
                width: '100%',
                height: '64px',
                display: 'flex',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
            }}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick();
            }}
            tabIndex={0}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f9f9f9';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Text>{index}</Text>
                </Box>
                <Grid style={{width: '100%'}}>
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
                                <>
                                    <ReportOpen id={id} />
                                    <ReportEdit id={id} />
                                    <ReportDelete id={id} />
                                    <ReportArchive id={id} />
                                </>
                            )}
                        </div>
                    </Grid.Col>
                </Grid>
            </div>
        </Card>
    );
}

export function FullPracticeCardEmpty() { 
    return (
        <Card
            shadow="sm"
            style={{
                width: '100%',
                height: '64px',
                display: 'flex',
            }}
            tabIndex={0}
        >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                </Box>
                <Grid style={{width: '100%'}}>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>                
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ whiteSpace: 'pre' }}>{"                                                                                        "}</Text>
                    </Grid.Col>
                </Grid>
            </div>
        </Card>
    );
}