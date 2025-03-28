import { AppShell, Flex } from "@mantine/core"
import { Link, Outlet } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "shared/lib"

export const PublicLayout = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            h='100vh'
        >
            <AppShell.Header>
                <Flex align='center' h='100%' justify='center' gap='xl'>
                    <div>{'Стажки'}</div>
                    <Flex gap='xl'>
                        <Link to={LOGIN_ROUTE}>Вход</Link>
                        <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
                    </Flex>
                </Flex>
            </AppShell.Header>
            <AppShell.Main h='100%'>
                <Flex mt='xl'>
                    <Outlet />
                </Flex>
            </AppShell.Main>
        </AppShell>
    )
}