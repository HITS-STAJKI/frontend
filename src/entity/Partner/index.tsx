import { Company }  from "shared/lib"
import { Card, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type PartnerProps = {
    partner: Company; 
}

export const Partner = ({ partner }: PartnerProps) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/partner/${partner.id}`); 
    };

    return (
        <Card shadow='sm' withBorder mb="xs" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            {partner.name}
        </Card>
    )
}