import { Container } from '@mantine/core';
import { PartnerInfo } from 'entity';

export const ConcretePartnerPage = () => {
    
    return (
        <Container w={'100%'} fluid>
            <PartnerInfo partner={{id: "333", name: "Company", description: "DEsss"}} />
        </Container>
    )
}