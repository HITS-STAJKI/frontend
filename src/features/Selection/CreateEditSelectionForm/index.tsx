import { Button, TextInput, MultiSelect, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form"
import { Company, CompanyPage, GET_STACKS, GET_COMPANIES, Language, Page, Stack } from "shared/lib";
import { GET_LANGUAGES } from "shared/lib/api/stubs/Language";

type CreateSelectionFormProps = {
    onSuccess: () => void;
    type: 'create' | 'edit';
}

export const CreateEditSelectionForm = ({ onSuccess, type }: CreateSelectionFormProps) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            comment: '',
            companyId: '',
            stackId: '',
            languageId: ''
        },
        validate: {
            companyId: (value) => (value ? null : 'Это поле обязательно'),
            stackId: (value) => (value ? null : 'Это поле обязательно'),
            languageId: (value) => (value ? null : 'Это поле обязательно'),
        },
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
            <SelectForm page={GET_COMPANIES} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value)} />
            <SelectForm page={GET_STACKS} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value)} />
            <SelectForm page={GET_LANGUAGES} label={"Языки"} onChange={(value) => form.setFieldValue('languageId', value)}/>
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

type SelectFormProps = {
    page: Page<Company> | Page<Stack> | Page<Language>;
    label: string;
    onChange: (value: string) => void;
}

const SelectForm = ({ page, label, onChange }: SelectFormProps) => {
    return (
        <MultiSelect 
        style={{ marginBottom: '15px' }}
        label={label}
        withAsterisk
        placeholder={label}
        onChange={onChange}
        data={page.content.map(option => ({ value: option.id, label: option.name }))}
        required
      />
    );
  };