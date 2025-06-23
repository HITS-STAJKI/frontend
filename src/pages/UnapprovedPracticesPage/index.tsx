import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { Pagination } from "shared/ui";
import { useGetPracticeRequestsQuery } from "services/api/api-client/PracticeQuery";
import { SortDirectionUnapprovedPractices, SortKeyUnapprovedPractices, UnapprovedPracticesForm, UnapprovedPracticesFormUnder } from "widgets/UnapprovedPracticesForm";
import { useSearchParams } from "react-router-dom";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

const UnapprovedPracticesPage = () => {
    const [searchParams] = useSearchParams();
    const size = Number(searchParams.get("size") ?? "20");
    const page = Number(searchParams.get("page") ?? "0");

    const sortParam = searchParams.get("sort") as SortKeyUnapprovedPractices | null;
    const sortDirectionParam = searchParams.get("sortDirection") as SortDirectionUnapprovedPractices | null;

    const sortArray: [SortKeyUnapprovedPractices, SortDirectionUnapprovedPractices] | null =
        sortParam && sortDirectionParam ? [sortParam, sortDirectionParam] : null;

    const sort: string[] | undefined = sortArray
        ? [sortArray[1], sortArray[0]]
        : undefined;

    const { data: practicesData, isLoading, isError, error } = useGetPracticeRequestsQuery(page, size, sort);

    if (isLoading) 
    {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) 
    {
        return (
            <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    Ошибка: {getErrorMessage(error)}
                </Text>
            </Card>
        );
    }

    if (!practicesData) 
    {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Text>Нет данных</Text>
            </Center>
        );
    }

    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                    <UnapprovedPracticesFormUnder studentCount={practicesData?.pagination?.totalElements ?? 0} />
                    <UnapprovedPracticesForm items={practicesData?.items!} pagination={practicesData?.pagination!} initialSort={sortArray}/>
                    <Pagination pagination={practicesData?.pagination} />
                </Flex>
            </Container>
        </>
    )
}

export default UnapprovedPracticesPage