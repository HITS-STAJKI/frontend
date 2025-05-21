import { Button, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { GET_GROUPS } from "shared/lib"

type RemoveFromAcademFormProps = {
    onSuccess: () => void
}

type StudendGroupType = { 
    groupId: string
}
export const RemoveFromAcademForm = ({ onSuccess }: RemoveFromAcademFormProps) => {

    const listOfGroups = GET_GROUPS
    const form = useForm({
        initialValues: {
            groupId: ""
        }
    });

    const onSubmit = (vals: StudendGroupType) => {
        console.log('Тело запроса', vals);
        onSuccess();
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
                label="Выберите группу"
                placeholder="Начните вводить номер группы"
                required
                data={listOfGroups.content.map(group => ({
                    value: group.id,
                    label: `${group.number}`, 
                }))}
                searchable
                {...form.getInputProps('groupId')}
                    />
            <Button type='submit' mt="md">{'Сохранить'}</Button>
        </form>
    );
};