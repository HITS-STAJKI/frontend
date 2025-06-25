import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { GroupDto } from "services/api/api-client.types";
import { useDeleteGroupMutation } from '../../../services/api/api-client/GroupQuery.ts'
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'

type DeleteGroupButtonProps = {
    group: GroupDto
}

export const DeleteGroupButton = ({ group }: DeleteGroupButtonProps) => {
    const { mutateAsync } = useDeleteGroupMutation(group.id!)
    const queryClient = useQueryClient()
    const handleDelete = async (close: () => void) => {
        await mutateAsync()
        await queryClient.invalidateQueries({
          queryKey: QueryFactory.GroupQuery.getGroupsQueryKey()
        })
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите удалить группу ${group.number}?`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
        />
    )
}