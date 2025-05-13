import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { CompanyCreate } from "shared/lib"

type CreatePartnerFormProps = {
    onSuccess: () => void
}

export const CreatePartnerForm = ({ onSuccess }: CreatePartnerFormProps) => {
    const form = useForm<CompanyCreate>({
        initialValues: {
            name: '',
            description: '',
            curator: {
                id: '',
                user: {
                    id: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    roles: []
                },
                companyId: ''
            }
        }
    })
    const onSubmit = (vals: CompanyCreate) => {
        console.log('Тело запроса', vals)
        onSuccess()
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label="Название"
                key={form.key('name')}
                mb="xs"
                {...form.getInputProps('name')}
            />

            <TextInput
                label="Описание"
                key={form.key('description')}
                mb="xs"
                {...form.getInputProps('description')}
            />

            <TextInput
                label="Куратор"
                key={form.key('curator')}
                mb="xs"
                {...form.getInputProps('curator')}
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    )
}