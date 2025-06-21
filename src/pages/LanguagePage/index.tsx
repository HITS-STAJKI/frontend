import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";
import LoginPage from "pages/LoginPage";

const LanguagePage = () => {
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="language" />
                <LanguageList items={GET_LANGUAGES.items} pagination={GET_LANGUAGES.pagination} type='language' />
            </Flex>
        </Container>

    );
};

export default LoginPage