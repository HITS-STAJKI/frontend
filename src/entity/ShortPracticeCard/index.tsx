import { Box, Card, Grid, Text } from "@mantine/core"
import { Practice, PRACTICE_ROUTE } from "shared/lib";
import { ReportShortOpen } from "features/ReportShortOpen";
import { useNavigate } from "react-router-dom";

interface FullPracticeCardProps extends Practice {
  index: number;
}

export function ShortPracticeCard({ id, company, createdAt, isPaid, isArchived, isApproved, index }: FullPracticeCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PRACTICE_ROUTE.replace(':id', id));
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
                    <Grid.Col
                        span={2}
                        style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {
                            //TODO: Сделать отображжение кнопок от роли
                        }
                        <ReportShortOpen id={id} />
                    </Grid.Col> 
                </Grid>
            </div>
        </Card>
    );
}