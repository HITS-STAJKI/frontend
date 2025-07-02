import { Partner } from "entity"
import { Card, Center, Container, Loader, Text } from '@mantine/core';
import { Pagination } from "shared/ui";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useSearchParams } from "react-router-dom";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const PartnerList = () => {
    const [searchParams] = useSearchParams();

    const id = searchParams.get("id") ?? undefined;
    const name = searchParams.get("name") ?? undefined;
    const isNewRaw = searchParams.get("isNew");
    const isNew = isNewRaw === "true" ? true : isNewRaw === "false" ? false : undefined;
    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "0");

    const { data, isLoading, error } = useGetPartnersQuery(id, name, isNew, page, size);

    if (isLoading) 
    {
        return (
            <Center style={{ height: '50vh' }}>
                <Loader size="lg" />
            </Center>
        );
    }

    if (error) 
    {
        console.log('Ошибка запроса:', error);
        return (
            <Container size="100%" mt="3vh">
                <Card withBorder padding="lg" radius="md" shadow="sm" bg="red.1">
                    <Text ta="center" size="lg" color="red">
                        Произошла ошибка при загрузке списка компаний:
                    </Text>
                    <Text ta="center" size="sm" color="red">
                        {getErrorMessage(error)}
                    </Text>
                </Card>
            </Container>
        );
    }

    return (
        <div style={{ paddingBottom: '70px' }}>
            <Container size="100%" mt="3vh">
                {(data?.items && data.items.length > 0) ? (
                    <>
                        {data.items.map((partner) => (
                            <Partner key={partner.id} partner={partner} />
                        ))}
                        <Pagination pagination={data.pagination} />
                    </>
                ) : (
                    <Card withBorder padding="lg" radius="md" shadow="sm">
                        <Text style={{ textAlign: 'center' }} color="dimmed" size="lg">
                            Компаний нет
                        </Text>
                    </Card>
                )}
            </Container>
        </div>
    );
};
