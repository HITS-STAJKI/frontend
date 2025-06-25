import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import { UserDetailsDto } from "services/api/api-client.types";
import { useUpdateUserEmailMutation } from "services/api/api-client/UserQuery";

type ProfileFormProps = {
    profileInfo: UserDetailsDto;
    mod: "my" | "user";
};

export const ProfileForm = ({ profileInfo, mod }: ProfileFormProps) => {

    const canEdit = !!(profileInfo.dean || profileInfo.curator || profileInfo.teacher || profileInfo.educationalProgramLead || (mod === "user"));

    const form = useForm({
        initialValues: {
            fullName: profileInfo.fullName,
            email: profileInfo.email,
        },
    });
    const { id } = useParams()
    const { mutateAsync } = useUpdateUserEmailMutation(id!)
    const handleSubmit = (values: { fullName: string; email: string }) => {
        mutateAsync({ email: values.email })
    };


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
            <Button type="submit" color="blue" disabled={!canEdit}>
                Сохранить
            </Button>

        </form>
    );
};