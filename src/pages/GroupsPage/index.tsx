import { GroupList } from "widgets/GroupList"
import { GroupSearchBlock } from "widgets/GroupSearchBlock"
import { Container, Flex, Title } from '@mantine/core';
import { CreateGroup } from "features/Group";

const GroupsPage = () => {
    return (
        <Container w={'100%'} fluid>
            <Title order={1}>Группы</Title>

            <Flex justify='space-between' align='flex-end' w={'100%'} >
                <GroupSearchBlock />
                <CreateGroup />
            </Flex>

            <GroupList />
        </Container>
    )
}

export default GroupsPage