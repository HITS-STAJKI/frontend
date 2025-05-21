import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserProfileType } from "shared/lib";

type ProfileFormProps = {
    profileInfo: UserProfileType;
    children?: (saveButton: React.ReactNode) => React.ReactNode;
    mod: "my" | "user";
};

export const ProfileForm = ({ profileInfo, children, mod }: ProfileFormProps) => {

    const canEdit = !!(profileInfo.dean || profileInfo.curator || profileInfo.teacher || profileInfo.educationalProgramLead || (mod==="user"));

    const form = useForm({
        initialValues: {
            fullName: profileInfo.fullName,
            email: profileInfo.email,
        },
    });

    const handleSubmit = (values: { fullName: string; email: string }) => {
        console.log("Edit profile", values);
    };

    const saveButton = (
        <Button type="submit" color="blue" disabled={!canEdit}>
            Сохранить
        </Button>
    );

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="ФИО"
                {...form.getInputProps('fullName')}
                mb="xs"
                readOnly={!canEdit}
            />
            <TextInput
                label="Email"
                {...form.getInputProps('email')}
                mb="xs"
                readOnly={!canEdit}
            />
            {children ? children(saveButton) : saveButton}
        </form>
    );
};