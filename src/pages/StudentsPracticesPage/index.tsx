import { Card, Center, Container, Flex, Loader, Text } from "@mantine/core";
import { FilterBlockShort, FilterCompanySelect, FilterGroupMultiple, FilterName, FilterTrueFalse } from "entity";
import { useSearchParams } from "react-router-dom";
import { useGetAllPracticesQuery } from "services/api/api-client/PracticeQuery";
import { PracticesFormUnder, PracticesList, SortDirectionAllPractices, SortKeyAllPractices } from "widgets/StudentsPracticesForm";
import { Pagination } from "shared/ui";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const StudentsPracticesPage = () => {
    const [searchParams] = useSearchParams();

    const studentName = searchParams.get("studentName") ?? undefined;
    const groupIds = searchParams.getAll("groupIds") ?? undefined;
    const companyId = searchParams.get("companyId") ?? undefined;
    const hasReportRaw = searchParams.get("ishasReportAcadem");
    const hasReport = hasReportRaw === "true" ? true : hasReportRaw === "false" ? false : undefined;
    const isReportApprovedRaw = searchParams.get("isReportApproved");
    const isReportApproved = isReportApprovedRaw === "true" ? true : isReportApprovedRaw === "false" ? false : undefined;
    const isArchivedRaw = searchParams.get("isArchived");
    const isArchived = isArchivedRaw === "true" ? true : isArchivedRaw === "false" ? false : undefined;
    const isPracticeApprovedRaw = searchParams.get("isPracticeApproved");
    const isPracticeApproved = isPracticeApprovedRaw === "true" ? true : isPracticeApprovedRaw === "false" ? false : undefined;

    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "0");

    const sortParam = searchParams.get("sort") as SortKeyAllPractices | null;
    const sortDirectionParam = searchParams.get("sortDirection") as SortDirectionAllPractices | null;

    const sortArray: [SortKeyAllPractices, SortDirectionAllPractices] | null =
        sortParam && sortDirectionParam ? [sortParam, sortDirectionParam] : null;

    const sort: string[] | undefined = sortArray
        ? [sortArray[1], sortArray[0]]
        : undefined;

    const { data, isLoading, isError, error, refetch } = useGetAllPracticesQuery(studentName, groupIds, companyId, hasReport, isReportApproved, isArchived, isPracticeApproved, page, size, sort);

    console.log(data);

    return (
        <div style={{ width: '100%' }}>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <FilterBlockShort availableFilters={[
                    { id: "studentName", label: "ФИО", element: (props) => <FilterName id="studentName" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "groupIds", label: "Выберете группу", element: (props) => <FilterGroupMultiple id="groupIds" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "companyId", label: "Выберете компанию", element: (props) => <FilterCompanySelect id="companyId" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "hasReport", label: "Отчет прикреплен?", element: (props) => <FilterTrueFalse id="hasReport" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isReportApproved", label: "Отчет подтвержден?", element: (props) => <FilterTrueFalse id="isReportApproved" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isArchived", label: "Архивные данные", element: (props) => <FilterTrueFalse id="isArchived" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isPracticeApproved", label: "Практика подтверждена?", element: (props) => <FilterTrueFalse id="isPracticeApproved" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                ]} />
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
                        <PracticesFormUnder studentCount={data?.pagination?.totalElements ?? 0} />
                        <PracticesList items={data?.items} pagination={data?.pagination} initialSort={sortArray} onRefresh={refetch} />
                        <Pagination pagination={data?.pagination} />
                    </>
                )}
            </Flex>
        </div>
    );
};
export default StudentsPracticesPage