import { Center, Loader } from "@mantine/core"
import { ReactNode } from "react"
import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery"
import { Roles } from "shared/lib/config"

type WithProfileRoleProps = {
    render: ReactNode
    usersFor: Array<Roles>
}

export const WithProfileRole = ({
    render, usersFor
}: WithProfileRoleProps) => {
    const { data, isLoading } = useGetCurrentUserQuery()
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    console.log(`roles: ${usersFor.toString()}`)
    const educationalProgramLead = data?.educationalProgramLead !== null
    if (educationalProgramLead && !!usersFor.find(role => role === Roles.EDUCATION_PROGRAM_LEAD)) {
        return render
    }
    const dean = data?.dean !== null
    if (dean && !!usersFor.find(role => role === Roles.DEAN)) {
        return render
    }
    const teacher = data?.teacher !== null
    if (teacher && !!usersFor.find(role => role === Roles.TEACHER)) {
        return render
    }
    const student = data?.student !== null
    if (student && !!usersFor.find(role => role === Roles.STUDENT)) {
        return render
    }
    return <></>
}