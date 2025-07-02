import { Button, Card, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useUpdateCurrentUserPasswordMutation } from "services/api/api-client/UserQuery"
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage"

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
    const { mutateAsync, isPending, isError, error } = useUpdateCurrentUserPasswordMutation()
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
                disabled={isPending}
            />
            <TextInput
                label="Новый пароль"
                type="password"
                mb="xs"
                {...form.getInputProps('newPassword')}
                required
                disabled={isPending}
            />
            <TextInput
                label="Подтвердите новый пароль"
                type="password"
                mb="xs"
                {...form.getInputProps('repeatNewPassword')}
                required
                disabled={isPending}
            />

            {isError && (
                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" mb="xs">
                        Ошибка при изменении пароля:
                    </Text>
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage((error as any))}
                    </Text>
                </Card>
            )}

            <Button type="submit" loading={isPending} fullWidth>
                Сохранить
            </Button>
        </form>
    );
};