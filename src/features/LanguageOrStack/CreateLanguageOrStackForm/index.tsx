import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"
import { useCreateLanguageMutation } from '../../../services/api/api-client/Programming_languageQuery.ts'
import { CreateLanguageDto, CreateStackDto } from '../../../services/api/api-client.types.ts'
import { useQueryClient } from '@tanstack/react-query'
import { QueryFactory } from '../../../services/api'
import { useCreateStackMutation } from '../../../services/api/api-client/StackQuery.ts'

type CreateLanguageOrStackFormProps = {
    onSuccess: () => void;
    type: 'language' | 'stack';
}

export const CreateLanguageOrStackForm = ({ onSuccess, type }: CreateLanguageOrStackFormProps) => {
    const { mutateAsync: createLanguageMutate } = useCreateLanguageMutation();
    const { mutateAsync: createStackMutate } = useCreateStackMutation();
    const queryClient = useQueryClient();

    const form = useForm<{ name: string }>({
        initialValues: {
            name: ''
        }
    });
    const onSubmit = async (vals: { name: string }) => {
        if (type == 'language') {
          await createLanguageMutate(vals as CreateLanguageDto)
          await queryClient.invalidateQueries({
            queryKey: QueryFactory.Programming_languageQuery.getLanguageListQueryKey()
          })
        }
        else {
          await createStackMutate(vals as CreateStackDto)
          await queryClient.invalidateQueries({
            queryKey: QueryFactory.StackQuery.getStackListQueryKey()
          })
        }
        onSuccess(); // Успешная отправка
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label={type === 'language' ? "Название языка" : "Название стека"}
                key={form.key('name')}
                mb="xs"
                {...form.getInputProps('name')}
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    );
}