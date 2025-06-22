import { Container, Flex, Text } from "@mantine/core";
import { useState } from "react";
import { UserRole } from "services/api/api-client.types";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useGetUserListQuery } from "services/api/api-client/UserQuery";
import { Pagination } from "shared/ui";
import { UsersList, SearchRolesForm } from "widgets/RolesForm"

export const RolesPage = () => {
    const [searchParams, setSearchParams] = useState<{
        name?: string;
        role?: UserRole;
    }>({});

    const { data, isLoading } = useGetUserListQuery({
        fullName: searchParams.name,
        userRole: searchParams.role,
    });
    // const { data: groups, isLoading: isLoadingGroups } = useGetGroupsQuery()
    // const { data: partners, isLoading: isLoadingPartners } = useGetPartnersQuery()

    const handleSearch = (values: typeof searchParams) => {
        setSearchParams(values);
    };

    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '75%', margin: '0 auto',  minWidth: '900px' }}>
                <SearchRolesForm onSearch={handleSearch} initialValues={searchParams} />
                {data?.items?.length === 0 ? (
                    <Text>Пользователи не найдены</Text>
                ) : (
                    <>
                        <UsersList 
                            items={data?.items!} 
                            pagination={data?.pagination!} 
                        />
                        <Pagination pagination={data?.pagination} />
                    </>
                )}
            </Flex>
        </Container>
    );
};