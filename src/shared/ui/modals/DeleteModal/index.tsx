import {  Modal, Button } from '@mantine/core';

interface DeleteModalProps {
    opened: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string; 
}

export const DeleteModal = ({ opened, onClose, onDelete, title }: DeleteModalProps) => {

    return ( 
            <Modal
                opened={opened}
                onClose={onClose}
                title={title}
            >
                <Button color="red" onClick={() => {
                    onDelete(); 
                    onClose(); 
                }}>Удалить</Button>
            </Modal>
    )
}