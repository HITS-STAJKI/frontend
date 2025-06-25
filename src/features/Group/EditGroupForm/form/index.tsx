import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { GroupDto, UpdateGroupDto } from "services/api/api-client.types"
import { useUpdateGroupMutation } from "services/api/api-client/GroupQuery.ts"
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../../services/api'

type EditGroupFormProps = {
    onSuccess: () => void
    group: GroupDto
}

export const EditGroupForm = ({ onSuccess, group }: EditGroupFormProps) => {
    const form = useForm<UpdateGroupDto>({
        initialValues: {
            number: group.number!
        }
    })

    const { mutateAsync } = useUpdateGroupMutation(group.id!)
    const queryClient = useQueryClient()

    const handleEdit = async (vals: UpdateGroupDto) => {
        await mutateAsync(vals)
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
        })
        onSuccess()
    }

    return (
        <form onSubmit={form.onSubmit(handleEdit)}>
            <TextInput
                label="Номер группы"
                key={form.key('number')}
                error={form.errors}
                mb="xs"
                {...form.getInputProps('number')}
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    )
}