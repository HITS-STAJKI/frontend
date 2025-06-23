import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Center, Container, Flex, Loader } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";
import { useState } from "react";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";

export const LanguagePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading } = useGetLanguageListQuery(searchQuery);
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm
                    type="language"
                    onSearch={setSearchQuery}
                />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <LanguageList items={data || []} type='language' />
                )}
            </Flex>
        </Container>

    );
};

export default LanguagePage