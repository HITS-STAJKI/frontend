import { Button, Menu } from "@mantine/core"
import { useState } from "react"
import { UserDetailsDto } from "services/api/api-client.types"
import { DeleteModal } from "./modal"

export const DeleteRole = ({ profileData }: { profileData: UserDetailsDto }) => {
    const [type, setType] = useState<{ value: 'student' | 'teacher' | 'curator' | 'edpl' | 'dean', label: string } | undefined>(undefined)
    return (
        <>
            <Menu position="left-start">
                <Menu.Target>
                    <Button>Удалить роль</Button>
                </Menu.Target>
                <Menu.Dropdown style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 0 }}>
                    {!!profileData.student && <Menu.Item onClick={() => setType({ value: 'student', label: profileData.student?.id! })}>Удалить роль студента</Menu.Item>}
                    {!!profileData.dean && <Menu.Item onClick={() => setType({ value: 'dean', label: profileData.dean?.id! })}>Удалить роль деканата</Menu.Item>}
                    {!!profileData.teacher && <Menu.Item onClick={() => setType({ value: 'teacher', label: profileData.teacher?.id! })}>Удалить роль преподаватель</Menu.Item>}
                    {!!profileData.curator && <Menu.Item onClick={() => setType({ value: 'curator', label: profileData.curator?.id! })}>Удалить роль куратор</Menu.Item>}
                    {!!profileData.educationalProgramLead && <Menu.Item onClick={() => setType({ value: 'edpl', label: profileData.educationalProgramLead?.id! })}>Удалить роль руководитель образовательной программы</Menu.Item>}
                </Menu.Dropdown>

            </Menu>
            <DeleteModal type={type} setType={setType} userId={profileData.id!} />
        </>
    )
}