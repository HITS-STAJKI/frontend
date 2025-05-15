import { Button, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Group, StudentUpdate } from "shared/lib"
import { useState } from 'react';

type AddStudentInGroupFormProps = {
    onSuccess: () => void
    group: Group
}

export const AddStudentInGroupForm = ({ onSuccess, group }: AddStudentInGroupFormProps) => {
    const [isAdding, setIsAdding] = useState(false);
    
    const form = useForm<StudentUpdate & {studentId: string}>({
        initialValues: {
            groupId: group.id, 
            studentId: ""
        },
    });

    const handleEdit = (vals: StudentUpdate  & {studentId: string}) => {
        console.log("Тело запроса", vals);
        onSuccess();
    };

    return (
        <>
            <Button 
                color={isAdding ? 'gray' : 'blue'} 
                onClick={() => setIsAdding(prev => !prev)}
            >
                {isAdding ? 'Скрыть' : 'Добавить студента'}
            </Button>
            {isAdding && (
                <form onSubmit={form.onSubmit(handleEdit)}>
                    <Select
                        label="Выберите студента"
                        placeholder="Начните вводить имя студента"
                        data={group.students.map(student => ({
                            value: student.id,
                            label: `${student.user.firstName} ${student.user.lastName}`, 
                        }))}
                        searchable
                        {...form.getInputProps('studentId')}
                    />
                    <Button 
                        mt="md" 
                        mb="md"
                        style={{ float: 'right' }}
                        type='submit'>
                            {'Сохранить'}
                    </Button>
                </form>
            )}
        </>
    );
};