import { Container, Flex } from "@mantine/core";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useGetUserListQuery } from "services/api/api-client/UserQuery";
import { UsersList, SearchRolesForm } from "widgets/RolesForm"

export const RolesPage = () => {
    const { data, isLoading } = useGetUserListQuery()
    const { data: groups, isLoading: isLoadingGroups } = useGetGroupsQuery()
    const { data: partners, isLoading: isLoadingPartners } = useGetPartnersQuery()
    if (isLoading || isLoadingGroups || isLoadingPartners) {
        return 'Загрузка'
    }
    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '75%', margin: '0 auto' }}>
                <SearchRolesForm groupContent={groups?.items!} companyContent={partners?.items!} />
                <UsersList items={data?.items!} pagination={data?.pagination!} />
            </Flex>
        </Container>
    );
};