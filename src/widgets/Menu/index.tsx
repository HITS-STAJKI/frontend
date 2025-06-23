import { Card, Flex } from "@mantine/core"
import { ReactNode, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { GROUPS_ROUTE, LANGUAGES_ROUTE, MY_PRACTICE_ROUTE, MY_PROFILE_ROUTE, PARTNERS_ROUTE, Roles, ROLES_ROUTE, SELECTION_FOR_STUDENT_ROUTE, SELECTION_FOR_TEACHER_ROUTE, STACKS_ROUTE, STATISTICS_ROUTE, STUDENTS_PRACTICES_ROUTE, STUDENTS_ROUTE, UNAPPROVED_PRACTICES_ROUTE, WithProfileRole } from "shared/lib"

export const Menu = () => {
    const routes: Array<MenuItemProps> = [
        {
            to: [
                { to: LANGUAGES_ROUTE, label: 'Языки', },
                { to: STACKS_ROUTE, label: 'Стэки' },
                { to: ROLES_ROUTE, label: 'Пользователи' },
                { to: GROUPS_ROUTE, label: 'Группы' },
            ], label: 'Администрирование', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD,]
        },
        { to: PARTNERS_ROUTE, label: 'Партнеры', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD, Roles.STUDENT, Roles.TEACHER, Roles.CURATOR] },
        { to: STATISTICS_ROUTE, label: 'Статистика', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD] },
        { to: MY_PROFILE_ROUTE, label: 'Мой профиль', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD, Roles.STUDENT, Roles.TEACHER, Roles.CURATOR] },
        { to: STUDENTS_PRACTICES_ROUTE, label: 'Практики студентов', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD] },
        { to: STUDENTS_ROUTE, label: 'Студенты', userFor: [Roles.DEAN, Roles.EDUCATION_PROGRAM_LEAD] },
        { to: SELECTION_FOR_STUDENT_ROUTE, label: 'Мои собеседования', userFor: [Roles.STUDENT] },
        { to: SELECTION_FOR_TEACHER_ROUTE, label: 'Собеседования студентов', userFor: [Roles.EDUCATION_PROGRAM_LEAD] },
        { to: MY_PRACTICE_ROUTE, label: 'Моя практика', userFor: [Roles.STUDENT] },
        { to: UNAPPROVED_PRACTICES_ROUTE, label: 'Неподтвержденные практики', userFor: [Roles.CURATOR, Roles.EDUCATION_PROGRAM_LEAD] }
    ]
    return (
        <Flex w='100%' h='100%' align='center' gap='lg' mt='md' direction='column' style={{ overflowY: 'auto' }}>
            {routes.map(route => {
                return <WithProfileRole
                    key={route.to.toString()}
                    usersFor={route.userFor}
                    render={<MenuItem key={Array.isArray(route.to) ? route.to.toString() : route.to} to={route.to} label={route.label} userFor={route.userFor} />}
                />
            })
            }
        </Flex>
    )
}

type MenuItemProps = {
    to: string | Array<{ to: string, label: string }>
    label: ReactNode,
    userFor: Array<Roles>
}

export const MenuItem = ({ to, label, ...props }: MenuItemProps) => {
    const { pathname } = useLocation()
    if (Array.isArray(to)) {
        return <OpenedMenuItem to={to} label={label} userFor={props.userFor} />
    }
    return (
        <Link to={to} style={{ textDecoration: 'none', width: '100%', paddingRight: '1rem', paddingLeft: '1rem' }}>
            <Card w='100%' shadow='sm' withBorder c={pathname === to ? 'blue' : undefined} p='sm'>{label}</Card>
        </Link>
    )
}

export const OpenedMenuItem = ({ to, label, ...props }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Card shadow='sm' withBorder p='sm' onClick={() => setIsOpen(prev => !prev)} h='fit-content' mih={'50px'}>{label}</Card>
            {isOpen && Array.isArray(to) && to.map(elem => <MenuItem key={elem.to} to={elem.to} label={elem.label} userFor={props.userFor} />)}
        </>
    )
}