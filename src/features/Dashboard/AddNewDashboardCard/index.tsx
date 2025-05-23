import { Button, Card, Popover } from "@mantine/core"
import { useDashboardContext } from "shared/lib"
import { ChartCard } from "../ChartCard"
import { TableCard } from "../TableCard"
import { useState } from "react"

export const AddNewDashboardCard = () => {
    const { addElement } = useDashboardContext()
    const [opened, setOpened] = useState(false)
    return (
        <Popover width='target' shadow='sm' onChange={opd => setOpened(opd)} opened={opened}>
            <Popover.Target>
                <Button onClick={() => setOpened(!opened)}>Добавить новый компонент</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Card onClick={() => addElement(<ChartCard />)}>
                    Граффик
                </Card>
                <Card onClick={() => addElement(<TableCard />)}>
                    Теблица
                </Card>
            </Popover.Dropdown>
        </Popover>
    )
}