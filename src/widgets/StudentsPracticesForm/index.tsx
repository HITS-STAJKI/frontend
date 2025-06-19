import { Button, Flex, Card, Grid, Box, Group, Text } from "@mantine/core"
import { FullPracticeCard, FullPracticeCardEmpty } from "entity/FullPracticeCard";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { PagedListDtoPracticeDto } from "services/api/api-client.types";
import { useSearchParams } from "react-router-dom";

export type SortDirectionAllPractices = "asc" | "desc";
export type SortKeyAllPractices =
    | "student.user.fullName"
    | "student.group.number"
    | "company.name"
    | "createdAt"
    | "isPaid"
    | "isArchived"
    | "isApproved";

type PagedListDtoPracticeProps = PagedListDtoPracticeDto & {
    initialSort: [SortKeyAllPractices, SortDirectionAllPractices] | null;
};

export function PracticesList({ items, pagination, initialSort = null }: PagedListDtoPracticeProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState<[SortKeyAllPractices, SortDirectionAllPractices] | null>(initialSort);

    function handleSort(key: SortKeyAllPractices) 
    {
        setSort((currentSort) => {
            let newSort: [SortKeyAllPractices, SortDirectionAllPractices] | null;

            if (currentSort?.[0] === key) 
            {
                if (currentSort[1] === "asc") 
                {
                    newSort = [key, "desc"];
                } 
                else if (currentSort[1] === "desc") 
                {
                    newSort = null;
                } 
                else 
                {
                    newSort = [key, "asc"];
                }
            } 
            else 
            {
                newSort = [key, "asc"];
            }

            const updatedParams = new URLSearchParams(searchParams);
            if (newSort) 
            {
                updatedParams.set("sort", newSort[0]);
                updatedParams.set("sortDirection", newSort[1]);
            } 
            else 
            {
                updatedParams.delete("sort");
                updatedParams.delete("sortDirection");
            }

            setSearchParams(updatedParams);
            return newSort;
        });
    }

    function SortArrow({ columnKey }: { columnKey: SortKeyAllPractices }) 
    {
        if (!sort || sort[0] !== columnKey)
        {
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
                            { key: "student.user.fullName", label: "Студент" },
                            { key: "student.group.number", label: "Поток" },
                            { key: "company.name", label: "Компания" },
                            { key: "isPaid", label: "Оплачиваемая" },
                            { key: "isApproved", label: "Подтверждена" },
                            { key: "isArchived", label: "Архивная" },
                            { key: "createdAt", label: "Дата создания" },
                        ].map(({ key, label }) => (
                            <Grid.Col key={key} span={1.5} style={{ display: "flex", justifyContent: "center", alignItems: "stretch" }}>
                                <Button variant="subtle" size="sm" onClick={() => handleSort(key as SortKeyAllPractices)} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "black", textAlign: "center", padding: "8px", gap: "4px" }}>
                                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.2em", maxWidth: "100%" }}>
                                        {label}
                                    </span>
                                    <span style={{ width: "16px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                        <SortArrow columnKey={key as SortKeyAllPractices} />
                                    </span>
                                </Button>
                            </Grid.Col>
                        ))}
                    </Grid>
                </div>
            </Card>
            {(!items || items.length === 0) ? (
                <FullPracticeCardEmpty />
            ) : (
                (items ?? []).map((practice, localIndex) => {
                const globalIndex = ((pagination?.currentPage ?? 1)) * (pagination?.size ?? 10) + localIndex;
                return (
                    <FullPracticeCard
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
                    />
                );
            }))}
        </Flex>
    );
}

type PracticesFormUnderProps = {
  studentCount: number;
};

export function PracticesFormUnder({ studentCount }: PracticesFormUnderProps) {
    const [deadline, setDeadline] = useState<Date | null>(null);

    const handleSave = () => {
        console.log("Сохраняем дедлайн:", deadline);
    };

    const handleConfirm = () => {
        console.log("Практики подтверждены");
    };

    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено студентов: {studentCount}</Text>
                <Group>
                    <Button color="green" onClick={handleConfirm}>
                        Подтвердить практики
                    </Button>
                    <Text>Дедлайн прикрепления отчета:</Text>
                    <DateInput
                        value={deadline}
                        onChange={setDeadline}
                        placeholder="Выберите дату"
                    />
                    <Button color="blue" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Group>
            </Group>
        </Box>
    );
}