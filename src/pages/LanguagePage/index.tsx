import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";
import { useState } from "react";
import { Language } from "shared/lib";

export const LanguagePage = () => {
    const [languages, setLanguages] = useState<Language[]>(GET_LANGUAGES.content); // Начальный массив языков
    const handleCreateItem = (newLanguage: Language) => { // Создание нового языка
        setLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
    };

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm onCreate={handleCreateItem} type="language"/>
                <LanguageList content={languages} pagination={GET_LANGUAGES.pagination}/>
            </Flex>
        </Container>

    );
};