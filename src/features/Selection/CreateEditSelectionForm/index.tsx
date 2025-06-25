import { Button, MultiSelect, Select, Center, Loader, SelectProps, Card, Text } from "@mantine/core";
import { useForm } from "@mantine/form"
import { CreateInterviewDtoStatus, UpdateInterviewDtoStatus } from "services/api/api-client.types";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useCreateInterviewMutation, useGetInterviewList_1Query, useGetInterviewQuery, useUpdateInterviewMutation } from "services/api/api-client/InterviewsQuery";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
import { Company, Language, Stack } from "shared/lib";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

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

export const CreateSelectionForm = ({ onSuccess }: SelectionFormProps) => {
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
            languageId: (value) => (value.length > 0 ? null : 'Это поле обязательно'),
        }
    });

    const { data: dataStacks, isLoading: isLoadingStacks, isError: isErrorStacks, error: errorStacks } = useGetStackListQuery();

    const { data: dataLanguages,  isLoading: isLoadingLanguages, isError: isErrorLanguages, error: errorLanguages } = useGetLanguageListQuery();

    const { data: dataCompany, isLoading: isLoadingPartners, isError: isErrorPartners, error: errorPartners } = useGetPartnersQuery(undefined, undefined, undefined, 0, 100000000);

    const { mutateAsync, isPending, isError, error } = useCreateInterviewMutation();
    const { refetch } = useGetInterviewList_1Query();

    const onSubmit = async (vals: { companyId: string, stackId: string, languageId: Array<string> }) => {
        try 
        {
            await mutateAsync({
                languageIds: vals.languageId,
                companyPartnerId: vals.companyId,
                stackId: vals.stackId,
                status: CreateInterviewDtoStatus.PENDING
            });
            await refetch();
            onSuccess();
        } 
        catch (err) 
        {
            console.error(err);
        }
    };

    if (isLoadingStacks || isLoadingLanguages || isLoadingPartners) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <fieldset disabled={isPending} style={{ border: 'none', padding: 0, margin: 0 }}>
                <SelectForm items={dataCompany?.items!} label={"Название компании"} onChange={(value) => form.setFieldValue('companyId', value!)} />
                {isErrorPartners && (
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage(errorPartners as any)}
                    </Text>
                )}

                <SelectForm items={dataStacks!} label={"Направления"} onChange={(value) => form.setFieldValue('stackId', value!)} />
                {isErrorStacks && (
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage(errorStacks as any)}
                    </Text>
                )}

                <MultiSelectForm items={dataLanguages!} label={"Языки"} onChangeMulti={(value) => form.setFieldValue('languageId', value!)} />
                {isErrorLanguages && (
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage(errorLanguages as any)}
                    </Text>
                )}
            </fieldset>

            {isError && (
                <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                    <Text color="red" size="sm" mb="xs">
                        Ошибка при создании отбора:
                    </Text>
                    <Text color="red" size="sm" mb="xs">
                        {getErrorMessage(error as any)}
                    </Text>
                </Card>
            )}

            <div style={{ display: 'flex' }}>
                <Button type='submit' style={{ marginLeft: 'auto' }} loading={isPending}>
                    {'Сохранить'}
                </Button>
            </div>
        </form>
    );
};

export const EditSelectionForm = ({ onSuccess, id }: SelectionFormProps) => {
    const { mutateAsync, isError: isUpdateError, error: updateError, isPending: isSubmitting } = useUpdateInterviewMutation(id);

    const { refetch } = useGetInterviewList_1Query();
    const { data, isLoading: isGetLoading, isError: isGetError, error: getError, refetch: refetchData } = useGetInterviewQuery(id);

    const form = useForm<EditFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            status:
                (data?.status as unknown as UpdateInterviewDtoStatus) ||
                UpdateInterviewDtoStatus.PENDING,
        },
        validate: {
            status: (value) => (value ? null : 'Это поле обязательно'),
        },
    });

    if (isGetLoading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (isGetError) {
        return (
            <Card withBorder padding="lg" radius="md" shadow="sm" style={{ width: '100%' }}>
                <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                    {getErrorMessage(getError)}
                </Text>
            </Card>
        );
    }

    const onSubmit = async (vals: EditFormValues) => {
        try 
        {
            await mutateAsync(vals);
            await Promise.all([refetch(), refetchData()]);
            onSuccess();
        } 
        catch {}
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <SelectForm
                items={statusOptions}
                label={"Статус"}
                defaultValue={data?.status}
                onChange={(value) =>
                    form.setFieldValue('status', value as unknown as UpdateInterviewDtoStatus)
                }
            />

            {isUpdateError && (
                <Text color="red" size="sm" mt="xs">
                    {getErrorMessage(updateError)}
                </Text>
            )}

            <div style={{ display: 'flex' }}>
                <Button
                    type="submit"
                    style={{ marginLeft: 'auto' }}
                    loading={isSubmitting}
                >
                    {'Сохранить'}
                </Button>
            </div>
        </form>
    );
};


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