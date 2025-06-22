import { SelectionTeacherFilters, SelectionFinder, SelectionTeacherList } from "widgets/Selection/indexTeachers"
import { Center, Container, Flex, Loader } from "@mantine/core";
import { Pagination } from "shared/ui";
import { useGetInterviewListQuery } from "services/api/api-client/InterviewsQuery";

const SelectionTeacherPage = () => {
    const { data, isLoading } = useGetInterviewListQuery()
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                    <SelectionTeacherFilters />
                    <SelectionFinder studentCount={data?.pagination?.totalElements!} />
                    <SelectionTeacherList items={data?.items!} pagination={data?.pagination!} />
                    <Pagination pagination={data?.pagination} />
                </Flex>
            </Container>
        </>
    )
}

export default SelectionTeacherPage