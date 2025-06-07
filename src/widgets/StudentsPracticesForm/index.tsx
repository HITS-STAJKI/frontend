import { Button, Flex, Card, Grid, Box, Group, Text } from "@mantine/core"
import { PracticeRequestPage } from "shared/lib";
import { FullPracticeCard } from "entity/FullPracticeCard";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";

type SortDirection = "Asc" | "Desc";
type SortKey =
    | "userName"
    | "groupNumber"
    | "companyName"
    | "createdAt"
    | "isPaid"
    | "isArchived"
    | "isApproved";

export function PracticesList({ content, pagination }: PracticeRequestPage) {
    const [sort, setSort] = useState<[SortKey, SortDirection] | null>(null);

    //TODO: Функция сортировки
    function handleSort(key: SortKey) 
    {
        setSort((currentSort) => 
        {
            if (currentSort?.[0] === key) 
            {
                if (currentSort[1] === "Asc") 
                {
                    return [key, "Desc"];
                } 
                else if (currentSort[1] === "Desc") 
                {
                    return null;
                }
            }
            return [key, "Asc"];
        });
    }

    function SortArrow({ columnKey }: { columnKey: SortKey }) 
    {
        if (!sort || sort[0] !== columnKey)
        {
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
                            { key: "userName", label: "Студент" },
                            { key: "groupNumber", label: "Поток" },
                            { key: "companyName", label: "Компания" },
                            { key: "isPaid", label: "Оплачиваемая" },
                            { key: "isApproved", label: "Подтверждена" },
                            { key: "isArchived", label: "Архивная" },
                            { key: "createdAt", label: "Дата создания" },
                        ].map(({ key, label }) => (
                            <Grid.Col key={key} span={1.5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            {content.map((practice, localIndex) => {
                const globalIndex = (pagination.currentPage - 1) * pagination.size + localIndex;
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
            })}
        </Flex>
    );
}

type PracticesFormUnderProps = {
  studentCount: number;
};

export function PracticesFormUnder({ studentCount }: PracticesFormUnderProps) {
    const [deadline, setDeadline] = useState<Date | null>(null);

    const handleSave = () => {
        // TODO: обработка сохранения дедлайна
        console.log("Сохраняем дедлайн:", deadline);
    };

    const handleConfirm = () => {
        // TODO: логика подтверждения практик
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