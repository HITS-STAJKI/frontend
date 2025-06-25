import { Box, Button, Card, Flex, Grid, Group, MultiSelect, Select, Text, } from "@mantine/core";
import { InterviewForTeachers, InterviewStatus, Language, Stack } from "shared/lib";
import './css.css';
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import { GroupWithName, StatusWithID } from "./newTypes";
import { CommentSelection } from "./ModuleWindows";
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import { PagedListDtoPracticeDto } from "services/api/api-client.types";


// --------------- Teacher ---------------

export function SelectionTeacherFilters() {
    return (
        <></>
    );
}

interface FilterMultySelectProps {
    id: string;
    items: Language[];
    onChangeValue: (val: string[]) => void;
}

interface FilterSelectProps {
    id: string;
    items: Stack[] | GroupWithName[] | StatusWithID[];
    onChangeValue: (val: string | null) => void;
    label: string;
}

export function FilterMultiSelect({ id, items, onChangeValue }: FilterMultySelectProps) {
    const [value, setValue] = useState<string[]>([]);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const selectData = items.map(item => ({
                value: item.id,
                label: item.name,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <>
            <MultiSelect
                id={`filter-${id}`}
                placeholder=""
                value={value}
                onChange={handleChange}
                data={data}
                clearable
            />
        </>
    );
}

export function FilterSelect({ id, items, onChangeValue, label }: FilterSelectProps) {
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const selectData = items.map(item => ({
                value: item.id,
                label: item.name,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder={label}
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

interface DateProps {
    id: string;
    onChangeValue: (val: Date | null) => void;
}
export function FilterDate({ id, onChangeValue }: DateProps) {
    const [value, setValue] = useState<Date | null>(null);
    const handleChange = (date: Date | null) => {
        setValue(date);
        onChangeValue(date);
    };
    return (
        <DateInput
            id={`filter-${id}`}
            placeholder="Выберите дату"
            value={value}
            onChange={handleChange}
            clearable
        />
    );
}

type PracticesFormUnderProps = {
    studentCount: number;
};

export function SelectionFinder({ studentCount }: PracticesFormUnderProps) {
    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено студентов: {studentCount}</Text>
            </Group>
        </Box>
    );
}

export type SortDirectionST = "asc" | "desc";
export type SortKeyST =
    | "student.user.fullName"
    | "student.group.number"
    | "company.name"
    | "createdAt"
    | "stack.name"
    | "languages.name"
    | 'status'
type PagedListDtoPracticeSTProps = PagedListDtoPracticeDto & {
    initialSort: [SortKeyST, SortDirectionST] | null;
    onRefresh?: () => void;
};

export function SelectionTeacherList({ items, pagination }: PagedListDtoPracticeSTProps) {
    const [sort, setSort] = useState<[SortKeyST, SortDirectionST] | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSort(key: SortKeyST) {
        setSort((currentSort) => {
            let newSort: [SortKeyST, SortDirectionST] | null;

            if (currentSort?.[0] === key) {
                if (currentSort[1] === "asc") {
                    newSort = [key, "desc"];
                }
                else if (currentSort[1] === "desc") {
                    newSort = null;
                }
                else {
                    newSort = [key, "asc"];
                }
            }
            else {
                newSort = [key, "asc"];
            }

            const updatedParams = new URLSearchParams(searchParams);
            if (newSort) {
                updatedParams.set("sort", newSort[0]);
                updatedParams.set("sortDirection", newSort[1]);
            }
            else {
                updatedParams.delete("sort");
                updatedParams.delete("sortDirection");
            }

            setSearchParams(updatedParams);
            return newSort;
        });
    }

    function SortArrow({ columnKey }: { columnKey: SortKeyST }) {
        if (!sort || sort[0] !== columnKey) {
            return null;
        }
        return sort[1] === "asc" ?
            (
                <IconChevronUp size={14} style={{ marginLeft: 4 }} />
            ) : (
                <IconChevronDown size={14} style={{ marginLeft: 4 }} />
            );
    }

    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: "100%" }}>
            <Card shadow="sm" style={{ width: "100%", height: "64px", display: "flex" }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Box style={{ width: "40px", textAlign: "center" }} />
                    <Grid style={{ width: "100%" }}>
                        {[
                            { key: "student.user.fullName", label: "ФИО", span: 2.9 },
                            { key: "student.group.number", label: "Поток", span: 1.5 },
                            { key: "company.name", label: "Компания", span: 1.5 },
                            { key: 'stack.name', label: "Направление", span: 1.5 },
                            { key: "languages.name", label: "Язык программирования", span: 1.5 },
                            { key: "status", label: "Статус", span: 1.6 },
                            { key: "createdAt", label: "Дата создания", span: 1.5 },
                        ].map(({ key, label, span }) => (
                            <Grid.Col key={key} span={span} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKeyST)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: "black",
                                        width: "100%",
                                        justifyContent: "center",
                                    }}
                                >
                                    {label}
                                    <SortArrow columnKey={key as SortKeyST} />
                                </Button>
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Box style={{ width: "40px", textAlign: "center" }} />
                </div>
            </Card>
            {items?.map((interview, localIndex) => {
                const globalIndex = (pagination?.currentPage!) * pagination?.size! + localIndex;
                return (
                    <SelectionTeacherCard
                        key={interview.id}
                        id={interview.id!}
                        stack={interview.stack!}
                        createdAt={interview?.createdAt?.toDateString()!}
                        languages={interview.languages}
                        status={interview.status}
                        companyPartner={interview.companyPartner}
                        student={interview.student}
                        index={globalIndex + 1}
                    />
                );
            })}
        </Flex>
    );
}

interface FullInterviewCardProps extends InterviewForTeachers {
    index: number;
}


export function SelectionTeacherCard({ id, student, companyPartner, createdAt, languages, stack, status, index }: FullInterviewCardProps) {
    const { data } = useGetUserByIdQuery(student.id!)
    const handleClick = () => {
        console.log("Открыли модалку");
    };

    const getStatusText = (status: InterviewStatus): string => {
        switch (status) {
            case "PENDING":
                return "В процессе";
            case "REJECTED":
                return "Отклонено";
            case "SUCCEED":
                return "Пройдено";
            default:
                return "";
        }
    };
    console.log(data)
    return (
        <Card key={id}
            shadow="sm"
            style={{
                width: '100%',
                height: '64px',
                display: 'flex',
                transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
            }}
            onClick={handleClick}
            tabIndex={0}
        >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <Text>{index}</Text>
                </Box>
                <Grid style={{ width: '100%', height: '100%' }}>
                    <Grid.Col span={2.9} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {student.fullName}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {data?.student?.group.number}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {companyPartner.name}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {stack.name}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {languages[0]?.name}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.6} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <span className={status} style={{ whiteSpace: 'nowrap', transform: 'scale(0.8)' }}>{getStatusText(status)}</span>
                        </Text>
                        {/* {status === "SUCCEED" && (<SuccedTeacherSelection id={student.roles?.find(role => role.userRole === RoleDtoUserRole.STUDENT)?.id!} />
                        )} */}
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {new Date(createdAt).toLocaleDateString("ru-RU")}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.5} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                        >
                        </div>
                    </Grid.Col>
                </Grid>
                <Box style={{ width: '40px', textAlign: 'center' }}>
                    <CommentSelection id={data?.student?.chatId!} />
                </Box>
            </div>
        </Card>
    );
}