import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useUpdateCurrentUserPasswordMutation } from "services/api/api-client/UserQuery"

type ChangePasswordFormProps = {
    onSuccess: () => void
}

type EditPasswordType = {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string
}
export const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
    const form = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        validate: {
            repeatNewPassword: (value: string, values: EditPasswordType) =>
                value !== values.newPassword ? 'Пароли не совпадают' : null,
        },
    });
    const { mutateAsync } = useUpdateCurrentUserPasswordMutation()
    const onSubmit = (vals: EditPasswordType) => {
        mutateAsync(vals).then(() => {
            onSuccess();
        })

    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label="Старый пароль"
                type="password"
                mb="xs"
                {...form.getInputProps('oldPassword')}
                required
            />
            <TextInput
                label="Новый пароль"
                type="password"
                mb="xs"
                {...form.getInputProps('newPassword')}
                required
            />
            <TextInput
                label="Подтвердите новый пароль"
                type="password"
                mb="xs"
                {...form.getInputProps('repeatNewPassword')}
                required
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    );
};