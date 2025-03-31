import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_STACKS } from "../../shared/lib/api/stubs/";
import { useState } from "react";
import { Stack } from "shared/lib";

export const StackPage = () => {
    const [stacks, setLanguages] = useState<Stack[]>(GET_STACKS.content); // Начальный массив стеков
    const handleCreateItem = (newStack: Stack) => { // Создание нового языка
        setLanguages((prevStack) => [...prevStack, newStack]);
    };

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm onCreate={handleCreateItem} type="stack"/>
                <LanguageList content={stacks} pagination={GET_STACKS.pagination}/>
            </Flex>
        </Container>

    );
};