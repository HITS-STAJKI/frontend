import { Company }  from "shared/lib"
import { Title, Container } from '@mantine/core';

type PartnerInfoProps = {
    partner: Company; 
}

export const PartnerInfo = ({partner}: PartnerInfoProps) => {

    return (
        <Container w='100%'>
            {/* {partner.name} */}
            <Title order={1}>{partner.name}</Title>
            <div>{partner.description}</div>
            
        </Container>
    )
}