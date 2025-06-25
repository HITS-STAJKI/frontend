import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQueryClient } from "@tanstack/react-query"
import { QueryFactory } from "services/api"
import { CreateGroupDto } from "services/api/api-client.types"
import { useCreateGroupMutation } from "services/api/api-client/GroupQuery"
import { GroupCreate } from "shared/lib"

type CreateGroupFormProps = {
    onSuccess: () => void
}

export const CreateGroupForm = ({ onSuccess }: CreateGroupFormProps) => {
    const { mutateAsync: createGroupMutate } = useCreateGroupMutation();
    const queryClient = useQueryClient();
    const form = useForm<GroupCreate>({
        initialValues: {
            number: ''
        }
    })
    const onSubmit = async (vals: { number: string }) => {
        await createGroupMutate(vals as CreateGroupDto);
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
          })
        console.log('Тело запроса', vals)
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