import { Partner } from "entity"
import { GET_COMPANIES } from "shared/lib"
import { Container } from '@mantine/core';
import { Pagination } from "shared/ui";

export const PartnerList = () => {

    return (
        <div style={{ paddingBottom: '70px' }}>
            <Container size="100%" mt="3vh">
            {GET_COMPANIES.content.map((partner) => (
                <Partner key={partner.id} partner={partner} /> 
            ))}
            <Pagination pagination={GET_COMPANIES.pagination} />
        </Container>
        </div>
        
    )
}
