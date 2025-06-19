import { Center, Container, Flex, Loader } from "@mantine/core";
import { FilterBlockShort, FilterCompanySelect, FilterGroup, FilterGroupMultiple, FilterName, FilterTrueFalse, FilterTrueFalseNull } from "entity";
import { useSearchParams } from "react-router-dom";
import { useGetAllPracticesQuery } from "services/api/api-client/PracticeQuery";
import { PracticesFormUnder, PracticesList, SortDirectionAllPractices, SortKeyAllPractices } from "widgets/StudentsPracticesForm";
import { Pagination } from "shared/ui";

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

    const { data, isLoading } = useGetAllPracticesQuery(studentName, groupIds, companyId, hasReport, isReportApproved, isArchived, isPracticeApproved, page, size, sort);

    if (isLoading) {
        return (
            <Center
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 9999
                }}
            >
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '100%', margin: '0 auto' }} gap="md">
                <FilterBlockShort availableFilters={[
                    {id: "studentName",label: "ФИО",element: (props) => <FilterName id="studentName" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "groupIds",label: "Выберете группу",element: (props) => <FilterGroupMultiple id="groupIds" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "companyId",label: "Выберете компанию",element: (props) => <FilterCompanySelect id="companyId" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "hasReport",label: "Отчет прикреплен?",element: (props) => <FilterTrueFalse id="hasReport" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "isReportApproved",label: "Отчет подтвержден?",element: (props) => <FilterTrueFalse id="isReportApproved" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "isArchived",label: "Архивные данные",element: (props) => <FilterTrueFalse id="isArchived" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                    {id: "isPracticeApproved",label: "Практика подтверждена?",element: (props) => <FilterTrueFalse id="isPracticeApproved" initialValue={props.initialValue} onChangeValue={props.onChangeValue} />},
                ]}/>
                {isLoading ? (
                    <Center style={{ height: 300 }}>
                        <Loader size="lg" />
                    </Center>
                ) : (
                    <>
                        <PracticesFormUnder studentCount={data?.pagination?.totalElements ?? 0}/>
                        <PracticesList items={data?.items} pagination={data?.pagination} initialSort={sortArray}/>
                        <Pagination pagination={data?.pagination} />
                    </>
                )}
            </Flex>
        </Container>
    );
};