import { Button, Flex, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { LanguageUpdate } from "shared/lib"

export const UpdateLanguageOrStackForm = ({ id, name, onSuccess }: { id: string, name: string, onSuccess: () => void }) => {
    const form = useForm<LanguageUpdate>({
        initialValues: {
            name: name
        }
    })
    const onSub = (vals: LanguageUpdate) => {
        console.log({ id: id, ...vals })
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