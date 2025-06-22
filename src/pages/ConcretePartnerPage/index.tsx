import { Card, Center, Container, Loader, Text } from '@mantine/core';
import { PartnerInfo } from 'entity';
import { useParams } from 'react-router-dom';
import { useGetPartnerInfoQuery } from 'services/api/api-client/CompanyPartnersQuery';
import { getErrorMessage } from 'widgets/Helpes/GetErrorMessage';

const ConcretePartnerPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useGetPartnerInfoQuery(id!);

    if (isLoading) {
        return (
            <Container w="90%" fluid>
                <Center style={{ height: '50vh' }}>
                    <Loader size="lg" />
                </Center>
            </Container>
        );
    }

    if (error) {
        console.log('Ошибка запроса:', error);
        return (
            <Container w="90%" fluid>
                <Card withBorder padding="lg" radius="md" shadow="sm" mt="xl" bg="red.1">
                    <Text ta="center" size="lg" color="red">
                        Произошла ошибка при загрузке данных о компании.
                    </Text>
                    <Text ta="center" size="sm" color="red">
                        {getErrorMessage(error)}
                    </Text>
                </Card>
            </Container>
        );
    }

    if (!data) {
        return (
            <Container w="90%" fluid>
                <Card withBorder padding="lg" radius="md" shadow="sm" mt="xl">
                    <Text ta="center" size="lg" color="dimmed">
                        Компании нет
                    </Text>
                </Card>
            </Container>
        );
    }

    return (
        <Container w="90%" fluid>
            <PartnerInfo partner={data} refetch={refetch} />
        </Container>
    );
};

export default ConcretePartnerPage