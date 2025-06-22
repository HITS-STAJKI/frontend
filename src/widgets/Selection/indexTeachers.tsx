import { Box, Button, Card, Flex, Grid, Group, MultiSelect, Select, Text, } from "@mantine/core";
import { GET_COMPANIES, GET_GROUPS, GET_LANGUAGES, GET_STACKS, Interview, InterviewForTeachers, InterviewPage, InterviewStatus, Language, PagedListDtoInterviewDto, Stack } from "shared/lib";
import './css.css';
import { useEffect, useState } from "react";
import { FilterBlockFull, FilterBlockShort, FilterName } from "entity";
import { DateInput } from "@mantine/dates";
import { GroupWithName, STATUS1, STATUS3, STATUS2, StatusWithID, convertGroupsToGroupsWithName } from "./newTypes";
import { FullPracticeCard } from "entity/FullPracticeCard";
import { useNavigate } from "react-router-dom";
import { CommentSelection, SuccedSelection, SuccedTeacherSelection } from "./ModuleWindows";
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery";


// --------------- Teacher ---------------

export function SelectionTeacherFilters() {
    return (
        <FilterBlockFull availableFilters={[
            { id: "name", label: "ФИО", element: (props) => <FilterName id="name" onChangeValue={props.onChangeValue} /> },
            { id: "company", label: "Компания", element: (props) => <FilterSelect items={GET_COMPANIES.items} id="company" onChangeValue={props.onChangeValue} label="Выберите компанию" /> },
            { id: "stackId", label: "Направление", element: (props) => <FilterSelect items={GET_STACKS.items} id="reportavailibility" onChangeValue={props.onChangeValue} label="Выберите направление" /> },
            { id: "languageIds", label: "Языки программирования", element: (props) => <FilterMultiSelect items={GET_LANGUAGES.items} id="languageIds" onChangeValue={props.onChangeValue} /> },
            { id: "group", label: "Группа", element: (props) => <FilterSelect items={convertGroupsToGroupsWithName(GET_GROUPS.items)} id="group" onChangeValue={props.onChangeValue} label="Выберите группу" /> },
            { id: "status", label: "Статус", element: (props) => <FilterSelect items={[STATUS1, STATUS2, STATUS3]} id="group" onChangeValue={props.onChangeValue} label="Выберите статус" /> },
            { id: "dateFrom", label: "Дата от", element: (props) => <FilterDate id="dateFrom" onChangeValue={props.onChangeValue} /> },
            { id: "dateTo", label: "Дата до", element: (props) => <FilterDate id="dateTo" onChangeValue={props.onChangeValue} /> },
        ]}
            printButton={true}
        />
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
    const [deadline, setDeadline] = useState<Date | null>(null);

    const chooseData = () => {
        console.log("Дедлайн выбора компании установлен:", deadline);
    };

    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено студентов: {studentCount}</Text>
                <Group>
                    <Text>Дедлайн выбора компании:</Text>
                    <DateInput value={deadline} onChange={setDeadline} placeholder="Выберите дату"
                    />
                    <Button color="blue" onClick={chooseData}>
                        Сохранить
                    </Button>
                </Group>
            </Group>
        </Box>
    );
}

type SortDirection = "Asc" | "Desc";
type SortKey =
    | "userName"
    | "groupNumber"
    | "companyName"
    | "createdAt"
    | "isPaid"
    | "isArchived"
    | "isApproved";

export function SelectionTeacherList({ items, pagination }: PagedListDtoInterviewDto) {
    const [sort, setSort] = useState<[SortKey, SortDirection] | null>(null);

    //TODO: Функция сортировки
    function handleSort(key: SortKey) {
        setSort((currentSort) => {
            if (currentSort?.[0] === key) {
                if (currentSort[1] === "Asc") {
                    return [key, "Desc"];
                }
                else if (currentSort[1] === "Desc") {
                    return null;
                }
            }
            return [key, "Asc"];
        });
    }

    function SortArrow({ columnKey }: { columnKey: SortKey }) {
        if (!sort || sort[0] !== columnKey) {
            return null;
        }
        return sort[1] === "Asc" ?
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
                            { key: "userName", label: "ФИО", span: 2.9 },
                            { key: "groupNumber", label: "Поток", span: 1.5 },
                            { key: "companyName", label: "Компания", span: 1.5 },
                            { key: "isPaid", label: "Направление", span: 1.5 },
                            { key: "isApproved", label: "Технологии", span: 1.5 },
                            { key: "isArchived", label: "Статус", span: 1.6 },
                            { key: "createdAt", label: "Дата создания", span: 1.5 },
                        ].map(({ key, label, span }) => (
                            <Grid.Col key={key} span={span} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKey)}
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
                                    <SortArrow columnKey={key as SortKey} />
                                </Button>
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Box style={{ width: "40px", textAlign: "center" }} />
                </div>
            </Card>
            {items.map((interview, localIndex) => {
                const globalIndex = (pagination.currentPage!) * pagination.size! + localIndex;
                return (
                    <SelectionTeacherCard
                        key={interview.id}
                        id={interview.id}
                        stack={interview.stack}
                        createdAt={interview.createdAt.toDateString()}
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
    group: string
}


export function SelectionTeacherCard({ id, student, companyPartner, createdAt, languages, stack, status, index }: FullInterviewCardProps) {
    const navigate = useNavigate();
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
                            {languages[0].name}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1.6} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            <span className={status} style={{ whiteSpace: 'nowrap', transform: 'scale(0.8)' }}>{getStatusText(status)}</span>
                        </Text>
                        {status === "SUCCEED" && (<SuccedTeacherSelection id={id} />
                        )}
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
                    <CommentSelection id={id} />
                </Box>
            </div>
        </Card>
    );
}