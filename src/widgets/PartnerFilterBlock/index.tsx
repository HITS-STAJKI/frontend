import { Input, NativeSelect, Button, Switch } from '@mantine/core';

export const PartnerFilterBlock = () => {

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: "3vh", justifyContent: 'space-between' }}> 
            <div style={{ display: 'flex', alignItems: 'center' }}> 
                <Input.Wrapper label="Название компании партнера">
                    <Input placeholder="Напр: Т-Банк" />
                </Input.Wrapper>
                
                <NativeSelect ml="xs" label="Предпочитаемый компанией стек" data={['React', 'Angular', 'Vue']} />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '8px' }}>
                    <label>Только новые компании</label>
                    <Switch />
                </div>
            </div>
            

            <Button style={{ marginLeft: '6px' }}>
                Поиск
            </Button>
        </div>
    )
}