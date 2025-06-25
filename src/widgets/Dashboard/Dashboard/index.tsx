import { Flex } from "@mantine/core"
import { ChartCard, FilterRequest, Filters, FilterType } from "features/Dashboard"
import { useState } from "react"

export const Dashboard = () => {
    const [stats, setStats] = useState<FilterRequest>({})
    const [main, setMain] = useState<FilterType | undefined>()
    return (
        <Flex h={'100%'}>
            <ChartCard {...stats} main={main} />
            <Filters setStats={setStats} setMain={setMain} main={main} />
        </Flex>
    )
}