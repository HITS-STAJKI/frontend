import { ActionIcon, Button } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

type EditButtonProps = {
    onClick: () => void; 
}

export const EditButton = ({ onClick }: EditButtonProps) => {
    return (
        <ActionIcon variant="filled" aria-label="Settings" onClick={onClick}>
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    )
}