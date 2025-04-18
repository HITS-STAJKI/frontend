import { Company }  from "shared/lib"
import { Card, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type PartnerInfoProps = {
    partner: Company; 
}

export const PartnerInfo = ({ partner }: PartnerInfoProps) => {

    return (
        <Card shadow='sm' withBorder mb="xs">
            {/* {partner.name} */}
            Card name
        </Card>
    )
}