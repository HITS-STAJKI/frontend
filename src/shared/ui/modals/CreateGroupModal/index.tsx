import {  Modal, Button, TextInput } from '@mantine/core';
import { useState, useEffect } from 'react';

interface CreateGroupModalProps {
    opened: boolean;
    onClose: () => void;
    onCreate: (newNumber: string) => void;
}

export const CreateGroupModal = ({ opened, onClose, onCreate }: CreateGroupModalProps) => {

    const [createdNumber, setCreatedNumber] = useState<string>(); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        setCreatedNumber("");
        setError(null); 
    }, [opened]);

    const handleCreate = () => {
        if (!createdNumber || !createdNumber.trim()) { 
            setError("Поле не может быть пустым"); 
            return;
        }
        onCreate(createdNumber); 
        onClose(); 
    };

    return ( 
            <Modal
                opened={opened}
                onClose={onClose}
                title={`Создать группу`}
            >
                <TextInput 
                    label="Номер группы" 
                    value={createdNumber} 
                    onChange={(event) => setCreatedNumber(event.currentTarget.value)} 
                    error={error}
                    mb="xs"
                />
                
                <Button onClick={handleCreate}>Сохранить</Button>
            </Modal>
    )
}