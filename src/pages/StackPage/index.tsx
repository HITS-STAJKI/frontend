import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Center, Container, Flex, Loader } from "@mantine/core";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";

const StackPage = () => {
    const { data, isLoading } = useGetStackListQuery()
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="stack" />
                <LanguageList items={data!} type='stack' />
            </Flex>
        </Container>

    );
};

export default StackPage