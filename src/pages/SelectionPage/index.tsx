import { SelectionList } from "widgets/Selection"
import { GET_INTERVIEWS } from "shared/lib";
import { Container, Flex } from "@mantine/core";
import { SearchForm } from "widgets/Selection";

export const SelectionPage = () => {
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column">
                    <SearchForm />
                    <SelectionList page={GET_INTERVIEWS}/>
                </Flex>
            </Container>
        </>
    )
}
