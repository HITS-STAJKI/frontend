import { Card, Flex } from "@mantine/core"
import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { LANGUAGES_ROUTE, STACKS_ROUTE } from "shared/lib"

export const Menu = () => {
    const routes: Array<MenuItemProps> = [
        { to: LANGUAGES_ROUTE, label: 'Языки' },
        { to: STACKS_ROUTE, label: 'Стэки' }
    ]
    return (
        <Flex w='100%' h='100%' align='center' gap='lg' mt='md' direction='column'>
            {routes.map(route =>
                <MenuItem to={route.to} label={route.label} />)
            }
        </Flex>
    )
}

type MenuItemProps = {
    to: string
    label: ReactNode
}

export const MenuItem = ({ to, label }: MenuItemProps) => {
    const { pathname } = useLocation()
    return (
        <Link to={to} style={{ textDecoration: 'none', width: '100%', paddingRight: '1rem', paddingLeft: '1rem' }}>
            <Card w='100%' shadow='sm' withBorder c={pathname === to ? 'blue' : undefined}>{label}</Card>
        </Link>
    )
}