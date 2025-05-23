import { useEffect, useState } from "react";
import { TextInput, Select, MultiSelect } from "@mantine/core";
import { GET_GROUPS, GET_COMPANIES, GET_STACKS } from "shared/lib";
import { DatePicker } from "@mantine/dates";

export function FilterName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
{
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="ФИО"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterCompanyName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
{
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Название компании"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterCompanySelect({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const companies = GET_COMPANIES.content;
            const selectData = companies.map(company => ({
                value: company.id,
                label: company.name,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Выберите компании"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}


export function FilterRoles({ id, onChangeValue }: { id: string; onChangeValue: (val: string[]) => void; }) 
{
    const [value, setValue] = useState<string[]>([]);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "student", label: "Студент" },
            { value: "curator", label: "Куратор" },
            { value: "dean", label: "Деканат" },
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder="Выберите роли"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}


export function FilterGroup({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const groups = GET_GROUPS.content;
            const selectData = groups.map(group => ({
                value: group.id,
                label: group.number,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Выберите группу"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterGroupMultiple({ id, onChangeValue }: { id: string; onChangeValue: (val: string[]) => void; }) 
{
    const [value, setValue] = useState<string[]>([]);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const groups = GET_GROUPS.content;
            const selectData = groups.map(group => ({
                value: group.id,
                label: group.number,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder="Выберите группу"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterStack({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const stacks = GET_STACKS.content;
            const selectData = stacks.map(stack => ({
                value: stack.id,
                label: stack.name,
            }));

            setData(selectData);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Выберите направление"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterLanguage({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
{
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Технологии"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterReportStatus({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "student", label: "На рассмотрении" },
            { value: "curator", label: "Отклонен" },
            { value: "dean", label: "Пройден" },
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Выберите статус"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterType({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "student", label: "Этот семестр" },
            { value: "curator", label: "Все семестры" }
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Выберите тип"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterDate({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        setValue(date);
        onChangeValue(date ? date.toISOString() : null);
    };

    return (
        <DatePicker
            id={`filter-${id}`}
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterReportApprove({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "all", label: "Все" },
            { value: "NotAvailable", label: "Не приложен" },
            { value: "NotApproved", label: "Не подтвержден" },
            { value: "Approved", label: "Подтвержден" }
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Отчет по практике"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterReportAvailability({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "true", label: "Да" },
            { value: "false", label: "Нет" },
            { value: "null", label: "" }
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Отчет подтвержден"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterArchive({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "true", label: "Да" },
            { value: "false", label: "Нет" },
            { value: "null", label: "" }
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`} 
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}

export function FilterPracticeApprove({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "true", label: "Да" },
            { value: "false", label: "Нет" },
            { value: "null", label: "" }
        ]);
        }, 300);
    }, []);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder="Практика подтверждена"
            value={value}
            onChange={handleChange}
            data={data}
            clearable
        />
    );
}