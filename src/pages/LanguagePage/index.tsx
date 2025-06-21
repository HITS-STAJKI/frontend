import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";
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
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <LanguageList items={data || []} pagination={GET_LANGUAGES.pagination} type='language' />
                )}
            </Flex>
        </Container>

    );
};