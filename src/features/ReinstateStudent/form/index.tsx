import { Button, Card, Center, Loader, Select, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { StudentCreateDto, UserDetailsDto } from 'services/api/api-client.types'
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useUpdateStudentMutation } from 'services/api/api-client/StudentQuery'
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage"
import { useChangeStudentGraduationStatusMutation } from 'services/api/api-client/GraduationQuery.ts'

type ReinstateStudentFormProps = {
    onSuccess: () => void
}

export const ReinstateStudentForm = ({ onSuccess, user }: ReinstateStudentFormProps & { user: UserDetailsDto }) => {
    const { data: groups, isLoading } = useGetGroupsQuery(undefined, undefined, undefined, 1000000000);
    const { mutateAsync, isPending, isError, error } = useChangeStudentGraduationStatusMutation();
    const { mutateAsync: changeGroupMutate} = useUpdateStudentMutation(user.student?.id!)
    const { refetch } = useGetUserByIdQuery(user.id);

    const form = useForm({
        initialValues: {
            groupId: ""
        }
    });

    const onSubmit = async (vals: StudentCreateDto) => {
        try 
        {
            await mutateAsync({studentId: user.student?.id!, status: false});
            await changeGroupMutate(vals)
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
                label="Выберите поток"
                placeholder="Начните вводить номер потока"
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
                        Ошибка при восстановлении студента:
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