import { Button, Card, Container, Flex, Group, Stack, Title, Text } from "@mantine/core";
import { useState } from "react";
import { Practice, PRACTICE1 } from "shared/lib";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const StudentPractice = () => {
    const [practice, setPractice] = useState<Practice>(PRACTICE1);
    const navigate = useNavigate();

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
                        <Text>ФИО: {practice.user.fullname}</Text>
                        <Text>Почта: {practice.user.email}</Text>
                        <Text>Группа: {practice.group.number}</Text>
                    </Stack>
                </Card>
                <Card shadow="sm" padding="md" style={{ width: "100%"}}>
                    <Stack gap="xs">
                        <Text fw={500}>Практика:</Text>
                        <Text>Создана: {new Date(practice.createdAt).toLocaleDateString()}</Text>
                        <Text>Оплачиваемая: {practice.isPaid ? "Да" : "Нет"}</Text>
                        <Text>Подтверждена: {practice.isApproved ? "Да" : "Нет"}</Text>
                        <Text>Архивная: {practice.isArchived ? "Да" : "Нет"}</Text>
                    </Stack>
                </Card>
                <Card shadow="sm" padding="md" style={{ width: "100%"}}>
                    <Stack gap="xs">
                        <Text fw={500}>Компания:</Text>
                        <Text>Название: {practice.company.name}</Text>
                        <Text size="sm">Описание: {practice.company.description}</Text>
                        <Text>Куратор:&nbsp;&nbsp;&nbsp;&nbsp;ФИО {practice.company.curator.user.fullname};&nbsp;&nbsp;&nbsp;&nbsp;Почта {practice.company.curator.user.email};</Text>
                    </Stack>
                </Card>
            </Flex>
        </Container>
    );
};