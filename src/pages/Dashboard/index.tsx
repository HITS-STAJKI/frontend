import { Container } from "@mantine/core"
import { DashboardWidget } from "widgets/Dashboard"

export const Dashboard = () => {
    return (
        <Container w={'100%'} h={"100%"} fluid>
            <DashboardWidget />
        </Container>
    )
}