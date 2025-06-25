import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useCreateGroupMutation } from "services/api/api-client/GroupQuery.ts"
import { CreateGroupDto } from "services/api/api-client.types.ts"
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../../services/api'

type CreateGroupFormProps = {
    onSuccess: () => void
}

export const CreateGroupForm = ({ onSuccess }: CreateGroupFormProps) => {
    const form = useForm<CreateGroupDto>({
        initialValues: {
            number: ''
        }
    })

    const { mutateAsync } = useCreateGroupMutation()
    const queryClient = useQueryClient()

    const onSubmit = async (vals: CreateGroupDto) => {
        await mutateAsync(vals)
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
        })
        onSuccess()
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label="Номер группы"
                key={form.key('number')}
                mb="xs"
                {...form.getInputProps('number')}
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    )
}