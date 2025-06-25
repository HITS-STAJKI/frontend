import { Container, Flex, Text, Title } from "@mantine/core";
import { FilterBlockShort, FilterUserName, FilterUserRole } from "entity";
import { useSearchParams } from "react-router-dom";
import { UserRole } from "services/api/api-client.types";
import { useGetUserListQuery } from "services/api/api-client/UserQuery";
import { Pagination } from "shared/ui";
import { RoleDropdown, UsersList } from "widgets/RolesForm"

const RolesPage = () => {
    const [searchParams] = useSearchParams();

    const nameParam = searchParams.get('name') || undefined;
    const roleParam = searchParams.get('role') as UserRole || undefined;
    const sizeParam = searchParams.get('size') || '10';
    const page = Number(searchParams.get("page") ?? "0");

    const { data, isLoading } = useGetUserListQuery({
        fullName: nameParam,
        userRole: roleParam,
        size: Number(sizeParam),
        page: page
    });

    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <div style={{ width: '100%' }}>
            <Flex direction="column" style={{ width: '75%', margin: '0 auto', minWidth: '900px' }}>
                <Flex justify="space-between" align="flex-end" mb="md">
                    <Title order={1}>Пользователи</Title>
                    <RoleDropdown />
                </Flex>
                <FilterBlockShort
                    availableFilters={[
                        {
                            id: "name",
                            label: "ФИО пользователя",
                            element: (props) => (
                                <FilterUserName
                                    id="name"
                                    initialValue={props.initialValue}
                                    onChangeValue={props.onChangeValue}
                                />
                            )
                        },
                        {
                            id: "role",
                            label: "Роль пользователя",
                            element: (props) => (
                                <FilterUserRole
                                    id="role"
                                    initialValue={searchParams.get('role')}
                                    onChangeValue={props.onChangeValue}
                                />
                            )
                        }
                    ]}
                />
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
        </div>
    );
};

export default RolesPage