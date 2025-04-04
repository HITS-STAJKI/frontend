import { Button, TextInput, Select, Grid } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { Group } from "shared/lib";

export function SelectionFiltersForm({ groupContent }: { groupContent: Group[] }) {
    const form = useForm({
        initialValues: {
        StudentName: '',
        CompanyName: '',
        Direction: '',
        type: '',
        status: '',
        selectedGroup: null,
        selectedStudentCompany: null,
        selectedCuratorCompany: null,
        dateFrom: null,
        dateTo: null,
        },
    });

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

    const groups = groupContent.map(group => ({ value: group.id, label: group.number }));

    function handleSearch() {
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
                        <TextInput label="Название компании" placeholder="Введите название" {...form.getInputProps('CompanyName')}/>
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
                        <Select label="Группа" placeholder="Выберите группу" data={groups} {...form.getInputProps('selectedGroup')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <Select label="Тип" placeholder="Только свежие?" data={type} {...form.getInputProps('type')} clearable/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <DatePickerInput label="Дата от" placeholder="Выберите дату" {...form.getInputProps('dateFrom')} clearable style={{ width: '100%' }}/>
                    </Grid.Col>

                    <Grid.Col span={1.5}>
                        <DatePickerInput label="Дата до" placeholder="Выберите дату" {...form.getInputProps('dateTo')} clearable style={{ width: '100%' }}/>
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
