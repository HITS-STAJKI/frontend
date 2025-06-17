import { Button, Flex, Card, Grid, Box, Group, Text, Stack, Textarea } from "@mantine/core"
import { PracticeRequestPage } from "shared/lib";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { StudentListCard } from "entity/StudentListCard";

type PracticesFormOverProps = {
    studentName: string,
    group: string
};

export function PracticesFormOver({ studentName, group }: PracticesFormOverProps) {
    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text size="lg">Студент: {studentName}</Text>
                <Text size="lg">{group}</Text>
            </Group>
        </Box>
    );
}

type SortDirection = "Asc" | "Desc";
type SortKey =
    | "fullName"
    | "group"
    | "company"
    | "status";

export function StudentsListForm({ items, pagination }: PracticeRequestPage) {
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
                    <Box style={{ width: "40px", textAlign: "center" }} />
                    <Grid style={{ width: "100%" }}>
                        {[
                            { key: "fullName", label: "Имя студента" },
                            { key: "group", label: "Группа" },
                            { key: "company", label: "Компания" },
                            { key: "status", label: "Статус" }
                        ].map(({ key, label }) => (
                            <Grid.Col key={key} span={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKey)}
                                    style=
                                    {{
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
                </div>
            </Card>
            {items.map((practice, localIndex) => {
                const globalIndex = (pagination.currentPage! - 1) * pagination.size! + localIndex;
                return (
                    <StudentListCard
                        key={practice.id}
                        id={practice.id}
                        user={practice.user}
                        group={practice.group}
                        company={practice.company}
                        createdAt={practice.createdAt}
                        isPaid={practice.isPaid}
                        isArchived={practice.isArchived}
                        isApproved={practice.isApproved}
                        index={globalIndex + 1}
                        status={"PENDING"}
                    />
                );
            })}
        </Flex>
    );
}

type PracticesFormUnderProps = {
    studentCount: number;
};

export function StudentsFormUnder({ studentCount }: PracticesFormUnderProps) {
    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено студентов: {studentCount}</Text>
            </Group>
        </Box>
    );
}

export function StudentsCommentaryForm() {
    const [value, setValue] = useState('');

    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            <Card style={{ width: '100%', padding: '1rem', border: "1px solid #ccc", borderRadius: 8 }}>
                <Stack gap="sm" style={{ width: '100%' }}>
                    <Textarea placeholder="Введите комментарий..." autosize minRows={3} value={value} onChange={(event) => setValue(event.currentTarget.value)} style={{ width: '100%' }} />
                    <Group justify="flex-end">
                        <Button variant="light" color="gray" onClick={() => setValue('')}>Отмена</Button>
                        <Button color="blue">Отправить</Button>
                    </Group>
                    <Group justify="flex-end" mt="sm">
                        <Button color="green" variant="filled" style={{ textAlign: 'center', flexDirection: 'column', whiteSpace: 'pre-line', padding: '0.75rem' }}>
                            Экспортировать пользователей
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Flex>
    );
}