import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Center, Container, Flex, Loader } from "@mantine/core";
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
                {isLoading ? <Center>
                    <Loader />
                </Center> :
                <LanguageList
                    items={data || []}
                    type="stack"
                    query={searchQuery}
                />}
            </Flex>
        </Container>
    );
};

export default StackPage