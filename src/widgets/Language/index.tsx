import { useForm } from "@mantine/form";
import { Language } from "../../shared/lib";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal } from "@mantine/core";
import { useState } from "react";
import { LanguagePage } from "../../shared/lib/api/entities";

import { TrashSvgrepoCom } from '../../assets/icons';
import { PencilSvgrepoCom } from '../../assets/icons';

import { EditButton, DeleteButton } from "../../features";

const inputFields: InputField[] = [
    { name: 'languageName', placeholder: 'Введите название языка' }
];

// Поле для ввода текста (название и что отобразить в пустом поле для ввода)
interface InputField {
    name: string;
    placeholder: string;
}

// Интерфейс для вывода модального окна с определёнными полями
interface ModalProps {
    title: string;
    inputFields: InputField[];
    isOpen: boolean;
    onClose: () => void;
}

export function SerachForm(){
    const [isModalOpen, setModalOpen] = useState(false);
    return(
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TextInput
            placeholder="Поиск языка..."
            //onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
        <Button onClick={() => setModalOpen(true)}  style={{ marginLeft: '10px' }}>
            Создать язык
        </Button>
        <ModalForm title="Создание нового языка" inputFields={inputFields} isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
    </div>
    )
}

export function LanguageList({ content }: LanguagePage) {
    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
                {content.map(card => (
                <LanguageCard key={card.id} id={card.id} name={card.name} />
            ))}
        </Flex>
    );
};


function LanguageCard({id, name}: Language){
    function handleEdit({}: Language) {
        console.log(id, name)
    }

    function handleDelete({}: Language) {
        console.log(id, name)
    }

    return(
        <Card key={id} shadow="sm" padding="lg" style={{ width: '100%', maxWidth: '300px', height: '64px' }}>
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                <Text>{name}</Text>
                <Flex gap="md">
                    <EditButton onClick={() => handleEdit({id, name})}></EditButton>
                    <DeleteButton onClick={() => handleDelete({id, name})}></DeleteButton>
                </Flex>
            </Flex>
        </Card>
    )
}

function ModalForm({ title,  inputFields, isOpen, onClose} : ModalProps){
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormValues({
            ...formValues,
            [field]: value
        });
    };

    const createNewObject = () => {
        // Логика для создания нового объекта (пока язык или стек)
        console.log(formValues);
        onClose();
    }

    if (!isOpen) return null; 
    return(
        <Modal title={title} opened={isOpen} onClose={onClose}>
            {inputFields.map((field, index) => (
                <TextInput
                    key={index}
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ''}
                    onChange={(event) => handleChange(field.name, event.currentTarget.value)}
                />
            ))}
            <Button
                onClick={createNewObject}
                style={{ marginTop: '10px' }}
            >
                Создать
            </Button>
        </Modal >
    )
};

