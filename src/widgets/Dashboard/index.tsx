import { DashboardProvider } from "shared/lib"
import { Dashboard } from "./Dashboard"

export const DashboardWidget = () => {

    return (
        <DashboardProvider>
            <Dashboard />
        </DashboardProvider>
    )
}