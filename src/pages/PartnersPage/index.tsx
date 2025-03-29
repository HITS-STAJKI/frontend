import { PartnerFilterBlock } from "widgets/PartnerFilterBlock"
import { PartnerList } from "widgets/PartnerList"
import { Title } from '@mantine/core';

export const PartnersPage = () => {
    return (
        <div style={{ width: '100%', padding: '0 2vw' }}>
            <Title order={1}>Компании-партнеры</Title>
            <PartnerFilterBlock />
            <PartnerList />
        </div>
    )
}