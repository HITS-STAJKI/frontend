import { Input, Button, Flex } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const GroupSearchBlock = () => {
    return (
        <Flex align="flex-end">
            <Input.Wrapper label="Поиск по номеру группы">
                <Input placeholder="Введите номер группы" />
            </Input.Wrapper>

            <Button variant="filled" aria-label="Settings" style={{ marginLeft: '6px' }}>
                <IconSearch style={{ width: '70%', height: '70%' }} stroke={2.5} />
            </Button>
        </Flex>
    )
}