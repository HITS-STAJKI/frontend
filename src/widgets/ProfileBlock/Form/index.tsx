import { Button, Card, Loader, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { UserDetailsDto } from "services/api/api-client.types";
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useUpdateUserEmailMutation } from "services/api/api-client/UserQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

type ProfileFormProps = {
    profileInfo: UserDetailsDto;
    mod: "my" | "user";
    onSuccess?: () => void;
};

export const ProfileForm = ({ profileInfo, mod, onSuccess }: ProfileFormProps) => {

    const canEdit = !!(profileInfo.dean || profileInfo.curator || profileInfo.teacher || profileInfo.educationalProgramLead || (mod === "user"));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            fullName: profileInfo.fullName,
            email: profileInfo.email,
        },
    });

    const { data } = useGetCurrentUserQuery();

    const { mutateAsync: mutateEmail } = useUpdateUserEmailMutation(profileInfo.id!, {
        onSuccess: () => onSuccess?.(),
    });

    const { mutateAsync: mutateProfile } = useUpdateCurrentUserMutation({
        onSuccess: () => onSuccess?.(),
    });

    const handleSubmit = async (values: { fullName: string; email: string }) => {
        setIsSubmitting(true);
        setError(null);

        try 
        {
            if (mod === 'my') 
            {
                await mutateProfile({ fullName: values.fullName });
            }
            await mutateEmail({ email: values.email });
        } 
        catch (err: any) 
        {
            setError(getErrorMessage(err));
        } 
        finally 
        {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="ФИО"
                {...form.getInputProps('fullName')}
                mb="xs"
                readOnly={mod !== 'my'}
            />
            <TextInput
                label="Email"
                {...form.getInputProps('email')}
                mb="xs"
                readOnly={!data?.dean}
            />

            {error && (
                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                        Ошибка: {error}
                    </Text>
                </Card>
            )}

            <Button type="submit" color="blue" disabled={!canEdit || isSubmitting}>
                {isSubmitting ? <Loader size="xs" color="white" /> : 'Сохранить'}
            </Button>
        </form>
    );
};