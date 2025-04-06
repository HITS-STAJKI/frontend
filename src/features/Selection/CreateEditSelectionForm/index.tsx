import { Button, TextInput, MultiSelect, Textarea, Select } from "@mantine/core";
import { useForm } from "@mantine/form"
import { Company, CompanyPage, GET_STACKS, GET_COMPANIES, Language, Page, Stack } from "shared/lib";
import { GET_LANGUAGES } from "shared/lib/api/stubs/Language";
import { InterviewStatus } from "shared/lib/api/entities/Interview";

type CreateSelectionFormProps = {
    onSuccess: () => void;
    type: 'create' | 'edit';
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

export const CreateEditSelectionForm = ({ onSuccess, type }: CreateSelectionFormProps) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            companyId: '',
            stackId: '',
            comment: type === 'create' ? '' : undefined,
            languageId: type === 'create' ? '' : undefined,
            status: type === 'edit' ? '' : undefined
        },
        validate: {
            companyId: (value) => (value ? null : 'Это поле обязательно'),
            stackId: (value) => (value ? null : 'Это поле обязательно'),
            ...(type === 'create' && {
                languageId: (value) => (value ? null : 'Это поле обязательно'),
            }),
            ...(type === 'edit' && {
                status: (value) => (value ? null : 'Это поле обязательно'),
            }),
        }
    });
    const onSubmit = (vals: { comment: string }) => {
        if (type === 'create') {
            console.log('Тело запроса создания', vals); // Тело запроса для создания
        } else{
            console.log('Тело запроса изменения', vals); // Тело запроса для создания
        }
        onSuccess(); // Успешная отправка
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm content={GET_COMPANIES.content} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value)} />
            <SelectForm content={GET_STACKS.content} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value)} />
            {type === 'edit'? 
            <>
                <SelectForm content={statusOptions} label={"Статус"} onChange={(value) => form.setFieldValue('status', value)} />
            </> :
            <>
                <MultiSelectForm content={GET_LANGUAGES.content} label={"Языки"} onChange={(value) => form.setFieldValue('languageId', value)} />
                <Textarea
                    style={{ marginBottom: '15px' }}
                    placeholder={"Напишите комментарий"}
                    key={form.key('comment')}
                    mb="xs"
                    {...form.getInputProps('comment')}
                />
            </>}
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
            if (typeof option === 'string') {
                return { value: option, label: option };
            } else {
                return { value: option.id, label: option.name };
            }
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
            if (typeof option === 'string') {
                return { value: option, label: option };
            } else {
                return { value: option.id, label: option.name };
            }
        })}
        required
      />
    );
};