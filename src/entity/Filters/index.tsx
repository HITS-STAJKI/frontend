import { useEffect, useState } from "react";
import { TextInput, Select, MultiSelect } from "@mantine/core";
import { GET_GROUPS, GET_COMPANIES, GET_STACKS, GET_LANGUAGES } from "shared/lib";
import { DateInput  } from "@mantine/dates";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { CompanyPartnerDto } from "services/api/api-client.types";

export function FilterLanguageName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
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

export function FilterLanguageMultiple({ id, onChangeValue }: { id: string; onChangeValue: (val: string[]) => void; }) 
{
    const [value, setValue] = useState<string[]>([]);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const languages = GET_LANGUAGES;
            const selectData = languages.content.map(language => ({
                value: language.id,
                label: language.name,
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
            placeholder="Выберите технологии"
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

export function FilterInterviewStatus({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "PENDING", label: "На рассмотрении" },
            { value: "REJECTED", label: "Отклонен" },
            { value: "SUCCEED", label: "Пройден" },
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

export function FilterDate({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        setValue(date);
        onChangeValue(date ? date.toISOString() : null);
    };

    return (
        <DateInput 
            id={`filter-${id}`}
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterCompanyName({ id, onChangeValue, initialValue = "" }: { id: string; initialValue?: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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


export function FilterCompanySelect({ id, onChangeValue, initialValue }: { id: string; initialValue: string | null; onChangeValue: (val: string | null) => void; }) {
    const { data, isLoading } = useGetPartnersQuery();

    const options = isLoading || !Array.isArray(data?.items)
        ? []
        : data.items.map((partner) => ({
            value: partner.id,
            label: partner.name,
        }));

    const [value, setValue] = useState<string | null>(initialValue);

    useEffect(() => {
        setValue(initialValue ?? null);
    }, [initialValue]);

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder={isLoading ? "Загрузка..." : "Выберите компанию"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
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

export function FilterTrueFalseNull({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
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

export function FilterTrueFalse({ id, onChangeValue, initialValue = "false" }: { id: string; onChangeValue: (val: string | null) => void; initialValue?: string | null; }) {
    const [value, setValue] = useState<string | null>(initialValue);
    const [data, setData] = useState([{ value: "true", label: "Да" }, { value: "false", label: "Нет" }]);

    useEffect(() => {
        onChangeValue(initialValue);
    }, [initialValue]);

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
        />
    );
}

export function FilterUserRole({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) 
{
    const [value, setValue] = useState<string | null>(null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTimeout(() => {
        setData([
            { value: "ADMIN", label: "Админ" },
            { value: "DEAN", label: "Деканат" },
            { value: "CURATOR", label: "Куратор" },
            { value: "STUDENT", label: "Студент" },
            { value: "TEACHER", label: "Преподаватель" },
            { value: "EDUCATIONAL_PROGRAM_LEAD", label: "Руководитель образовательной программы" }
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

export function FilterStackName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
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
            placeholder="Название направления"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterGroupName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) 
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
            placeholder="Номер группы"
            value={value}
            onChange={handleChange}
        />
    );
}