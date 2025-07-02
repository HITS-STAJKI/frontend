import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { useDeleteLanguageMutation } from '../../../services/api/api-client/Programming_languageQuery.ts'
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'
import { useDeleteStackMutation } from '../../../services/api/api-client/StackQuery.ts'

type DeleteLanguageOrStackProps = {
    query?: string
    id: string
    type: 'language' | 'stack'
}

export const DeleteLanguageOrStack = ({ type, id, query }: DeleteLanguageOrStackProps) => {
    const queryClient = useQueryClient();
    const { mutateAsync: languageDeleteMutate } = useDeleteLanguageMutation(id);
    const { mutateAsync: stackDeleteMutate} = useDeleteStackMutation(id);

    const handleDelete = async (close: () => void) => {
        if (type === 'language') {
            await languageDeleteMutate();
            await queryClient.invalidateQueries({
                queryKey: QueryFactory.Programming_languageQuery.getLanguageListQueryKey(query),
            })
        }
        else {
            await stackDeleteMutate();
            await queryClient.invalidateQueries({
                queryKey: QueryFactory.StackQuery.getStackListQueryKey(query)
            })
        }
        close()
    }

    return (
        <Modal
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
            title={'Вы уверены, что хотите удалить данный элемент?'}
        />

    )
}