import { Box, Card, Checkbox, Grid, Text } from "@mantine/core"
import { Practice, Status } from "shared/lib";
import { ReportShortOpen } from "features/ReportShortOpen";

interface StudentProps extends Practice {
    status: Status,
    index: number
}

export const STATUS_LABELS: Record<Status, string> = {
    PENDING: "На рассмотрении",
    REJECTED: "Отклонен",
    SUCCEED: "Пройден",
};

export function StudentListCard({ id, user, group, company, index, status }: StudentProps) {
    return (
        <Card key={id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Text>{index}</Text>
                </Box>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Checkbox size="sm" />
                </Box>
                <Grid style={{width: '100%'}}>
                    <Grid.Col span={3} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {user.fullname}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={3} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {group.number}
                        </Text>
                    </Grid.Col>                
                    <Grid.Col span={3} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {company.name}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={3} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {STATUS_LABELS[status]}
                        </Text>
                    </Grid.Col>
                </Grid>
            </div>
        </Card>
    );
}