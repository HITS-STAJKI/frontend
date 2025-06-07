import { Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ShortCompanyPartnerDto } from "services/api/api-client.types";

type PartnerProps = {
    partner: ShortCompanyPartnerDto;
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