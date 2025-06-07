import { Button, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { CompanyUpdate } from "shared/lib"
import { CompanyPartnerDto } from "services/api/api-client.types"
import { useParams } from "react-router-dom"
import { useGetPartnerInfoQuery, useUpdatePartnerInfoMutation } from "services/api/api-client/CompanyPartnersQuery"

type EditPartnerFormProps = {
    onSuccess: () => void
    partner: CompanyPartnerDto
}

export const EditPartnerForm = ({ onSuccess, partner }: EditPartnerFormProps) => {
    const { id } = useParams()
    const form = useForm<CompanyUpdate>({
        initialValues: {
            name: partner.name,
            description: partner.description,
        }
    })
    const { mutateAsync } = useUpdatePartnerInfoMutation(id!)
    const { refetch } = useGetPartnerInfoQuery(id!)
    const handleEdit = (vals: CompanyUpdate) => {
        mutateAsync(vals)
            .then(() => {
                refetch()
                onSuccess()
            })

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