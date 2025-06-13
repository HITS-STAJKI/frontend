import { Center, Container, Loader } from '@mantine/core';
import { PartnerInfo } from 'entity';
import { useParams } from 'react-router-dom';
import { useGetPartnerInfoQuery } from 'services/api/api-client/CompanyPartnersQuery';

export const ConcretePartnerPage = () => {
    const { id } = useParams();
    const { data, isLoading, refetch } = useGetPartnerInfoQuery(id!);

    if (isLoading) {
        return (
            <Container w="90%" fluid>
                <Center style={{ height: '50vh' }}>
                    <Loader size="lg" />
                </Center>
            </Container>
        );
    }

    return (
        <Container w="90%" fluid>
            <PartnerInfo partner={data!} refetch={refetch} />
        </Container>
    );
};