import { Language, Stack } from "../../shared/lib";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal, Input } from "@mantine/core";
import { useState } from "react";

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
    onCreate: (newLanguage: Language | Stack) => void;
}
export function ModalForm({ title,  inputFields, isOpen, onClose,  onCreate} : ModalProps){
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormValues({
            ...formValues,
            [field]: value
        });
    };

    const createNewObject = () => {
        // Логика для создания нового объекта (пока язык или стек)
        const newItem: Language | Stack = {
            id: Date.now().toString(),
            name: formValues['name'],
        };
        console.log(newItem);
        onCreate(newItem);
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