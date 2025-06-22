import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Center, Container, Flex, Loader } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";

const LanguagePage = () => {
    const { data, isLoading } = useGetLanguageListQuery()
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="language" />
                <LanguageList items={data!} type='language' />
            </Flex>
        </Container>

    );
};

export default LanguagePage