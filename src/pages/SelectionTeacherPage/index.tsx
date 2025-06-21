import { SelectionTeacherFilters, SelectionFinder, SelectionTeacherList } from "widgets/Selection/indexTeachers"
import { GET_INTERVIEWFORTEACHER, GET_INTERVIEWS } from "shared/lib";
import { Container, Flex } from "@mantine/core";
import { PracticesList } from "widgets/StudentsPracticesForm";

const SelectionTeacherPage = () => {
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                    <SelectionTeacherFilters />
                    <SelectionFinder studentCount={10} />
                    <SelectionTeacherList items={GET_INTERVIEWFORTEACHER.items} pagination={GET_INTERVIEWFORTEACHER.pagination} />
                </Flex>
            </Container>
        </>
    )
}

export default SelectionTeacherPage