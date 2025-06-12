import { PartnerList } from "widgets/PartnerList"
import { Container, Flex, Title } from '@mantine/core';
import { CreatePartner } from "features/Partners";
import { FilterBlockShort, FilterCompanyName, FilterCompanySelect, FilterTrueFalse } from "entity";

export const PartnersPage = () => {
    return (
        <Container w={'100%'} fluid>
            <Flex justify='space-between' align='flex-end' w={'100%'} >
                <Title order={1}>Компании-партнеры</Title>
                <CreatePartner />
            </Flex>
            <FilterBlockShort availableFilters={[
                {id: "id",label: "Идентификатор компании",element: (props) => <FilterCompanySelect id="id" onChangeValue={props.onChangeValue} />},
                {id: "name",label: "Название компании",element: (props) => <FilterCompanyName id="name" onChangeValue={props.onChangeValue} />},
                {id: "isNew",label: "Только новые компании",element: (props) => <FilterTrueFalse id="isNew" onChangeValue={props.onChangeValue} />},
            ]}/>
            <PartnerList />
        </Container>
    )
}