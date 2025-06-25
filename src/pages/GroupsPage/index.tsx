import { GroupFilters, GroupList } from "widgets/GroupList"
import { Container, Flex, Title,  Center, Loader } from '@mantine/core';
import { CreateGroup } from "features/Group";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useSearchParams } from "react-router-dom";

const GroupsPage = () => {
    
    const [searchParams] = useSearchParams();

    // const nameParam = searchParams.get('name') || undefined;
    const groupId = searchParams.get('id') || undefined;
    const groupNumber = searchParams.get('number') || undefined;
    const sizeParam = searchParams.get('size') || '10';
    const page = Number(searchParams.get("page") ?? "0");

    const { data, isLoading } = useGetGroupsQuery({
        id: groupId,
        number: groupNumber,
        size: Number(sizeParam),
        page: page
    });
    const items = data?.items || [];

    return (
        <Container w={'100%'} fluid>
            <Flex justify="space-between" align="center" w={'100%'} style={{ marginBottom: '2vh' }}>
                <Title order={1}>Потоки</Title>
                <CreateGroup />
            </Flex>
            <Flex direction="column" style={{ width: '100%', margin: '0 auto' }} gap="md">
                <GroupFilters items={items} pagination={data?.pagination!} />
            </Flex>
            {isLoading ? <Center>
                    <Loader />
                </Center>: 
                <GroupList items={items} pagination={data?.pagination!} /> 
            }
            
        </Container>
    )
}

export default GroupsPage