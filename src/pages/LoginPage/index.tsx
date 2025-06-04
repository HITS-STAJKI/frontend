import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Client } from "services/api/api-client/UserQuery"
import { LoginForm } from "widgets/LoginForm"

export const LoginPage = () => {
    return (
        <QueryClientProvider client={Client}>
            <LoginForm />
        </QueryClientProvider>
    )
}