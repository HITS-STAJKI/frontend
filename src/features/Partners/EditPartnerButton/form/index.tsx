import { Button, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Company, CompanyUpdate } from "shared/lib"

type EditPartnerFormProps = {
    onSuccess: () => void
    partner: Company
}

export const EditPartnerForm = ({ onSuccess, partner }: EditPartnerFormProps) => {
    const form = useForm<CompanyUpdate>({
        initialValues: {
            name: partner.name,
            description: partner.description,
        }
    })

    const handleEdit = (vals: CompanyUpdate) => {
        // TODO Логика редактирования
        console.log("Тело запроса", vals)
        onSuccess()
    }

    return (
        <form onSubmit={form.onSubmit(handleEdit)}>
            <TextInput
                required
                label="Название компании"
                {...form.getInputProps('name')}
                error={form.errors.name}
                mb="xs"
            />
            <Textarea
                required
                autosize
                minRows={2}
                maxRows={16}
                label="Описание компании"
                {...form.getInputProps('description')}
                error={form.errors.description}
                mb="xs"
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    )
}