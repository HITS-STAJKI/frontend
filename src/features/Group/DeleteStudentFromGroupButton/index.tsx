import { Button, Select } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { TrashSvgrepoCom } from "assets/icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import { QueryFactory } from "services/api"
import { UserDto } from "services/api/api-client.types"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useDeleteUserRoleMutationWithParameters } from "services/api/api-client/RoleQuery"
import { useUpdateStudentMutation } from "services/api/api-client/StudentQuery"
import { StudentUpdate } from "shared/lib"
import { Modal } from "shared/ui"
import { useForm } from "@mantine/form"

type DeleteStudentFromGroupButtonProps = {
    student: UserDto
}

export const DeleteStudentFromGroupButton = ({ student }: DeleteStudentFromGroupButtonProps) => {
    const queryClient = useQueryClient();
    const { data, isLoading } = useGetGroupsQuery({
        size: 100,
    });


    const form = useForm<StudentUpdate>({
        initialValues: {
            groupId: ""
        }
    })

    const studentRole = student.roles?.find(role => role.userRole === "STUDENT");
    const { mutateAsync: updateStudent } = useUpdateStudentMutation(studentRole?.id as string, {
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
            });
        },
    });

    const handleEdit = async (values: StudentUpdate) => {
        console.log("oi ", student.id, values.groupId)
        await updateStudent({
            groupId: values.groupId
        });
        close()
    }

    return (
        <Modal
            title={`Удаление студента из группы`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ }) => (
                <form onSubmit={form.onSubmit(handleEdit)}>
                    <p>
                        Вы можете переместить студента {student.fullName} в другой поток (или отправить его в академ через
                        <Link to={`/profile/${student.id}`} style={{ marginLeft: '4px', color: 'blue', textDecoration: 'underline' }}>
                            профиль
                        </Link> студента).
                    </p>
                    {isLoading ? (
                        <p>Загрузка потоков...</p>
                    ) : (
                        <Select
                            label="Выберите поток"
                            {...form.getInputProps('groupId')} // Регистрация поля в форме
                            data={data?.items?.map(item => ({
                                value: item.id!,
                                label: item.number!,
                            })) || []}
                        />
                    )}
                    <Button mt="md" type='submit' color='red'>{'Переместить'}</Button>
                </form>
            )}
        />
    )
}