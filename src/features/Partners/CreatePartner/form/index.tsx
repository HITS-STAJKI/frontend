import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { CreateCompanyPartnerDto } from "services/api/api-client.types"
import { useCreatePartnerMutation, useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"

type CreatePartnerFormProps = {
    onSuccess: () => void
}

export const CreatePartnerForm = ({ onSuccess }: CreatePartnerFormProps) => {
    const { mutateAsync } = useCreatePartnerMutation()
    const { refetch } = useGetPartnersQuery()
    const form = useForm<CreateCompanyPartnerDto>()
    const onSubmit = (vals: CreateCompanyPartnerDto) => {
        mutateAsync(vals).then(() => {
            refetch()
            onSuccess()
        })
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
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    )
}