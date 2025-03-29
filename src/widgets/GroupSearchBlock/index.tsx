import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const GroupSearchBlock = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}> 
            <Input.Wrapper label="Поиск по номеру группы">
                <Input placeholder="Введите номер группы" />
            </Input.Wrapper>
            <div style={{ marginLeft: '6px' }}>блок сортировки добавить</div>

            <Button variant="filled" aria-label="Settings" style={{ marginLeft: '6px' }}>
                <IconSearch style={{ width: '70%', height: '70%' }} stroke={2.5} />
            </Button>
        </div>
    )
}