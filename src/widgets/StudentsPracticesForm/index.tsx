import { Button, Flex, Card, Grid, Box, Group, Text, Modal, Select, Loader } from "@mantine/core"
import { FullPracticeCard } from "entity/FullPracticeCard";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { PagedListDtoPracticeDto } from "services/api/api-client.types";
import { useSearchParams } from "react-router-dom";
import { useApproveStudentPractices_1Mutation } from "services/api/api-client/PracticeQuery";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

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
    onRefresh?: () => void;
    size: number;
};

export function PracticesList({ items, pagination, initialSort = null, onRefresh, size }: PagedListDtoPracticeProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sort, setSort] = useState<[SortKeyAllPractices, SortDirectionAllPractices] | null>(initialSort);

    function handleSort(key: SortKeyAllPractices) {
        setSort((currentSort) => {
            let newSort: [SortKeyAllPractices, SortDirectionAllPractices] | null;

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

    function SortArrow({ columnKey }: { columnKey: SortKeyAllPractices }) {
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
                            { key: "isPaid", label: "Оплачиваемая" },
                            { key: "isApproved", label: "Подтверждена" },
                            { key: "isArchived", label: "Архивная" },
                            { key: "createdAt", label: "Дата создания" },
                        ].map(({ key, label }) => (
                            <Grid.Col
                                key={key}
                                span={1.5}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "stretch"
                                }}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => handleSort(key as SortKeyAllPractices)}
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
                                        <SortArrow columnKey={key as SortKeyAllPractices} />
                                    </span>
                                </Button>
                            </Grid.Col>
                        ))}
                        <Grid.Col span={1.5}></Grid.Col>
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
                            onRefresh={onRefresh}
                        />
                    );
                })
            )}
        </Flex>
    );
}

type PracticesFormUnderProps = {
    studentCount: number;
    onSuccess?: () => void;
};

export function PracticesFormUnder({ studentCount, onSuccess }: PracticesFormUnderProps) {
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    const { mutate: approvePractices, isPending, isError: isApproveError, error: approveError } = useApproveStudentPractices_1Mutation(selectedCompanyId ?? "", {
        onSuccess: () => {
            onSuccess?.();
            setModalOpened(false);
            setSelectedCompanyId(null);
        }
    });

    const { data, isLoading, isError: isCompanyError, error: companyError } = useGetPartnersQuery(undefined, undefined, undefined, 0, 1000);

    const options = isLoading || !Array.isArray(data?.items) ? []
        : data.items.map((partner) => ({
            value: partner.id,
            label: partner.name,
        }));


    const handleChange = (val: string | null) => {
        setSelectedCompanyId(val);
    };

    const handleOpenModal = () => {
        setModalOpened(true);
    };

    const handleConfirmInModal = () => {
        if (selectedCompanyId) {
            approvePractices();
        }
    };

    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Group justify="space-between" align="center">
                <Text>Найдено практик: {studentCount}</Text>
                <Group>
                    <Button color="green" onClick={handleOpenModal}>
                        Подтвердить практики
                    </Button>
                </Group>
            </Group>

            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Подтвердить практики" centered >
                <Text mb="sm">Выберите компанию, для которой нужно подтвердить практики:</Text>
                <Select
                    placeholder={isLoading ? "Загрузка..." : "Выберите компанию"}
                    value={selectedCompanyId}
                    onChange={handleChange}
                    data={options}
                    clearable
                    searchable
                    disabled={isLoading}
                />
                {isApproveError && (
                    <Card mt="md" p="md" style={{ backgroundColor: "#ffe6e6", borderRadius: 6, width: "100%" }} >
                        <Text color="red" size="sm" style={{ textAlign: "center" }}>
                            Ошибка: {getErrorMessage(approveError)}
                        </Text>
                    </Card>
                )}
                {isCompanyError && (
                    <Card mt="md" p="md" style={{ backgroundColor: "#ffe6e6", borderRadius: 6, width: "100%" }} >
                        <Text color="red" size="sm" style={{ textAlign: "center" }}>
                            Ошибка: {getErrorMessage(companyError)}
                        </Text>
                    </Card>
                )}
                <Group mt="lg" justify="flex-end">
                    <Button variant="default" onClick={() => setModalOpened(false)}>
                        Отмена
                    </Button>
                    <Button color="green" onClick={handleConfirmInModal} disabled={!selectedCompanyId || isPending}>
                        {isPending ? <Loader size="xs" /> : "Подтвердить"}
                    </Button>
                </Group>
            </Modal>
        </Box>
    );
}