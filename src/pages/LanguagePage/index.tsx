import { LanguageList } from "../../widgets/Language";
import { SerachForm } from "../../widgets/Language";
import { Container, Flex } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";

export const LanguagePage = () => {
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SerachForm />
                <LanguageList content={GET_LANGUAGES.content} pagination={GET_LANGUAGES.pagination}/>
            </Flex>
        </Container>

    );
};