import { Input, NativeSelect, Button, Switch, Flex } from '@mantine/core';

export const PartnerFilterBlock = () => {

    return (
        <Flex align="flex-end" mt="3vh" justify="space-between">
            <Flex align="center">
                <Input.Wrapper label="Название компании партнера">
                    <Input placeholder="Напр: Т-Банк" />
                </Input.Wrapper>
                
                <NativeSelect ml="xs" label="Предпочитаемый компанией стек" data={['React', 'Angular', 'Vue']} />

                <Flex direction="column" align="flex-start" ml="8px">
                    <label>Компании, в которых никто не проходит практику</label>
                    <Switch />
                </Flex>
            </Flex>
            

            <Button style={{ marginLeft: '6px' }}>
                Поиск
            </Button>
        </Flex>
    )
}