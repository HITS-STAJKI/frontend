import { AppShell, Flex, Title } from "@mantine/core"
import { ChatButton } from "features/ChatButton"
import { Outlet } from "react-router-dom"
import { Menu } from "widgets/Menu"

export const PrivateLayout = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            h='100vh'
            navbar={{ width: '15%', breakpoint: 'md' }}
        >
            <AppShell.Header pl='md' pr='md'>
                <Flex align='center' h='100%' justify='space-between' gap='xl'>
                    <Title order={3}>{'Система управления стажировками'}</Title>
                    <ChatButton />
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar>
                <Menu />
            </AppShell.Navbar>
            <AppShell.Main>
                <Flex mt='xl' h={'90vh'}>
                    <Outlet />
                </Flex>
            </AppShell.Main>
        </AppShell>
    )
}