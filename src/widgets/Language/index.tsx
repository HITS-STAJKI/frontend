import { useForm } from "@mantine/form";
import { Language } from "../../shared/lib/api/entities/Language";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal } from "@mantine/core";
import { useState } from "react";
import { GET_LANGUAGES } from "../../shared/lib/api/stubs/Language";

import EditIcon from './edit';
import TrashIcon from './trash';

interface LanguageFormProps {
    language: Language | null;
    onSubmit: (language: Language) => void;
}
export const LanguageForm = ({ language, onSubmit }: LanguageFormProps) => {
    const form = useForm<Language>({
        initialValues: {
            id: language ? language.id : `language_id_${Math.random()}`,
            name: language ? language.name : ''
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
export const LanguageList = () => {
    const [languages, setLanguages] = useState(GET_LANGUAGES.content);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [newLanguageName, setNewLanguageName] = useState('');
    const handleDelete = (id: string) => {
        setLanguages(languages.filter(lang => lang.id !== id));
    };
    const handleEdit = (language: Language) => {
        const newEditingState = {
            ...isEditing,
            [language.id]: !isEditing[language.id]
        };
        setIsEditing(newEditingState);
        if (selectedLanguage && selectedLanguage.id === language.id) {
            handleCreateOrUpdate(language);
            setSelectedLanguage(null);
        } else {
            setSelectedLanguage(language);
        }
    };
    const handleCreateOrUpdate = (language: Language) => {
        if (selectedLanguage) {
            setLanguages(languages.map(lang => lang.id === language.id ? language : lang));
        } else {
            setLanguages([...languages, language]);
        }
        setSelectedLanguage(null);
        setIsEditing({});
    };
    const handleCreateNewLanguage = () => {
        if (newLanguageName.trim()) {
            const newLanguage: Language = {
                id: `language_id_${Math.random()}`,
                name: newLanguageName.trim()
            };
            setLanguages([...languages, newLanguage]);
            setNewLanguageName('');
            setModalOpen(false);
        }
    };
    const filteredLanguages = languages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <Container style={{ width: '100%' }}>
            <Flex direction="column">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <TextInput
                        placeholder="Поиск языка..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    />
                    <Button onClick={() => setModalOpen(true)}  style={{ marginLeft: '10px' }}>
                        Создать язык
                    </Button>
                </div>
                <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
                    {filteredLanguages.map(lang => (
                        <Card key={lang.id} shadow="sm" padding="lg" style={{ width: '32%', maxWidth: '300px', height: '64px' }}>
                            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                                {selectedLanguage && selectedLanguage.id === lang.id ? (
                                    <LanguageForm language={lang} onSubmit={handleCreateOrUpdate} />
                                ) : (
                                    <Text>{lang.name}</Text>
                                )}
                                <Flex gap="md">
                                    <Button color="gray" onClick={() => handleEdit(lang)} style={{ width: '48px', height: '48px', padding: 0, display: isEditing[lang.id] ? 'none' : 'inline' }}>
                                        <EditIcon />
                                    </Button>
                                    <Button color="red" onClick={() => handleDelete(lang.id)} style={{ width: '48px', height: '48px', padding: 0 }}>
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
                title="Создание нового языка"
            >
                <TextInput
                    placeholder="Введите название языка"
                    value={newLanguageName}
                    onChange={(event) => setNewLanguageName(event.currentTarget.value)}
                />
                <Button
                    onClick={handleCreateNewLanguage}
                    style={{ marginTop: '10px' }}
                >
                    Создать
                </Button>
            </Modal>
        </Container>
    );
};