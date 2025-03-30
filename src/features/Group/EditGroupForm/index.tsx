import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Group, GroupUpdate } from "shared/lib"

type EditGroupButtonProps = {
    onSuccess: () => void
    group: Group
}

export const EditGroupForm = ({ onSuccess, group }: EditGroupButtonProps) => {
    const form = useForm<GroupUpdate>({
        initialValues: {
            number: group.number
        }
    })

    const handleEdit = (vals: GroupUpdate) => {
        // TODO Логика редактирования группы
        console.log("Тело запроса", vals)
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