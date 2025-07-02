import { Button, Flex, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UpdateLanguageDto, UpdateStackDto } from '../../../../services/api/api-client.types.ts'
import { QueryFactory } from '../../../../services/api'
import { useUpdateLanguageMutation } from '../../../../services/api/api-client/Programming_languageQuery.ts'
import { useUpdateStackMutation } from '../../../../services/api/api-client/StackQuery.ts'
import { useQueryClient } from '@tanstack/react-query'

export const UpdateLanguageOrStackForm = ({ id, name, onSuccess, type, query }:
                                            { id: string, name: string, onSuccess: () => void, type: 'language' | 'stack', query?: string }) => {

  const { mutateAsync: editLanguageMutate } = useUpdateLanguageMutation(id);
  const { mutateAsync: editStackMutate } = useUpdateStackMutation(id)
  const queryClient = useQueryClient();

  const form = useForm<UpdateLanguageDto | UpdateStackDto>({
        initialValues: {
            name: name
        }
    })
    const onSub = async (name: UpdateStackDto | UpdateLanguageDto) => {
      if (type === 'language') {
        await editLanguageMutate(name as UpdateLanguageDto)
        await queryClient.invalidateQueries({
          queryKey: QueryFactory.Programming_languageQuery.getLanguageListQueryKey(query)
        })
      }
      else {
        await editStackMutate(name as UpdateStackDto)
        await queryClient.invalidateQueries({
          queryKey: QueryFactory.StackQuery.getStackListQueryKey(query)
        })
      }
        onSuccess()
    }
    return (
        <form onSubmit={form.onSubmit(onSub)}>
            <Flex direction='column' gap={'md'}>
                <TextInput label={'Новое имя'} key={form.key('name')} {...form.getInputProps('name')} />
                <Button color='blue' type='submit'>{'Сохранить'}</Button>
            </Flex>
        </form>
    )
}