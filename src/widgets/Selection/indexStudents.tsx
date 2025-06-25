import { Button, Card, Container, Flex, Group, MultiSelect, Text, TextInput, Title } from "@mantine/core";
import { GET_STACKS, Interview, InterviewStatus } from "shared/lib";
import './css.css';
import { CommentSelection, CreateSelection, DeleteSelection, EditSelection, SuccedSelection } from "./ModuleWindows";
import { useForm } from "@mantine/form";
import { InterviewDto } from "services/api/api-client.types";

// --------------- Student ---------------

export function TitleForm({ onRefresh }: { onRefresh?: () => void }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Title size="h1">Мои отборы</Title>
            <CreateSelection id={'ГЕНЕРАТОР НОВОГО ID'} onRefresh={onRefresh} />
        </div>
    );
}

// type SelectionSearchFormProps = {
//     onSuccess: () => void;
// }


export function SelectionStudentList({ data, chatId, onSuccess }: { data: InterviewDto[], chatId: string, onSuccess: () => void }) {
    const hasNoData = !data || data.length === 0;
    return (
        <Container p={0} fluid style={{ width: '100%' }}>
            {hasNoData ? (
                <Card withBorder padding="lg" radius="md" shadow="sm" style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'center' }} color="dimmed" size="lg">
                        Отборов нет
                    </Text>
                </Card>
            ) : (
                data.map(card => (
                    <SelectionCard key={card.id} selection={card} chatId={chatId} onSuccess={onSuccess} />
                ))
            )}
        </Container>
    );
}


export function SelectionCard({ selection, chatId, onSuccess }: { selection: Interview, chatId: string, onSuccess: () => void }) {
    return (
        <div style={{ border: '1px solid black', marginBottom: '2vh', borderRadius: '2px' }}>
            <SelectionHeaderCard selection={selection} chatId={chatId} onSuccess={onSuccess} />
        </div>
    );
}

export function SelectionHeaderCard({ selection, chatId, onSuccess }: { selection: Interview, chatId: string, onSuccess: () => void }) {
    return (
        <Container fluid p={'lg'} style={{ padding: '0' }}>
            <Flex justify="space-between">
                <div>
                    <Text size="xl" style={{ fontWeight: '500' }}>Компания {selection.companyPartner.name || "Неизвестная компания"}</Text>
                    <Text size="xl">Стек: {selection.stack.name || "Неизвестный стек"}</Text>
                </div>
                <div>
                    <Flex wrap="wrap">
                        <span className={selection.status} style={{ whiteSpace: 'nowrap' }}>{getStatusText(selection.status)}</span>
                        {selection.status === "SUCCEED" && (
                            <>
                                <span style={{ lineHeight: '1', fontSize: '30px', margin: '0 5px' }}>/</span>
                                <SuccedSelection id={selection.id} onSuccess={onSuccess} />
                            </>
                        )}
                        <CommentSelection id={chatId} />
                        <EditSelection id={selection.id} onSuccess={onSuccess}/>
                        <DeleteSelection id={selection.id} onSuccess={onSuccess}/>
                    </Flex>
                </div>
            </Flex>
        </Container>
    );
}


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