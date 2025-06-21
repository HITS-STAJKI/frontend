import { Button, Flex, Card, Grid, Box, Group, Text, Stack, Textarea } from "@mantine/core"
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { StudentListCard } from "entity/StudentListCard";
import { PagedListDtoStudentDto } from "services/api/api-client.types";
import { useSearchParams } from "react-router-dom";
import { useSendMessagesMutation } from "services/api/api-client/ChatControllerQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

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

export type SortDirectionStudents = "asc" | "desc";
export type SortKeyStudents =
    | "user.fullName"
    | "group.number"
    | "user.lastLoginDate";

type StudentsListFormProps = PagedListDtoStudentDto & {
    initialSort: [SortKeyStudents, SortDirectionStudents] | null;
    selectedStudentIds: string[];
    setSelectedStudentIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export function StudentsListForm({ items, pagination, initialSort, selectedStudentIds, setSelectedStudentIds }: StudentsListFormProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState<[SortKeyStudents, SortDirectionStudents] | null>(initialSort);

    function handleSort(key: SortKeyStudents) 
    {
        setSort((currentSort) => {
            let newSort: [SortKeyStudents, SortDirectionStudents] | null;

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

    function SortArrow({ columnKey }: { columnKey: SortKeyStudents }) 
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
                    <Box style={{ width: "40px", textAlign: "center" }} />
                    <Grid style={{ width: "100%" }}>
                        {[
                            { key: "user.fullName", label: "Имя студента" },
                            { key: "group.number", label: "Группа" },
                            { key: "user.lastLoginDate", label: "Время последнего входа" }
                        ].map(({ key, label }) => (
                            <Grid.Col
                                key={key}
                                span={2.5}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "stretch"
                            }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKeyStudents)}
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
                                        <SortArrow columnKey={key as SortKeyStudents} />
                                    </span>
                                </Button>
                            </Grid.Col>
                        ))}
                        <Grid.Col span={2.5} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text
                                size="sm"
                                style={{
                                    fontWeight: 500,
                                    color: "black",
                                    whiteSpace: "normal",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                }}
                            >
                                Количество непрочитанных сообщений
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={2}></Grid.Col>
                    </Grid>
                </div>
            </Card>
            {(items && items.length > 0) ? (
                items.map((student, localIndex) => {
                    const globalIndex = ((pagination?.currentPage ?? 1)) * (pagination?.size ?? 10) + localIndex;
                    return (
                        <StudentListCard
                            key={student.id}
                            index={globalIndex + 1}
                            studentId={student.id}
                            userId={student.user.id}
                            fullName={student.user.fullName}
                            groupNumber={student.group.number}
                            lastLoginDate={student.user.lastLoginDate}
                            unreadMessagesCount={student.unreadMessagesCount}
                            chatId={student.chatId}
                            isSelected={selectedStudentIds.includes(student.id)}
                            onToggleSelect={() => {
                                setSelectedStudentIds((prev) =>
                                    prev.includes(student.id)
                                        ? prev.filter((id) => id !== student.id)
                                        : [...prev, student.id]
                                );
                            }}
                        />
                    );
                })
            ) : (
                <Card withBorder padding="lg" radius="md" shadow="sm" style={{width: '100%'}}>
                    <Text style={{ textAlign: 'center' }} color="dimmed" size="lg">
                        Студентов нет
                    </Text>
                </Card>
            )}
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
                <Text>Найдено практик: {studentCount}</Text>
            </Group>
        </Box>
    );
}

interface StudentsCommentaryFormProps {
    selectedStudentIds: string[];
}

export function StudentsCommentaryForm({ selectedStudentIds }: StudentsCommentaryFormProps) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isSubmitDisabled = value.trim() === '' || selectedStudentIds.length === 0;

    const { mutate, status } = useSendMessagesMutation({
        onSuccess: () => {
            setValue('');
            setErrorMessage(null);
        },
        onError: (error) => {
            console.error("Ошибка при отправке сообщения:", error);
            setErrorMessage(getErrorMessage(error));
        }
    });

    const isLoading = status === 'pending';

    const handleSubmit = () => {
        if (isSubmitDisabled) 
        {
            return;
        }
        setErrorMessage(null);
        mutate({
            content: value.trim(),
            studentIds: selectedStudentIds,
        });
    };

    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            <Card style={{ width: '100%', padding: '1rem', border: "1px solid #ccc", borderRadius: 8 }}>
                <Stack gap="sm" style={{ width: '100%' }}>
                    <Textarea
                        placeholder="Введите комментарий..."
                        autosize
                        minRows={3}
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        style={{ width: '100%' }}
                    />
                    <Group justify="flex-end">
                        <Button variant="light" color="gray" onClick={() => setValue('')} disabled={isLoading}>
                            Отмена
                        </Button>
                        <Button color="blue" onClick={handleSubmit} disabled={isSubmitDisabled || isLoading} loading={isLoading}>
                            Отправить
                        </Button>
                    </Group>

                    {errorMessage && (
                        <Text color="red" size="sm" style={{ marginTop: 8, textAlign: 'center' }}>
                            {errorMessage}
                        </Text>
                    )}

                    <Group justify="flex-end" mt="sm">
                        <Button
                            color="green"
                            variant="filled"
                            style={{ textAlign: 'center', flexDirection: 'column', whiteSpace: 'pre-line', padding: '0.75rem' }}
                        >
                            Экспортировать пользователей
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Flex>
    );
}
