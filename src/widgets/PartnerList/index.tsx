import { Partner } from "entity"
import { Container } from '@mantine/core';
import { Pagination } from "shared/ui";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";

export const PartnerList = () => {
    const { data, isLoading } = useGetPartnersQuery()
    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <div style={{ paddingBottom: '70px' }}>
            <Container size="100%" mt="3vh">
                {data?.items!.map((partner) => (
                    <Partner key={partner.id} partner={partner} />
                ))}
                <Pagination pagination={data?.pagination} />
            </Container>
        </div>

    )
}
