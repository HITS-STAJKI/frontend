import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
import { useState } from "react";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const StackPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isError, error } = useGetStackListQuery(searchQuery);

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm
                    type="stack"
                    onSearch={setSearchQuery}
                />
                {isLoading ? <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                    <Loader size="lg" />
                </Center> : isError ? <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                        Ошибка: {getErrorMessage(error)}
                    </Text>
                </Card> : !data ? <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                    <Text>Нет данных</Text>
                </Center> :
                    <LanguageList
                        items={data || []}
                        type="stack"
                    />}
            </Flex>
        </Container>
    );
};

export default StackPage