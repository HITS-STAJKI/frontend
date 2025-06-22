import { Button, MultiSelect, Textarea, Select, Center, Loader } from "@mantine/core";
import { useForm } from "@mantine/form"
import { CreateInterviewDtoStatus, InterviewDtoStatus, UpdateInterviewDtoStatus } from "services/api/api-client.types";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useCreateInterviewMutation, useGetInterviewList_1Query, useGetInterviewQuery, useUpdateInterviewMutation } from "services/api/api-client/InterviewsQuery";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
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
    status: UpdateInterviewDtoStatus;
};

export const CreateSelectionForm = ({ onSuccess, id }: SelectionFormProps) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            companyId: '',
            stackId: '',
            languageId: []
        },
        validate: {
            companyId: (value) => (value ? null : 'Это поле обязательно'),
            stackId: (value) => (value ? null : 'Это поле обязательно'),
            languageId: (value) => (value ? null : 'Это поле обязательно'),
        }
    });
    const { data: dataStacks, isLoading: isLoadingStacks } = useGetStackListQuery()
    const { data: dataLanguages, isLoading: isLoadingLanguages } = useGetLanguageListQuery()
    const { data: dataCompany, isLoading: isLoadingPartners } = useGetPartnersQuery(undefined, undefined, undefined, 0, 100000000)
    const { mutateAsync } = useCreateInterviewMutation()
    const { refetch } = useGetInterviewList_1Query()
    if (isLoadingStacks || isLoadingLanguages || isLoadingPartners) {
        return <Center>
            <Loader />
        </Center>
    }
    const onSubmit = (vals: { companyId: string, stackId: string, languageId: Array<string> }) => {
        mutateAsync({ languageIds: vals.languageId, companyPartnerId: vals.companyId, stackId: vals.stackId, status: CreateInterviewDtoStatus.PENDING }).then(() => {
            refetch()
            onSuccess();
        })
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm items={dataCompany?.items!} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value)} />
            <SelectForm items={dataStacks!} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value)} />
            <MultiSelectForm items={dataLanguages!} label={"Языки"} onChange={(value) => form.setFieldValue('languageId', value)} />
            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }}>{'Сохранить'}</Button>
            </div>
        </form>
    );
}

export const EditSelectionForm = ({ onSuccess, id }: SelectionFormProps) => {
    const { mutateAsync } = useUpdateInterviewMutation(id)
    const { refetch } = useGetInterviewList_1Query()
    const { data, isLoading, refetch: refetchData } = useGetInterviewQuery(id)
    const form = useForm<EditFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            status: (data?.status as unknown as UpdateInterviewDtoStatus) || UpdateInterviewDtoStatus.PENDING
        },
        validate: {
            status: (value) => (value ? null : 'Это поле обязательно'),
        }
    });
    if (isLoading) {
        return <Center>
            <Loader />
        </Center>
    }
    const onSubmit = (vals: EditFormValues) => {
        mutateAsync(vals).then(() => {
            refetch()
            refetchData()
            onSuccess()
        })

    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm items={statusOptions} label={"Статус"} defaultValue={data?.status} onChange={(value) => form.setFieldValue('status', value as unknown as UpdateInterviewDtoStatus)} />
            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }}>{'Сохранить'}</Button>
            </div>
        </form>
    );
}

type SelectFormProps = {
    items: Company[] | Stack[] | Language[] | StatusOption[];
    label: string;
    onChange: (value: string) => void;
    required?: boolean;
    defaultValue?: string | string[]
}

export const MultiSelectForm = ({ items, label, onChange, required = true, defaultValue }: SelectFormProps) => {
    return (
        <MultiSelect
            style={{ marginBottom: '15px' }}
            label={label}
            withAsterisk={required}
            placeholder={label}
            defaultValue={Array.isArray(defaultValue) ? defaultValue : undefined}
            onChange={onChange}
            data={items.map(option => {
                return { value: option.id, label: option.name };
            })}
            required={required}
        />
    );
};

const SelectForm = ({ items, label, onChange, defaultValue }: SelectFormProps) => {
    return (
        <Select
            style={{ marginBottom: '15px' }}
            label={label}
            withAsterisk
            defaultValue={!Array.isArray(defaultValue) ? defaultValue : undefined}
            placeholder={label}
            onChange={onChange}
            data={items.map(option => {
                return { value: option.id, label: option.name };
            })}
            required
        />
    );
};