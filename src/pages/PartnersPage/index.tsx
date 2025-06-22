import { PartnerList } from "widgets/PartnerList"
import { Flex, Title } from '@mantine/core';
import { CreatePartner } from "features/Partners";
import { FilterBlockShort, FilterCompanyName, FilterCompanySelect, FilterTrueFalse } from "entity";

const PartnersPage = () => {
    return (
        <div style={{ width: '100%'}}>
            <Flex direction="column" style={{ width: '75%', margin: '0 auto' }} gap="md">
                <Flex justify='space-between' align='flex-end' w={'100%'} mb="md">
                <Title order={1}>Компании-партнеры</Title>
                <CreatePartner />
            </Flex>
            <FilterBlockShort availableFilters={[
                { id: "id", label: "Идентификатор компании", element: (props) => <FilterCompanySelect id="id" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                { id: "name", label: "Название компании", element: (props) => <FilterCompanyName id="name" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                { id: "isNew", label: "Только новые компании", element: (props) => <FilterTrueFalse id="isNew" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
            ]} />
            <PartnerList />
            </Flex>
        </div>
    )
}

export default PartnersPage