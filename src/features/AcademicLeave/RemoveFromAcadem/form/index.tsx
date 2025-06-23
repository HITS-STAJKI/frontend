import { Button, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserDetailsDto } from "services/api/api-client.types"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useReturnStudentFromAcademMutation } from "services/api/api-client/StudentQuery"
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"

type RemoveFromAcademFormProps = {
    onSuccess: () => void
}

type StudendGroupType = {
    groupId: string
}
export const RemoveFromAcademForm = ({ onSuccess, user }: RemoveFromAcademFormProps & { user: UserDetailsDto }) => {

    const { data: groups, isLoading } = useGetGroupsQuery(undefined, undefined, undefined, 1000000000)
    const { mutateAsync } = useReturnStudentFromAcademMutation(user.student?.id!)
    const { refetch } = useGetUserByIdQuery(user.id)
    const form = useForm({
        initialValues: {
            groupId: ""
        }
    });

    const onSubmit = (vals: StudendGroupType) => {
        console.log('Тело запроса', vals);
        mutateAsync(vals).then(() => {
            refetch()
            onSuccess();
        }).catch((err) => console.log(err))

    };
    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
                label="Выберите группу"
                placeholder="Начните вводить номер группы"
                required
                data={groups?.items!.map(group => ({
                    value: group.id!,
                    label: `${group.number}`,
                }))}
                searchable
                {...form.getInputProps('groupId')}
            />
            <Button type='submit' mt="md">{'Сохранить'}</Button>
        </form>
    );
};