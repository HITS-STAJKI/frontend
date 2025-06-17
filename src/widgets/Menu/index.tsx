import { Card, Flex } from "@mantine/core"
import { ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { GROUPS_ROUTE, INTERVIEW_REPORT, LANGUAGES_ROUTE, MY_PROFILE_ROUTE, PARTNERS_ROUTE, PRACTICE_ROUTE, ROLES_ROUTE, SELECTION_FOR_STUDENT_ROUTE, SELECTION_FOR_TEACHER_ROUTE, STACKS_ROUTE, STATISTICS_ROUTE, STUDENT_PRACTICES_ROUTE, STUDENTS_PRACTICES_ROUTE, STUDENTS_ROUTE } from "shared/lib"

export const Menu = () => {
    const routes: Array<MenuItemProps> = [
        {
            to: [
                { to: LANGUAGES_ROUTE, label: 'Языки' },
                { to: STACKS_ROUTE, label: 'Стэки' },
                { to: ROLES_ROUTE, label: 'Пользователи' },
                { to: GROUPS_ROUTE, label: 'Группы' },
            ], label: 'Администрирование'
        },
        { to: INTERVIEW_REPORT, label: 'Отчеты о прохождениях собеседований' },
        { to: PARTNERS_ROUTE, label: 'Партнеры' },
        { to: STATISTICS_ROUTE, label: 'Статистика' },
        { to: MY_PROFILE_ROUTE, label: 'Мой профиль' },
        { to: STUDENTS_PRACTICES_ROUTE, label: 'Практики студентов' },
        { to: STUDENTS_ROUTE, label: 'Студенты' },
        { to: SELECTION_FOR_STUDENT_ROUTE, label: 'Мои собеседования' },
        { to: SELECTION_FOR_TEACHER_ROUTE, label: 'Собеседования студентов' },
    ]
    return (
        <Flex w='100%' h='100%' align='center' gap='lg' mt='md' direction='column' style={{ overflowY: 'auto' }}>
            {routes.map(route =>
                <MenuItem key={Array.isArray(route.to) ? route.to.toString() : route.to} to={route.to} label={route.label} />)
            }
        </Flex>
    )
}

type MenuItemProps = {
    to: string | Array<{ to: string, label: string }>
    label: ReactNode
}

export const MenuItem = ({ to, label }: MenuItemProps) => {
    const { pathname } = useLocation()
    if (Array.isArray(to)) {
        return <OpenedMenuItem to={to} label={label} />
    }
    return (
        <Link to={to} style={{ textDecoration: 'none', width: '100%', paddingRight: '1rem', paddingLeft: '1rem' }}>
            <Card w='100%' shadow='sm' withBorder c={pathname === to ? 'blue' : undefined} p='sm'>{label}</Card>
        </Link>
    )
}

export const OpenedMenuItem = ({ to, label }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Card shadow='sm' withBorder p='sm' onClick={() => setIsOpen(prev => !prev)} h='fit-content' mih={'50px'}>{label}</Card>
            {isOpen && Array.isArray(to) && to.map(elem => <MenuItem to={elem.to} label={elem.label} />)}
        </>
    )
}