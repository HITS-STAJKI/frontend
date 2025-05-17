import { PartnerFilterBlock } from "widgets/PartnerFilterBlock"
import { PartnerList } from "widgets/PartnerList"
import { Container, Flex, Title } from '@mantine/core';
import { CreatePartner } from "features/Partners";

export const PartnersPage = () => {
    return (
        <Container w={'100%'} fluid>
            <Flex justify='space-between' align='flex-end' w={'100%'} >
                <Title order={1}>Компании-партнеры</Title>
                <CreatePartner />
            </Flex>
            <PartnerFilterBlock />
            <PartnerList />
        </Container>
    )
}