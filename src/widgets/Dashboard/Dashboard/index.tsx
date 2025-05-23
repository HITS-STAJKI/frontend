import { Flex } from "@mantine/core"
import { AddNewDashboardCard } from "features/Dashboard"
import { useDashboardContext } from "shared/lib"

export const Dashboard = () => {
    const { elements } = useDashboardContext()
    return (
        <Flex gap='xl'>
            {elements.map(element => {
                return element
            })}
            <AddNewDashboardCard />
        </Flex>
    )
}