import { SelectionStudentList, SelectionSearchForm } from "widgets/Selection/indexStudents"
import { Center, Container, Flex, Loader } from "@mantine/core";
import { TitleForm } from "widgets/Selection/indexStudents";
import { Pagination } from "shared/ui";
import { useGetInterviewList_1Query } from "services/api/api-client/InterviewsQuery";
import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery";

const SelectionStudentPage = () => {
    const { data, isLoading } = useGetInterviewList_1Query()
    const { data: user, isLoading: loadingUser } = useGetCurrentUserQuery()
    if (isLoading || loadingUser) {
        return <Center>
            <Loader />
        </Center>
    }
    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column">
                    <TitleForm />
                    <SelectionSearchForm />
                    <SelectionStudentList data={data?.items!} chatId={user?.student?.chatId!} />
                    <Pagination pagination={data?.pagination} />
                </Flex>
            </Container>
        </>
    )
}

export default SelectionStudentPage