import { Anchor, AppShell, Flex, Title } from "@mantine/core"
import { Outlet, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "shared/lib"

export const PublicLayout = () => {
    const navigate = useNavigate()
    return (
        <AppShell
            header={{ height: 60 }}
            h='100vh'
        >
            <AppShell.Header pl='md' pr='md'>
                <Flex align='center' h='100%' justify='space-between' gap='xl'>
                    <Title order={3}>{'Систему управления стажировками'}</Title>
                    <Flex gap='xl'>
                        <Anchor onClick={() => navigate(LOGIN_ROUTE)}>Вход</Anchor>
                        <Anchor onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</Anchor>
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