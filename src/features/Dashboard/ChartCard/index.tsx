import { Chart } from "react-charts"
import { useChart } from "./hook"
import { Card } from "@mantine/core"

type Props = {
    x: string
    date: Date,
    name: string
}

export const ChartCard = () => {

    const { options } = useChart<Props>(['x', 'date'], 'bar', [
        {
            date: new Date(2025, 4, 18),
            x: 'Поток 9722',
            name: '123'
        },
        {
            date: new Date(2025, 4, 19),
            x: 'Поток 9723',
            name: '321'
        },])
    return (
        <Card style={{ width: '30%', height: 'fit-content' }} shadow='sm' withBorder p={'lg'}>
            <Card.Section>
                График
            </Card.Section>
            <Card.Section>
                <div style={{ width: '100%', height: '300px' }}>
                    <Chart options={options} />
                </div>
            </Card.Section>
        </Card>
    )
}