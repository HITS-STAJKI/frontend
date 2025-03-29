import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

type DeleteButtonProps = {
    onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
    return (
        <ActionIcon variant="filled" color="red" aria-label="Settings" onClick={onClick}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    )
}