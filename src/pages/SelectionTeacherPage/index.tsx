//@ts-nocheck
import { SelectionFinder, SelectionTeacherList, SortKeyST, SortDirectionST } from "widgets/Selection/indexTeachers"
import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { Pagination } from "shared/ui";
import { useGetInterviewListQuery } from "services/api/api-client/InterviewsQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";
import { useSearchParams } from "react-router-dom";
import { Status } from "services/api/api-client.types";
import { FilterBlockFull, FilterCompanySelect, FilterDate, FilterGroupSelect, FilterInterviewStatus, FilterLanguageMultiple, FilterName, FilterStack } from "entity";

const SelectionTeacherPage = () => {
    const [searchParams] = useSearchParams();

    const studentName = searchParams.get("studentName") ?? undefined;
    const stackId = searchParams.get("stackId") ?? undefined;
    const companyId = searchParams.get("companyId") ?? undefined;
    const languageIds = searchParams.getAll("languageIds");
    const groupId = searchParams.get("groupId") ?? undefined;
    const status = searchParams.get("status") || undefined
    const dateFrom = searchParams.get("dateFrom") || undefined
    const dateTo = searchParams.get("dateTo") || undefined

    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "0");

    const sortParam = searchParams.get("sort") as SortKeyST | null;
    const sortDirectionParam = searchParams.get("sortDirection") as SortDirectionST | null;

    const sortArray: [SortKeyST, SortDirectionST] | null =
        sortParam && sortDirectionParam ? [sortParam, sortDirectionParam] : null;

    const sort: string[] | undefined = sortArray
        ? [sortArray[1], sortArray[0]]
        : undefined;

    const sortStr = sortArray ? [`${sortArray[0]},${sortArray[1]}`] : undefined;

    const { data, isLoading, isError, error } = useGetInterviewListQuery(studentName, companyId, stackId, languageIds, groupId, status as Status, dateFrom, dateTo, page, size, sortStr)

    return (
        <>
            <Container p={0} fluid style={{ width: '100%', marginInline: '2vh' }}>
                <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                    <FilterBlockFull availableFilters={[
                        { id: "studentName", label: "ФИО", element: (props) => <FilterName id="studentName" onChangeValue={props.onChangeValue} /> },
                        { id: "companyId", label: "Компания", element: (props) => <FilterCompanySelect id="companyId" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                        { id: "stackId", label: "Стек", element: (props) => <FilterStack id="stackId" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                        { id: "languageIds", label: "Язык программирования", element: (props) => <FilterLanguageMultiple initialValue={props.initialValue} id="languageIds" onChangeValue={props.onChangeValue} /> },
                        { id: "groupId", label: "Поток", element: (props) => <FilterGroupSelect id="groupId" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                        { id: "status", label: "Статус", element: (props) => <FilterInterviewStatus id="status" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                        { id: "dateFrom", label: "Дата от", element: (props) => <FilterDate id="dateFrom" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                        { id: "dateTo", label: "Дата до", element: (props) => <FilterDate id="dateTo" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                    ]}
                    />
                    {isLoading ? (
                        <Center style={{ height: 300 }}>
                            <Loader size="lg" />
                        </Center>
                    ) : isError ? (
                        <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                            <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                                Ошибка: {getErrorMessage(error)}
                            </Text>
                        </Card>
                    ) : (
                        <>
                            <SelectionFinder studentCount={data?.pagination?.totalElements!} />
                            <SelectionTeacherList items={data?.items!} pagination={data?.pagination!} size={size} initialSort={sortArray} />
                            <Pagination pagination={data?.pagination} />
                        </>
                    )}
                </Flex>
            </Container>
        </>
    )
}

export default SelectionTeacherPage