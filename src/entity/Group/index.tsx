import { DeleteButton, DeleteModal, EditButton, EditGroupModal } from "shared/ui"
import { Group as GroupType, GroupUpdate }  from "shared/lib"
import { Space } from '@mantine/core';
import { useState } from 'react';

type GroupProps = {
    group: GroupType; 
}

export const Group = ({ group }: GroupProps) => {

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);

    const handleDeleteOpen = () => setDeleteModalOpened(true);
    const handleDeleteClose = () => setDeleteModalOpened(false);

    const handleEditOpen = () => setEditModalOpened(true);
    const handleEditClose = () => setEditModalOpened(false);

    const handleDelete = () => {
        // TODO Логика удаления группы
        console.log(`Группа ${group.number} удалена`); 
    };

    const handleEdit = (newNumber: string) => {
        const body: GroupUpdate = {
            number: newNumber
        }
        // TODO Логика редактирования группы
        console.log("Тело запроса", body); 
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            border: '1px solid black', 
            borderRadius: '8px', 
            marginBottom: '10px', 
            width: '100%', 
            boxSizing: 'border-box' 
        }}>
            {group.number} 
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <EditButton onClick={handleEditOpen} />
                <Space w="xs" />
                <DeleteButton onClick={handleDeleteOpen} />
            </div>
            
        
            <DeleteModal
                opened={deleteModalOpened}
                onClose={handleDeleteClose}
                onDelete={handleDelete}
                title={`Вы уверены, что хотите удалить группу ${group.number}?`}
            />

            <EditGroupModal
                opened={editModalOpened}
                onClose={handleEditClose}
                onEdit={handleEdit}
                number={group.number}
            />

        </div>
    )
}