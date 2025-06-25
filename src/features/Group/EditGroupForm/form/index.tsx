import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQueryClient } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { QueryFactory } from "services/api"
import { GroupDto } from "services/api/api-client.types"
import { useUpdateGroupMutation } from "services/api/api-client/GroupQuery"
import { GroupUpdate } from "shared/lib"

type EditGroupFormProps = {
    onSuccess: () => void
    group: GroupDto
}

export const EditGroupForm = ({ onSuccess, group }: EditGroupFormProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync: groupUpdateMutate } = useUpdateGroupMutation(group.id!);

    const location = useLocation();
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            number: params.get('number'),
            group: params.get('group'),
            size: params.get('size'),
            page: params.get('page'),
        };
    };
    const form = useForm<GroupUpdate>({
        initialValues: {
            number: group.number!
        }
    })

    const handleEdit = async (number: GroupUpdate) => {
        await groupUpdateMutate(number);
        const queryParams = getQueryParams();
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.GroupQuery.getGroupsQueryKey(
                queryParams.group ?? undefined, 
                queryParams.number ?? undefined, 
                queryParams.page ? Number(queryParams.page) : undefined, 
                queryParams.size ? Number(queryParams.size) : undefined 
            ),
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