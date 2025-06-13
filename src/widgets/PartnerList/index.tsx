import { Partner } from "entity"
import { Container } from '@mantine/core';
import { Pagination } from "shared/ui";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useSearchParams } from "react-router-dom";

export const PartnerList = () => {
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id") ?? undefined;
    const name = searchParams.get("name") ?? undefined;
    const isNewRaw = searchParams.get("isNew");
    const isNew = isNewRaw === "true" ? true : isNewRaw === "false" ? false : undefined;
    const size = Number(searchParams.get("size") ?? "10");

    const { data, isLoading } = useGetPartnersQuery(id, name, isNew, 0, size);

    if (isLoading) return "Загрузка";

    return (
        <div style={{ paddingBottom: '70px' }}>
            <Container size="100%" mt="3vh">
                {data?.items?.map((partner) => (
                    <Partner key={partner.id} partner={partner} />
                ))}
                <Pagination pagination={data?.pagination} />
            </Container>
        </div>
    );
};
