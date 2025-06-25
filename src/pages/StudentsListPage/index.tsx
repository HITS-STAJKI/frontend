import { Card, Center, Flex, Loader, Text } from "@mantine/core";
import { FilterBlockShort, FilterCompanyMultiple, FilterDateTime, FilterGroupMultiple, FilterName, FilterStackMultiple, FilterTrueFalse, } from "entity";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllStudentsQuery } from "services/api/api-client/StudentQuery";
import { Pagination } from "shared/ui";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";
import { SortDirectionStudents, SortKeyStudents, StudentsCommentaryForm, StudentsFormUnder, StudentsListForm } from "widgets/StudentsListForm";

export const StudentsListPage = () => {

    const [searchParams] = useSearchParams();

    const fullName = searchParams.get("fullName") ?? undefined;
    const isAcademRaw = searchParams.get("isAcadem");
    const isAcadem = isAcademRaw === "true" ? true : isAcademRaw === "false" ? false : undefined;
    const isGraduatedRaw = searchParams.get("isGraduated");
    const isGraduated = isGraduatedRaw === "true" ? true : isGraduatedRaw === "false" ? false : undefined;
    const groupIds = searchParams.getAll("groupIds") ?? undefined;
    const companyIds = searchParams.getAll("companyIds") ?? undefined;
    const isOnPracticeRaw = searchParams.get("isOnPractice");
    const isOnPractice = isOnPracticeRaw === "true" ? true : isOnPracticeRaw === "false" ? false : undefined;
    const hasInterviewsRaw = searchParams.get("hasInterviews");
    const hasInterviews = hasInterviewsRaw === "true" ? true : hasInterviewsRaw === "false" ? false : undefined;
    const hasPracticeRequestRaw = searchParams.get("hasPracticeRequest");
    const hasPracticeRequest = hasPracticeRequestRaw === "true" ? true : hasPracticeRequestRaw === "false" ? false : undefined;
    const stackIds = searchParams.getAll("stackIds") ?? undefined;
    const lastLoginParam = searchParams.get("lastLogin");
    const lastLogin = lastLoginParam ? new Date(lastLoginParam) : undefined;
    const size = Number(searchParams.get("size") ?? "10");
    const page = Number(searchParams.get("page") ?? "0");

    const sortParam = searchParams.get("sort") as SortKeyStudents | null;
    const sortDirectionParam = searchParams.get("sortDirection") as SortDirectionStudents | null;

    const sortArray: [SortKeyStudents, SortDirectionStudents] | null =
        sortParam && sortDirectionParam ? [sortParam, sortDirectionParam] : null;

    const sort: string[] | undefined = sortArray
        ? [sortArray[1], sortArray[0]]
        : undefined;

    const { data, isLoading, isError, error, refetch } = useGetAllStudentsQuery(page, size, sort, fullName, isAcadem, isGraduated, groupIds, companyIds, isOnPractice, hasPracticeRequest, hasInterviews, stackIds, lastLogin);

    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    return (
        <div style={{ width: '100%' }}>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <FilterBlockShort availableFilters={[
                    { id: "fullName", label: "ФИО", element: (props) => <FilterName id="fullName" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isAcadem", label: "Студент в академе?", element: (props) => <FilterTrueFalse id="isAcadem" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isGraduated", label: "Студент выпустился?", element: (props) => <FilterTrueFalse id="isGraduated" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "groupIds", label: "Поток", element: (props) => <FilterGroupMultiple id="groupIds" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "companyIds", label: "Компания", element: (props) => <FilterCompanyMultiple id="companyIds" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "isOnPractice", label: "Студент на практике?", element: (props) => <FilterTrueFalse id="isOnPractice" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "hasInterviews", label: "Студент приступил к собеседованиям?", element: (props) => <FilterTrueFalse id="hasInterviews" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "hasPracticeRequest", label: "У студента есть неподтвержденные практики?", element: (props) => <FilterTrueFalse id="hasPracticeRequest" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "stackIds", label: "Направление", element: (props) => <FilterStackMultiple id="stackIds" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
                    { id: "lastLogin", label: "Время последнего захода в систему", element: (props) => <FilterDateTime id="lastLogin" initialValue={props.initialValue} onChangeValue={props.onChangeValue} /> },
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
                        <StudentsFormUnder studentCount={data?.pagination?.totalElements ?? 0} />
                        <StudentsListForm items={data?.items} pagination={data?.pagination} initialSort={sortArray} selectedStudentIds={selectedStudentIds} setSelectedStudentIds={setSelectedStudentIds} size={size}/>
                        <StudentsCommentaryForm selectedStudentIds={selectedStudentIds} refetchStudents={refetch}/>
                        <Pagination pagination={data?.pagination} />
                    </>
                )}
            </Flex>
        </div>
    );
};
export default StudentsListPage