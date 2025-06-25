import { Button, TextInput, Select, Grid } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { Company, Group } from "shared/lib";
import '@mantine/dates/styles.css';

const type = [
    { value: "All", label: "Все" },
    { value: "Current", label: "Семестр" },
];

const statuses = [
    { value: "pending", label: "На рассмотрении" },
    { value: "accepted", label: "Приняли" },
    { value: "rejected", label: "Не приняли" },
    { value: "interning", label: "На практике" },
];

interface SelectionFiltersFormValues {
    StudentName: string;
    Direction: string;
    type: string;
    status: string;
    selectedGroup: Group | null;
    selectedCompany: Company | null;
    dateFrom: Date | null;
    dateTo: Date | null;
}

export function SelectionFiltersForm({ groupContent, companyContent, onFormSubmit }: { groupContent: Group[], companyContent: Company[], onFormSubmit: (data: SelectionFiltersFormValues) => void }) {
    const form = useForm<SelectionFiltersFormValues>({
        initialValues: {
            StudentName: '',
            Direction: '',
            type: '',
            status: '',
            selectedGroup: null,
            selectedCompany: null,
            dateFrom: null,
            dateTo: null,
        },
      });

    const groups = groupContent.map(group => ({ value: group.id, label: group.number }));
    const companies = companyContent.map(company => ({ value: company.id, label: company.name }));

    function handleSearch() {
        onFormSubmit(form.values);
        console.log("Поиск выполнен!", form.values);
    }

    function handleReset() {
        form.reset();
    }

    function handlePrint() {
        console.log("Данные для печати:", form.values);
    }

    return (
        <form onSubmit={form.onSubmit(handleSearch)}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Grid grow>
                    <Grid.Col span={3}>
                        <TextInput label="Имя студента" placeholder="Введите имя" {...form.getInputProps('StudentName')}/>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Select label="Компания" placeholder="Выберите компанию" data={companies} {...form.getInputProps('selectedCompany')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <TextInput label="Направление практики" placeholder="Введите направление" {...form.getInputProps('Direction')}/>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Select label="Статус" placeholder="Выберите статус" data={statuses} {...form.getInputProps('status')} clearable/>
                    </Grid.Col>
                </Grid>

                <Grid grow>
                    <Grid.Col span={1.5}>
                        <Select label="Поток" placeholder="Выберите поток" data={groups} {...form.getInputProps('selectedGroup')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <Select label="Тип" placeholder="Только свежие?" data={type} {...form.getInputProps('type')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <DatePickerInput label="Дата от" placeholder="Выберите дату" {...form.getInputProps('dateFrom')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <DatePickerInput label="Дата до" placeholder="Выберите дату" {...form.getInputProps('dateTo')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1}/>
                    <Grid.Col span={4} style={{ display: "flex", flexDirection: "row", alignItems: "end", justifyContent: "space-between" }}>
                        <Button type="submit" color="blue">Поиск</Button>
                        <Button type="reset" color="red" onClick={handleReset}>Очистить</Button>
                        <Button type="button" color="gray" variant="outline" onClick={handlePrint}>Печать</Button>
                    </Grid.Col>
                    <Grid.Col span={1}/>
                </Grid>
            </div>
        </form>
    );
}
