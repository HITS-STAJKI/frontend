import { Box, Card, Grid, Text } from "@mantine/core"
import { Practice } from "shared/lib";
import { ReportShortOpen } from "features/ReportShortOpen";

interface FullPracticeCardProps extends Practice {
  index: number;
}

export function ShortPracticeCard({ id, company, createdAt, isPaid, isArchived, isApproved, index }: FullPracticeCardProps) {
    return (
        <Card key={id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Box style={{ width: '40px', textAlign: 'center' }}>
                <Text>{index}</Text>
            </Box>
            <Grid style={{width: '100%'}}>
                 <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {company.name}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {isPaid == true ? "Да" : "Нет"}
                    </Text>
                </Grid.Col>                
                <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {isApproved == true ? "Да" : "Нет"}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {isArchived == true ? "Да" : "Нет"}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {new Date(createdAt).toLocaleDateString("ru-RU")}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        //TODO: Сделать отображжение кнопок от роли
                    }
                    <ReportShortOpen id={id}/>
                </Grid.Col>
            </Grid>
            </div>
        </Card>
    );
}