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
    const myRoles: Array<Roles> = []
    const educationalProgramLead = data?.educationalProgramLead !== null
    if (educationalProgramLead) {
        myRoles.push(Roles.EDUCATION_PROGRAM_LEAD)
    }
    const dean = data?.dean !== null
    if (dean) {
        myRoles.push(Roles.DEAN)
    }
    const curator = data?.curator !== null
    if (curator) {
        myRoles.push(Roles.CURATOR)
    }
    const teacher = data?.teacher !== null
    if (teacher) {
        myRoles.push(Roles.TEACHER)
    }
    const student = data?.student !== null
    if (student) {
        myRoles.push(Roles.STUDENT)
    }
    console.log(myRoles, usersFor)
    let flag = false
    usersFor.forEach(role => {
        if (myRoles.includes(role))
            flag = true
    })
    if (flag) {
        return render
    }
    return <></>

}