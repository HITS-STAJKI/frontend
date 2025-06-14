import { Card } from "@mantine/core"
import { Bar } from '@nivo/bar'

type ChartCardProps = {
    filter?: 
}

export const ChartCard = () => {
    return (
        <Card style={{ width: '30%', height: 'fit-content' }} shadow='sm' withBorder p={'lg'}>
            <Card.Section>
                График
            </Card.Section>
            <Card.Section>
                <div style={{ width: '100%', height: '300px' }}>
                    <Bar data={ } />
                </div>
            </Card.Section>
        </Card>
    )
}