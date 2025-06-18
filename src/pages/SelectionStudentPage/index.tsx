import { SelectionStudentList, SelectionSearchForm } from "widgets/Selection/indexStudents"
import { GET_INTERVIEWS } from "shared/lib";
import { Container, Flex } from "@mantine/core";
import { TitleForm } from "widgets/Selection/indexStudents";
import { Pagination } from "shared/ui";

export const SelectionStudentPage = () => {
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column">
                    <TitleForm />
                    <SelectionSearchForm />
                    <SelectionStudentList data={GET_INTERVIEWS}/>
                    <Pagination pagination={GET_INTERVIEWS.pagination} />
                </Flex>
            </Container>
        </>
    )
}
