import { Container, Flex } from "@mantine/core";
import { useState } from "react";
import { GET_COMPANIES, GET_GROUPS, GET_USER_PAGE, User } from "shared/lib";
import { UsersList, SearchRolesForm } from "widgets/RolesForm"

export const RolesPage = () => {
    const [users, setUsers] = useState<User[]>(GET_USER_PAGE.content);

    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '75%', margin: '0 auto' }}>
                <SearchRolesForm groupContent={GET_GROUPS.content} companyContent={GET_COMPANIES.content}/>
                <UsersList content={users} pagination={GET_USER_PAGE.pagination}/>
            </Flex>
        </Container>
    );
};