import { Card, CardSection, Input } from "@mantine/core"

export const TableCard = () => {
    return (
        <Card style={{ width: '30%', height: 'fit-content' }} withBorder shadow='sm' p={'lg'}>
            <CardSection>
                Таблица
                <Input placeholder='Имя таблицы' />
            </CardSection>
        </Card>
    )
}