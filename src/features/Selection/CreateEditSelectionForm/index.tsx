import { Button, MultiSelect, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form"
import { Company, GET_STACKS, GET_COMPANIES, Language, Stack } from "shared/lib";
import { GET_LANGUAGES } from "shared/lib/api/stubs/Language";

type SelectionFormProps = {
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

type EditFormValues = {
    companyId: string;
    stackId: string;
    status: string;
};

export const CreateSelectionForm = ({ onSuccess, id}: SelectionFormProps) => {
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

export const EditSelectionForm = ({ onSuccess, id }: SelectionFormProps) => {
    const form = useForm<EditFormValues>({
        mode: 'uncontrolled',
        initialValues: {
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
    const onSubmit = (vals: EditFormValues) => {
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
    required?: boolean;
}

export const MultiSelectForm = ({ content, label, onChange, required = true }: SelectFormProps) => {
    return (
        <MultiSelect
        style={{ marginBottom: '15px' }}
        label={label}
        withAsterisk={required}
        placeholder={label}
        onChange={onChange}
        data={content.map(option => {
            return { value: option.id, label: option.name };
        })}
        required={required}
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