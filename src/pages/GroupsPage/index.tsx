import { GroupFilters, GroupList } from "widgets/GroupList"
import { Container, Flex, Title } from '@mantine/core';
import { CreateGroup } from "features/Group";

const GroupsPage = () => {
    return (
        <Container w={'100%'} fluid>
            <Flex justify="space-between" align="center" w={'100%'} style={{ marginBottom: '2vh' }}>
                <Title order={1}>Потоки</Title>
                <CreateGroup />
            </Flex>
            <Flex direction="column" style={{ width: '100%', margin: '0 auto' }} gap="md">
                <GroupFilters />
            </Flex>
            <GroupList />
        </Container>
    )
}

export default GroupsPage