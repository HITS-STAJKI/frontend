import {  Modal, Button, TextInput } from '@mantine/core';
import { useState, useEffect } from 'react';

interface EditGroupModalProps {
    opened: boolean;
    onClose: () => void;
    onEdit: (newNumber: string) => void;
    number: string; 
}

export const EditGroupModal = ({ opened, onClose, onEdit, number }: EditGroupModalProps) => {

    const [editedNumber, setEditedNumber] = useState<string>(number);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        setEditedNumber(number);
        setError(null);
    }, [opened]);

    const handleEdit = () => {
        if (!editedNumber || !editedNumber.trim()) { 
            setError("Поле не может быть пустым"); 
            return;
        }
        onEdit(editedNumber); 
        onClose(); 
    };

    return ( 
            <Modal
                opened={opened}
                onClose={onClose}
                title={`Редактировать группу`}
            >
                <TextInput 
                    label="Номер группы" 
                    value={editedNumber} 
                    onChange={(event) => setEditedNumber(event.currentTarget.value)} 
                    error={error}
                    mb="xs"
                />
                
                <Button onClick={handleEdit}>Сохранить</Button>
            </Modal>
    )
}