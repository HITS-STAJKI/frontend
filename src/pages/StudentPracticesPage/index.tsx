import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetStudentPracticesQuery } from "services/api/api-client/PracticeQuery";
import { PracticesFormOver, PracticesList, SortDirectionStudentPractices, SortKeyStudentPractices } from "widgets/StudentPracticesForm";
import { Pagination } from "shared/ui";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const StudentPracticesPage = () => {
    const [searchParams] = useSearchParams();
    const { id } = useParams<{ id: string }>();

    const page = Number(searchParams.get("page") ?? "0");
    const size = Number(searchParams.get("size") ?? "20");

    const sortParam = searchParams.get("sort") as SortKeyStudentPractices | null;
    const sortDirectionParam = searchParams.get("sortDirection") as SortDirectionStudentPractices | null;

    const sortArray: [SortKeyStudentPractices, SortDirectionStudentPractices] | null =
        sortParam && sortDirectionParam ? [sortParam, sortDirectionParam] : null;

    const sort: string[] | undefined = sortArray
        ? [sortArray[1], sortArray[0]]
        : undefined;

    const { data: practicesData, isLoading, isError, error } = useGetStudentPracticesQuery(id as string, page, size, sort);

    if (isLoading) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    Ошибка: {getErrorMessage(error)}
                </Text>
            </Card>
        );
    }

    if (!practicesData) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Text>Нет данных</Text>
            </Center>
        );
    }

    const studentName = practicesData?.student?.user?.fullName ?? '—';
    const groupNumber = practicesData?.student?.group?.number ?? '—';

    console.log(practicesData);

    return (
        <div style={{ width: '100%' }}>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <PracticesFormOver studentName={studentName} group={groupNumber} />
                <PracticesList items={practicesData?.practices?.items} pagination={practicesData?.practices?.pagination} size={size} initialSort={sortArray} />
                <Pagination pagination={practicesData?.practices?.pagination} />
            </Flex>
        </div>
    );
};
export default StudentPracticesPage