import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form"

type CreateLanguageOrStackFormProps = {
    onSuccess: () => void;
    type: 'language' | 'stack';
}

export const CreateLanguageOrStackForm = ({ onSuccess, type }: CreateLanguageOrStackFormProps) => {
    const form = useForm<{ name: string }>({
        initialValues: {
            name: ''
        }
    });
    const onSubmit = (vals: { name: string }) => {
        console.log('Тело запроса', vals);
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