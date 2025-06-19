import { Partner, PartnerEmpty } from "entity"
import { Center, Container, Loader } from '@mantine/core';
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
    const page = Number(searchParams.get("page") ?? "0");

    const { data, isLoading } = useGetPartnersQuery(id, name, isNew, page, size);

    if (isLoading) {
        return (
            <Center style={{ height: '50vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <div style={{ paddingBottom: '70px' }}>
            <Container size="100%" mt="3vh">
                {(!data || !data.items || data.items.length === 0) ? (
                    <PartnerEmpty />
                ) : (
                    data.items.map((partner) => (
                        <Partner key={partner.id} partner={partner} />
                    ))
                )}
                <Pagination pagination={data?.pagination} />
            </Container>
        </div>
    );
};
