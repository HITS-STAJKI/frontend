import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";

export const LanguagePage = () => {
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="language" />
                <LanguageList content={GET_LANGUAGES.content} pagination={GET_LANGUAGES.pagination} type='language' />
            </Flex>
        </Container>

    );
};