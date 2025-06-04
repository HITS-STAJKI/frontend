import { Box, Card, Grid, Text } from "@mantine/core"
import { Practice } from "shared/lib";
import { ReportArchive, ReportDelete, ReportEdit, ReportOpen } from "features/PracticesFullButtons";

interface FullPracticeCardProps extends Practice {
  index: number;
}

export function FullPracticeCard({ id, user, group, company, createdAt, isPaid, isArchived, isApproved, index }: FullPracticeCardProps) {
    return (
        <Card key={id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Box style={{ width: '40px', textAlign: 'center' }}>
                <Text>{index}</Text>
            </Box>
            <Grid style={{width: '100%'}}>
                <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.fullname}
                    </Text>
                </Grid.Col>
                <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {group.number}
                    </Text>
                </Grid.Col>
                 <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {company.name}
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
                        {new Date(createdAt).toLocaleDateString("ru-RU")}
                    </Text>
                </Grid.Col>
                <Grid.Col span={1.5} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {
                        //TODO: Сделать отображжение кнопок от роли
                    }
                    <ReportOpen id={id}/>
                    <ReportEdit id={id}/>
                    <ReportDelete id={id}/>
                    <ReportArchive id={id}/>
                </Grid.Col>
            </Grid>
            </div>
        </Card>
    );
}