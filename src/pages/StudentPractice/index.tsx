import { Button, Card, Container, Flex, Group, Stack, Title, Text, Center, Loader } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCurrentStudentPracticeQuery } from "services/api/api-client/PracticeQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

export const StudentPractice = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: practice, isLoading, isError, error } = useGetCurrentStudentPracticeQuery(id!);

    if (!id) {
        return <div>Не указан id студента</div>;
    }

    if (isLoading) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Container w="90%" fluid>
                <Card withBorder padding="lg" radius="md" shadow="sm" mt="xl" bg="red.1">
                    <Text ta="center" size="lg" color="red">
                        Ошибка при загрузке данных:
                    </Text>
                    <Text ta="center" size="sm" color="red">
                        {getErrorMessage(error)}
                    </Text>
                </Card>
            </Container>
        );
    }

    if (!practice) {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <div>Практика не найдена</div>;
            </Center>
        );
    }

    return (
        <Container fluid style={{ width: '75%', margin: '0 auto' }}>
            <Flex direction="column" style={{ width: '100%', margin: '0 auto' }} gap="md">
                <Group justify="space-between" mt="md" style={{ width: '100%' }} wrap="nowrap">
                    <Title order={2}>Практика студента</Title>
                    <Button variant="outline" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </Group>
                <Card shadow="sm" padding="md" style={{ width: '100%', display: 'flex' }}>
                    <Stack gap="xs">
                        <Text fw={500}>Студент:</Text>
                        <Text>ФИО: {practice.user?.fullName ?? "—"}</Text>
                        <Text>Почта: {practice.user?.email ?? "—"}</Text>
                        <Text>Поток: {practice.group?.number ?? "—"}</Text>
                    </Stack>
                </Card>
                <Card shadow="sm" padding="md" style={{ width: "100%" }}>
                    <Stack gap="xs">
                        <Text fw={500}>Практика:</Text>
                        <Text>Создана:{" "} {practice.createdAt ? new Date(practice.createdAt).toLocaleDateString() : "—"}</Text>
                        <Text>Оплачиваемая: {practice.isPaid ? "Да" : "Нет"}</Text>
                        <Text>Подтверждена: {practice.isApproved ? "Да" : "Нет"}</Text>
                        <Text>Архивная: {practice.isArchived ? "Да" : "Нет"}</Text>
                    </Stack>
                </Card>
                <Card shadow="sm" padding="md" style={{ width: "100%" }}>
                    <Stack gap="xs">
                        <Text fw={500}>Компания:</Text>
                        <Text>Название: {practice.company?.name ?? "—"}</Text>
                        <Text size="sm">Описание: {practice.company?.description ?? "—"}</Text>
                        <Text>Куратор: {practice.company?.curators?.[0].fullName ? ` ФИО ${practice.company?.curators?.[0].fullName}; Почта ${practice.company.curators[0].email};` : " —"} </Text>
                    </Stack>
                </Card>
            </Flex>
        </Container>
    );
};
export default StudentPractice