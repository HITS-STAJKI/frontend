import { Button, MultiSelect, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form"
import { Company, GET_STACKS, GET_COMPANIES, Language, Stack } from "shared/lib";
import { GET_LANGUAGES } from "shared/lib/api/stubs/Language";

export interface  EditSelectionFormProps<T> {
    onSuccess: () => void;
    id: string;
    initialValues?: T;
}

type CreateSelectionFormProps = {
    onSuccess: () => void;
    id: string;
}

type StatusOption = {
    id: string;
    name: string;
};

const statusOptions: StatusOption[] = [
    { id: "PENDING", name: "В процессе" },
    { id: "REJECTED", name: "Отклонено" },
    { id: "SUCCEED", name: "Пройдено" },
];

export const CreateSelectionForm = ({ onSuccess, id}: CreateSelectionFormProps) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            companyId: '',
            stackId: '',
            comment: '',
            languageId: ''
        },
        validate: {
            companyId: (value) => (value ? null : 'Это поле обязательно'),
            stackId: (value) => (value ? null : 'Это поле обязательно'),
            languageId: (value) => (value ? null : 'Это поле обязательно'),
        }
    });
    const onSubmit = (vals: { comment: string }) => {
        console.log(`Тело запроса создания для ${id}:`, vals); // Тело запроса для создания
        onSuccess(); // Успешная отправка
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm content={GET_COMPANIES.content} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value)} />
            <SelectForm content={GET_STACKS.content} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value)} />
            <MultiSelectForm content={GET_LANGUAGES.content} label={"Языки"} onChange={(value) => form.setFieldValue('languageId', value)} />
            <Textarea
                style={{ marginBottom: '15px' }}
                placeholder={"Напишите комментарий"}
                key={form.key('comment')}
                mb="xs"
                {...form.getInputProps('comment')}
            />
            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }}>{'Сохранить'}</Button>
            </div>
        </form>
    );
}

export const EditSelectionForm = <T extends { companyId: string; stackId: string; status: string }>({ onSuccess, id, initialValues }: EditSelectionFormProps<T>) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: initialValues || {
            companyId: '',
            stackId: '',
            status: ''
        },
        validate: {
            companyId: (value) => (value ? null : 'Это поле обязательно'),
            stackId: (value) => (value ? null : 'Это поле обязательно'),
            status: (value) => (value ? null : 'Это поле обязательно'),
        }
    });
    const onSubmit = (vals: T) => {
        console.log(`Тело запроса изменения для ${id}:`, vals); // Тело запроса для изменения
        onSuccess(); // Успешная отправка
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm content={GET_COMPANIES.content} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value)} />
            <SelectForm content={GET_STACKS.content} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value)} />
            <SelectForm content={statusOptions} label={"Статус"} onChange={(value) => form.setFieldValue('status', value)} />
            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }}>{'Сохранить'}</Button>
            </div>
        </form>
    );
}

type SelectFormProps = {
    content: Company[] | Stack[] | Language[] | StatusOption[];
    label: string;
    onChange: (value: string) => void;
}

const MultiSelectForm = ({ content, label, onChange }: SelectFormProps) => {
    return (
        <MultiSelect
        style={{ marginBottom: '15px' }}
        label={label}
        withAsterisk
        placeholder={label}
        onChange={onChange}
        data={content.map(option => {
            return { value: option.id, label: option.name };
        })}
        required
      />
    );
  };

const SelectForm = ({ content, label, onChange }: SelectFormProps) => {
    return (
        <Select
        style={{ marginBottom: '15px' }}
        label={label}
        withAsterisk
        placeholder={label}
        onChange={onChange}
        data={content.map(option => {
            return { value: option.id, label: option.name };
        })}
        required
      />
    );
};