import { SelectionStudentList, SelectionSearchForm } from "widgets/Selection/indexStudents"
import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { TitleForm } from "widgets/Selection/indexStudents";
import { Pagination } from "shared/ui";
import { useGetInterviewList_1Query } from "services/api/api-client/InterviewsQuery";
import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery";
import { useSearchParams } from "react-router-dom";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

const SelectionStudentPage = () => {
    const [searchParams] = useSearchParams();
    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "0");
    const { data: list, isLoading: isLoadingList, isError: isErrorList, error: errorList } = useGetInterviewList_1Query(page, size)



    const { data: user, isLoading: loadingUser, isError: isErrorUser, error: errorUser } = useGetCurrentUserQuery()

    if (isLoadingList || loadingUser) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isErrorList || isErrorUser) {
        return (
            <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    Ошибка:
                </Text>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    {getErrorMessage(errorUser)}
                </Text>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    {getErrorMessage(errorList)}
                </Text>
            </Card>
        );
    }

    if (!list || !user) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Text>Нет данных</Text>
            </Center>
        );
    }

    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column">
                    <TitleForm />
                    <SelectionSearchForm />
                    <SelectionStudentList data={list?.items!} chatId={user?.student?.chatId!} />
                    <Pagination pagination={list?.pagination} />
                </Flex>
            </Container>
        </>
    )
}

export default SelectionStudentPage