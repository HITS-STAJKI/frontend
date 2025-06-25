import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { useState } from "react";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const LanguagePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isError, error } = useGetLanguageListQuery(searchQuery);

    if (isLoading) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    Ошибка: {getErrorMessage(error)}
                </Text>
            </Card>
        );
    }

    if (!data) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Text>Нет данных</Text>
            </Center>
        );
    }

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="language" onSearch={setSearchQuery} />
                {isLoading ? <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                    <Loader size="lg" />
                </Center> : isError ? <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                        Ошибка: {getErrorMessage(error)}
                    </Text>
                </Card> : !data ? <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                    <Text>Нет данных</Text>
                </Center> : <LanguageList items={data} type='language' />}
            </Flex>
        </Container>

    );
};

export default LanguagePage