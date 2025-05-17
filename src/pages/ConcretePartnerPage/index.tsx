import { Container } from '@mantine/core';
import { PartnerInfo } from 'entity';
import { Link } from 'react-router-dom';

export const ConcretePartnerPage = () => {
    
    return (
        <Container w={'90%'} fluid>
            <PartnerInfo partner={{id: "333", name: "Company", description: "DEsss"}} />
        </Container>
    )
}