import { SelectionStudentList, SelectionSearchForm } from "widgets/Selection/indexStudents"
import { GET_INTERVIEWS } from "shared/lib";
import { Container, Flex } from "@mantine/core";
import { TitleForm } from "widgets/Selection/indexStudents";

const SelectionStudentPage = () => {
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column">
                    <TitleForm />
                    <SelectionSearchForm />
                    <SelectionStudentList page={GET_INTERVIEWS} />
                </Flex>
            </Container>
        </>
    )
}

export default SelectionStudentPage