import { Language, Stack } from "../../shared/lib";

import { Button, Container, Flex, Title, Card, Text, TextInput, Grid, Modal, Input } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form"

/*// Поле для ввода текста (название и что отобразить в пустом поле для ввода)
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
}*/

type CreateLanguageOrStackFormProps = {
    onSuccess: () => void;
    type: 'language' | 'stack';
}

export const CreateLanguageOrStackForm = ({ onSuccess, type }: CreateLanguageOrStackFormProps) => {
    const form = useForm<{ name: string }>({
        initialValues: {
            name: ''
        }
    });
    const onSubmit = (vals: { name: string }) => {
        console.log('Тело запроса', vals);
        onSuccess(); // Успешная отправка
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label={type === 'language' ? "Название языка" : "Название стека"}
                key={form.key('name')}
                mb="xs"
                {...form.getInputProps('name')}
            />
            <Button type='submit'>{'Сохранить'}</Button>
        </form>
    );
}