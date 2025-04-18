import { Partner } from "entity"
import { GET_COMPANIES } from "shared/lib"
import { Container } from '@mantine/core';

export const PartnerList = () => {

    return (
        <Container size="100%" mt="3vh">
            {GET_COMPANIES.content.map((partner) => (
                <Partner key={partner.id} partner={partner} /> 
            ))}
        </Container>
    )
}
