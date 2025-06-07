import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { GroupDto } from "services/api/api-client.types"
import { GroupUpdate } from "shared/lib"

type EditGroupFormProps = {
    onSuccess: () => void
    group: GroupDto
}

export const EditGroupForm = ({ onSuccess, group }: EditGroupFormProps) => {
    const form = useForm<GroupUpdate>({
        initialValues: {
            number: group.number!
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