import { Language, Stack } from "../../shared/lib";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal, Input } from "@mantine/core";
import { useState } from "react";
import { LanguagePage, StackPage } from "../../shared/lib/api/entities";

import { EditButton, DeleteButton } from "../../features";
import { ModalForm } from "shared/ui/organisms";



// Интерфейс для определения что отображать в SearchForm
interface SearchFormProps {
    onCreate: (newItem: Language | Stack) => void;
    type: 'language' | 'stack'; // что создавать
}

export function SearchForm({ onCreate, type }: SearchFormProps) {
    const [isModalOpen, setModalOpen] = useState(false);

    const inputFields = type === 'language' 
        ? [{ name: 'name', placeholder: 'Введите название языка' }] 
        : [{ name: 'name', placeholder: 'Введите название стека' }];

    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextInput
            placeholder={type === 'language' ? "Поиск языка..." : "Поиск стека..."}
            //onChange={(event) => setSearchTerm(event.currentTarget.value)}
            // Поиск не делаю - отправляется запрос на сервер и возвращается список языков/стеков
        />
        <Button onClick={() => setModalOpen(true)}  style={{ marginLeft: '10px' }}>
            {type === 'language' ? 'Создать язык' : 'Создать стек'}
        </Button>
        <ModalForm title={type === 'language' ? "Создание нового языка" : "Создание нового стека"} inputFields={inputFields} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate}/>
    </div>
    )
}

export function LanguageList({ content }: LanguagePage | StackPage) {
    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
                {content.map(card => (
                <LanguageStackCard key={card.id} id={card.id} name={card.name} />
            ))}
        </Flex>
    );
};


function LanguageStackCard({id, name}: Language | Stack){
    const [isEditing, setIsEditing] = useState(false); // Состояние для отслеживания режима редактирования
    const [currentName, setCurrentName] = useState(name); // Состояние для хранения текущего имени

    function handleEdit({}: Language | Stack) {
        setIsEditing(!isEditing)
        name = currentName
        console.log(id, name)
    }

    function handleDelete({}: Language | Stack) {
        // Удаление пока не делаю
        console.log(id, name)
    }

    return(
        <Card key={id} shadow="sm" padding="lg" style={{ width: '100%', maxWidth: '300px', height: '64px' }}>
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                {isEditing ? (
                        <Input 
                            value={currentName} 
                            onChange={(e) => setCurrentName(e.target.value)} 
                        />
                    ) : (
                        <Text>{currentName}</Text>
                    )}
                <Flex gap="md">
                    <EditButton onClick={() => handleEdit({id, name})}></EditButton>
                    <DeleteButton onClick={() => handleDelete({id, name})}></DeleteButton>
                </Flex>
            </Flex>
        </Card>
    )
}


