import { Container } from "@mantine/core"
import { DashboardWidget } from "widgets/Dashboard"

const Dashboard = () => {
    return (
        <Container w={'100%'} h={"100%"} fluid>
            <DashboardWidget />
        </Container>
    )
}

export default Dashboard