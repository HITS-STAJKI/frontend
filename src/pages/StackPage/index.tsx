import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_STACKS } from "../../shared/lib/api/stubs/";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
import { useState } from "react";

export const StackPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading } = useGetStackListQuery(searchQuery);

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm 
                    type="stack" 
                    onSearch={setSearchQuery} 
                />
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <LanguageList 
                        items={data || []} 
                        type="stack" 
                    />
                )}
            </Flex>
        </Container>
    );
};