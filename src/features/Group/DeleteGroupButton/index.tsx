import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { GroupDto } from "services/api/api-client.types";
import { useDeleteGroupMutation } from '../../../services/api/api-client/GroupQuery.ts'
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'
import { useLocation } from "react-router-dom";

type DeleteGroupButtonProps = {
    group: GroupDto
}

export const DeleteGroupButton = ({ group }: DeleteGroupButtonProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync: groupDeleteMutate } = useDeleteGroupMutation(group.id!);

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
    const handleDelete = async (close: () => void) => {
        await groupDeleteMutate()
        const queryParams = getQueryParams();
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.GroupQuery.getGroupsQueryKey(
                queryParams.group ?? undefined,
                queryParams.number ?? undefined,
                queryParams.page ? Number(queryParams.page) : undefined,
                queryParams.size ? Number(queryParams.size) : undefined
            ),
        })
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите удалить поток ${group.number}?`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
        />
    )
}