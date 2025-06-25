import { Button, Card, Center, Loader, Select, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserDetailsDto } from "services/api/api-client.types"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useReturnStudentFromAcademMutation } from "services/api/api-client/StudentQuery"
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage"

type RemoveFromAcademFormProps = {
    onSuccess: () => void
}

type StudendGroupType = {
    groupId: string
}
export const RemoveFromAcademForm = ({ onSuccess, user }: RemoveFromAcademFormProps & { user: UserDetailsDto }) => {
    const { data: groups, isLoading } = useGetGroupsQuery(undefined, undefined, undefined, 1000000000);
    const { mutateAsync, isPending, isError, error } = useReturnStudentFromAcademMutation(user.student?.id!);
    const { refetch } = useGetUserByIdQuery(user.id);

    const form = useForm({
        initialValues: {
            groupId: ""
        }
    });

    const onSubmit = async (vals: StudendGroupType) => {
        try 
        {
            await mutateAsync(vals);
            await refetch();
            onSuccess();
        } 
        catch (err) 
        {
            console.log(err);
        }
    };

    if (isLoading) 
    {
        return (
            <Center style={{ height: 300 }}>
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
                label="Выберите группу"
                placeholder="Начните вводить номер группы"
                required
                data={groups?.items!.map(group => ({
                    value: group.id!,
                    label: `${group.number}`,
                }))}
                searchable
                disabled={isPending}
                {...form.getInputProps('groupId')}
            />

            {isError && (
                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" mb="xs">
                        Ошибка при изменении группы:
                    </Text>
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage(error as any)}
                    </Text>
                </Card>
            )}

            <Button type="submit" mt="md" loading={isPending} fullWidth>
                Сохранить
            </Button>
        </form>
    );
};