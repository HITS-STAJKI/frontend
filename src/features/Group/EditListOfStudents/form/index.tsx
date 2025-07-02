import { Button, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMemo, useState } from 'react';
import { GroupDto } from "services/api/api-client.types";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllStudentsQuery } from "services/api/api-client/StudentQuery";

type AddStudentInGroupFormProps = {
    onSuccess: () => void
    group: GroupDto
}

export const AddStudentInGroupForm = ({ group }: AddStudentInGroupFormProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    const { data: studentsData, isLoading: isStudentsLoading } = useGetAllStudentsQuery({
        fullName: searchQuery,
        size: 500, // Получаем достаточно большое количество для выпадающего списка
    });

    // Преобразуем студентов в формат для Select
    const studentsOptions = useMemo(() => {
        return studentsData?.items?.map(student => ({
            value: student.id!,
            label: `${student.user?.fullName || 'Неизвестный студент'}`,
        })) || [];
    }, [studentsData]);

    // const { mutateAsync: createStudentMutate } = useCreateStudentMutation(selectedStudentId || '', {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ 
    //             queryKey: ['group', group.id] 
    //         });
    //         queryClient.invalidateQueries({ 
    //             queryKey: ['students'] 
    //         });
    //         onSuccess();
    //     },
    // });
    const queryClient = useQueryClient();

    const form = useForm<{ groupId: string }>({
        initialValues: {
            groupId: group.id!
        },
    });

    const handleSubmit = async () => {
        // if (!selectedStudentId) return;
        // console.log("fff ", selectedStudentId, group.id)
        // try {
        //     await createStudentMutate(
        //         selectedStudentId, 
        //         {                 
        //             body: {
        //                 groupId: group.id

        //             }
        //         }
        //     );

        //     form.reset();
        //     setIsAdding(false);
        //     setSelectedStudentId(null);
        // } catch (error) {
        //     console.error('Ошибка при добавлении студента:', error);
        // }
    };
    return (
        <>
            <Button
                color={isAdding ? 'gray' : 'blue'}
                onClick={() => setIsAdding(prev => !prev)}
                loading={isStudentsLoading}
            >
                {isAdding ? 'Скрыть' : 'Добавить студента'}
            </Button>
            {isAdding && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <Select
                        label="Выберите студента"
                        placeholder="Начните вводить имя студента"
                        data={studentsOptions}
                        searchable
                        clearable
                        onSearchChange={setSearchQuery}
                        value={selectedStudentId}
                        onChange={setSelectedStudentId}
                    />

                    <Button
                        mt="md"
                        mb="md"
                        style={{ float: 'right' }}
                        type="submit"
                        disabled={!selectedStudentId}
                    >
                        {'Добавить'}
                    </Button>
                </form>
            )}
        </>
    );
};