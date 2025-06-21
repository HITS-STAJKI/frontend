import { Button, Flex, Card, Grid, Box, Group, Text } from "@mantine/core"
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ShortPracticeCard } from "entity/ShortPracticeCard";
import { PagedListDtoPracticeDto } from "services/api/api-client.types";
import { useSearchParams } from "react-router-dom";

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

export type SortDirectionStudentPractices = "asc" | "desc";
export type SortKeyStudentPractices =
    | "company.name"
    | "createdAt"
    | "isPaid"
    | "isArchived"
    | "isApproved";

type PagedListDtoPracticeProps = PagedListDtoPracticeDto & {
    initialSort: [SortKeyStudentPractices, SortDirectionStudentPractices] | null;
};

export function PracticesList({ items, pagination, initialSort = null }: PagedListDtoPracticeProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState<[SortKeyStudentPractices, SortDirectionStudentPractices] | null>(initialSort);

    function handleSort(key: SortKeyStudentPractices) 
    {
        setSort((currentSort) => {
            let newSort: [SortKeyStudentPractices, SortDirectionStudentPractices] | null;

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

            queueMicrotask(() => {
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
            });

            return newSort;
        });
    }

    function SortArrow({ columnKey }: { columnKey: SortKeyStudentPractices }) 
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
                            { key: "company.name", label: "Компания" },
                            { key: "isPaid", label: "Оплачиваемая" },
                            { key: "isApproved", label: "Подтверждена" },
                            { key: "isArchived", label: "Архивная" },
                            { key: "createdAt", label: "Дата создания" },
                        ].map(({ key, label }) => (
                            <Grid.Col
                                key={key}
                                span={2}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "stretch"
                            }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKeyStudentPractices)}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                        color: "black",
                                        textAlign: "center",
                                        padding: "8px",
                                        gap: "4px",
                                }}>
                                    <span
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            lineHeight: "1.2em",
                                            maxHeight: "2.4em",
                                            width: "100%"
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <span style={{ width: "16px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                        <SortArrow columnKey={key as SortKeyStudentPractices} />
                                    </span>
                                </Button>
                            </Grid.Col>
                        ))}
                        <Grid.Col span={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text size="sm" style={{fontWeight: 500, color: "black", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                Отчёт
                            </Text>
                        </Grid.Col>
                    </Grid>
                </div>
            </Card>
            {(items ?? []).map((practice, localIndex) => {
                const globalIndex = ((pagination?.currentPage ?? 0)) * (pagination?.size ?? 10) + localIndex;
                return (
                    <ShortPracticeCard
                        key={practice.id}
                        id={practice.id}
                        user={practice.user}
                        group={practice.group}
                        company={practice.company}
                        stack={practice.stack}
                        createdAt={practice.createdAt}
                        isPaid={practice.isPaid}
                        isArchived={practice.isArchived}
                        isApproved={practice.isApproved}
                        index={globalIndex + 1}
                    />
                );
            })}
        </Flex>
    );
}

type PracticesFormUnderProps = {
    studentCount: number;
};

export function PracticesFormUnder({ studentCount }: PracticesFormUnderProps) {
    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено практик: {studentCount}</Text>
            </Group>
        </Box>
    );
}