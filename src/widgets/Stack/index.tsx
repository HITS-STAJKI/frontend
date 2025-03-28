import { useForm } from "@mantine/form";
import { Stack } from "../../shared/lib/api/entities/Stack";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal } from "@mantine/core";
import { useState } from "react";
import { GET_STACKS } from "../../shared/lib/api/stubs/Stack";

import EditIcon from './edit';
import TrashIcon from './trash';

interface StackFormProps {
    Stack: Stack | null;
    onSubmit: (Stack: Stack) => void;
}
export const StackForm = ({ Stack, onSubmit }: StackFormProps) => {
    const form = useForm<Stack>({
        initialValues: {
            id: Stack ? Stack.id : `Stack_id_${Math.random()}`,
            name: Stack ? Stack.name : ''
        }
    });
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(form.values);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Flex align="center" gap="sm">
                <TextInput required {...form.getInputProps('name')} />
                <Flex mr="md">
                    <Button type='submit' color="gray" style={{ width: '48px', height: '48px', padding: 0 }}>
                        <EditIcon />
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
export const StackList = () => {
    const [Stacks, setStacks] = useState(GET_STACKS.content);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [newStackName, setNewStackName] = useState('');
    const handleDelete = (id: string) => {
        setStacks(Stacks.filter(st => st.id !== id));
    };
    const handleEdit = (Stack: Stack) => {
        const newEditingState = {
            ...isEditing,
            [Stack.id]: !isEditing[Stack.id]
        };
        setIsEditing(newEditingState);
        if (selectedStack && selectedStack.id === Stack.id) {
            handleCreateOrUpdate(Stack);
            setSelectedStack(null);
        } else {
            setSelectedStack(Stack);
        }
    };
    const handleCreateOrUpdate = (Stack: Stack) => {
        if (selectedStack) {
            setStacks(Stacks.map(st => st.id === Stack.id ? Stack : st));
        } else {
            setStacks([...Stacks, Stack]);
        }
        setSelectedStack(null);
        setIsEditing({});
    };
    const handleCreateNewStack = () => {
        if (newStackName.trim()) {
            const newStack: Stack = {
                id: `Stack_id_${Math.random()}`,
                name: newStackName.trim()
            };
            setStacks([...Stacks, newStack]);
            setNewStackName('');
            setModalOpen(false);
        }
    };
    const filteredStacks = Stacks.filter(st => st.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <TextInput
                        placeholder="Поиск стека..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    />
                    <Button onClick={() => setModalOpen(true)}  style={{ marginLeft: '10px' }}>
                        Создать стек
                    </Button>
                </div>
                <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
                    {filteredStacks.map(st => (
                        <Card key={st.id} shadow="sm" padding="lg" style={{ width: '100%', maxWidth: '300px', height: '64px' }}>
                            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                                {selectedStack && selectedStack.id === st.id ? (
                                    <StackForm Stack={st} onSubmit={handleCreateOrUpdate} />
                                ) : (
                                    <Text>{st.name}</Text>
                                )}
                                <Flex gap="md">
                                    <Button color="gray" onClick={() => handleEdit(st)} style={{ width: '48px', height: '48px', padding: 0, display: isEditing[st.id] ? 'none' : 'inline' }}>
                                        <EditIcon />
                                    </Button>
                                    <Button color="red" onClick={() => handleDelete(st.id)} style={{ width: '48px', height: '48px', padding: 0 }}>
                                        <TrashIcon />
                                    </Button>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>

            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Создание нового стека"
            >
                <TextInput
                    placeholder="Введите название стека"
                    value={newStackName}
                    onChange={(event) => setNewStackName(event.currentTarget.value)}
                />
                <Button
                    onClick={handleCreateNewStack}
                    style={{ marginTop: '10px' }}
                >
                    Создать
                </Button>
            </Modal>
        </Container>
    );
};