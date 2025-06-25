import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Center, Container, Flex, Loader } from "@mantine/core";
import { useState } from "react";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";

export const LanguagePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading } = useGetLanguageListQuery(searchQuery);
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm
                    type="language"
                    onSearch={setSearchQuery}
                />
                {isLoading ? <Center>
                    <Loader />
                </Center> : 
                <LanguageList items={data || []} type='language' query={searchQuery} />
                }
            </Flex>
        </Container>

    );
};

export default LanguagePage