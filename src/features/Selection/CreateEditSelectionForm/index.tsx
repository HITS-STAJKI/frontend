import { Button, MultiSelect, Select, Center, Loader, SelectProps } from "@mantine/core";
import { useForm } from "@mantine/form"
import { CreateInterviewDtoStatus, UpdateInterviewDtoStatus } from "services/api/api-client.types";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useCreateInterviewMutation, useGetInterviewQuery, useUpdateInterviewMutation } from "services/api/api-client/InterviewsQuery";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
import { Company, Language, Stack } from "shared/lib";
import { useQueryClient } from '@tanstack/react-query';
import { QueryFactory } from "services/api";

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

export const CreateSelectionForm = ({ onSuccess, }: SelectionFormProps) => {
    const form = useForm<{ companyId: string, stackId: string, languageId: string[] }>({
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
    const queryClient = useQueryClient()

    if (isLoadingStacks || isLoadingLanguages || isLoadingPartners) {
        return <Center>
            <Loader />
        </Center>
    }
    const onSubmit = async (vals: { companyId: string, stackId: string, languageId: Array<string> }) => {
        await mutateAsync({ languageIds: vals.languageId, companyPartnerId: vals.companyId, stackId: vals.stackId, status: CreateInterviewDtoStatus.PENDING })
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.InterviewsQuery.getInterviewListQueryKey().slice(-1,0)
        })
        onSuccess();
    };
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm items={dataCompany?.items!} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value!)} />
            <SelectForm items={dataStacks!} label={"Напраления"} onChange={(value) => form.setFieldValue('stackId', value!)} />
            <MultiSelectForm items={dataLanguages!} label={"Языки"} onChangeMulti={(value) => form.setFieldValue('languageId', value!)} />
            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }}>{'Сохранить'}</Button>
            </div>
        </form>
    );
}

export const EditSelectionForm = ({ onSuccess, id }: SelectionFormProps) => {
    const { mutateAsync } = useUpdateInterviewMutation(id)
    const queryClient = useQueryClient()
    const { data, isLoading } = useGetInterviewQuery(id)
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
    const onSubmit = async (vals: EditFormValues) => {
        await mutateAsync(vals)
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.InterviewsQuery.getInterviewQueryKey(id)
        })
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.InterviewsQuery.getInterviewListQueryKey().slice(-1, 0)
        })
        onSuccess()

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
    onChange?: SelectProps['onChange']
    onChangeMulti?: (value: string[]) => void
    required?: boolean;
    defaultValue?: string | string[]
}

export const MultiSelectForm = ({ items, label, onChangeMulti, required = true, defaultValue }: SelectFormProps) => {
    return (
        <MultiSelect
            style={{ marginBottom: '15px' }}
            label={label}
            withAsterisk={required}
            placeholder={label}
            defaultValue={Array.isArray(defaultValue) ? defaultValue : undefined}
            onChange={onChangeMulti}
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