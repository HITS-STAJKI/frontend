import { LanguageList } from "../../widgets/LanguageStack";
import { SearchForm } from "../../widgets/LanguageStack";
import { Container, Flex } from "@mantine/core";
import { GET_STACKS } from "../../shared/lib/api/stubs/";

export const StackPage = () => {

    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <SearchForm type="stack" />
                <LanguageList items={GET_STACKS.items} pagination={GET_STACKS.pagination} type='stack' />
            </Flex>
        </Container>

    );
};