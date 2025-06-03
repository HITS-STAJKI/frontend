import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { GroupCreate } from "shared/lib"

type CreateGroupFormProps = {
    onSuccess: () => void
}

export const CreateGroupForm = ({ onSuccess }: CreateGroupFormProps) => {
    const form = useForm<GroupCreate>({
        initialValues: {
            number: ''
        }
    })
    const onSubmit = (vals: GroupCreate) => {
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