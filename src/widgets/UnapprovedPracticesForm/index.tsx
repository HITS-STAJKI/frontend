import { Button, Flex, Card, Grid, Box, Group, Text } from "@mantine/core"
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { PagedListDtoPracticeDto } from "services/api/api-client.types";
import { useSearchParams } from "react-router-dom";
import { UnapprovedPracticeCard } from "entity/UnapprovedPracticeCard";

export type SortDirectionUnapprovedPractices = "asc" | "desc";
export type SortKeyUnapprovedPractices =
    | "student.user.fullName"
    | "student.group.number"
    | "company.name"
    | "stack.name"
    | "createdAt";

type PagedListDtoPracticeDtoProps = PagedListDtoPracticeDto & {
    initialSort: [SortKeyUnapprovedPractices, SortDirectionUnapprovedPractices] | null;
    size: number;
};

export function UnapprovedPracticesForm({ items, pagination, initialSort = null, size }: PagedListDtoPracticeDtoProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState<[SortKeyUnapprovedPractices, SortDirectionUnapprovedPractices] | null>(initialSort);

    function handleSort(key: SortKeyUnapprovedPractices) {
        setSort((currentSort) => {
            let newSort: [SortKeyUnapprovedPractices, SortDirectionUnapprovedPractices] | null;

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

    function SortArrow({ columnKey }: { columnKey: SortKeyUnapprovedPractices }) {
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
                            { key: "student.user.fullName", label: "Студент" },
                            { key: "student.group.number", label: "Поток" },
                            { key: "company.name", label: "Компания" },
                            { key: "stack.name", label: "Направление" },
                            { key: "createdAt", label: "Дата создания" }
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
                                    onClick={() => handleSort(key as SortKeyUnapprovedPractices)}
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
                                            whiteSpace: "normal",
                                            lineHeight: "1.2em",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <span style={{ width: "16px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                                        <SortArrow columnKey={key as SortKeyUnapprovedPractices} />
                                    </span>
                                </Button>
                            </Grid.Col>
                        ))}
                        <Grid.Col span={2}></Grid.Col>
                    </Grid>
                </div>
            </Card>
            {(!items || items.length === 0) ? (
                <Card withBorder padding="lg" radius="md" shadow="sm" style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'center' }} color="dimmed" size="lg">
                        Практик нет
                    </Text>
                </Card>
            ) : (
                (items ?? []).map((practice, localIndex) => {
                    const globalIndex = ((pagination?.currentPage ?? 0)) * (size) + localIndex;
                    return (
                        <UnapprovedPracticeCard
                            key={practice.id}
                            id={practice.id}
                            user={practice.user}
                            group={practice.group}
                            company={practice.company}
                            createdAt={practice.createdAt}
                            stack={practice.stack}
                            isPaid={practice.isPaid}
                            isArchived={practice.isArchived}
                            isApproved={practice.isApproved}
                            index={globalIndex + 1}
                        />
                    );
                })
            )}
        </Flex>
    );
}

type PracticesProps = {
    studentCount: number;
};

export function UnapprovedPracticesFormUnder({ studentCount }: PracticesProps) {
    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено заявок: {studentCount}</Text>
                <Group />
            </Group>
        </Box>
    );
}