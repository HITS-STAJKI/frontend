import { useEffect, useState } from "react";
import { TextInput, Select, MultiSelect } from "@mantine/core";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useGetStackListQuery } from "services/api/api-client/StackQuery";
import { useGetLanguageListQuery } from "services/api/api-client/Programming_languageQuery";

export function FilterLanguageName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Выберите язык программирования"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterGroupInput({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Введите номер потока"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterName({ id, onChangeValue, initialValue = "" }: { id: string; initialValue?: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState(initialValue ?? "");

    useEffect(() => {
        setValue(initialValue ?? "");
    }, [initialValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Введите ФИО"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterInterviewStatus({ id, onChangeValue, initialValue }: { id: string; initialValue: string | null; onChangeValue: (val: string | null) => void; }) {
    const [value, setValue] = useState<string | null>(initialValue);

    const options = [
        { value: "PENDING", label: "На рассмотрении" },
        { value: "REJECTED", label: "Отклонен" },
        { value: "SUCCEED", label: "Пройден" }
    ];

    const handleChange = (val: string | null) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <Select
            id={`filter-${id}`}
            placeholder={"Выберите статус"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
        />
    );
}

export function FilterDate({ id, initialValue = null, onChangeValue }: { id: string; initialValue?: string | null; onChangeValue: (val: string | null) => void; }) {
    const [value, setValue] = useState<Date | null>(
        initialValue ? new Date(initialValue) : null
    );

    useEffect(() => {
        setValue(initialValue ? new Date(initialValue) : null);
    }, [initialValue]);

    const handleChange = (date: Date | null) => {
        setValue(date);
        onChangeValue(date ? date.toISOString().slice(0, 19) : null);
    };

    return (
        <DateInput
            id={`filter-${id}`}
            value={value}
            onChange={handleChange}
            clearable
        />
    );
}

export function FilterDateTime({ id, initialValue = null, onChangeValue }: { id: string; initialValue?: string | null; onChangeValue: (val: string | null) => void; }) {
    const [value, setValue] = useState<Date | null>(
        initialValue ? new Date(initialValue) : null
    );

    useEffect(() => {
        setValue(initialValue ? new Date(initialValue) : null);
    }, [initialValue]);

    const handleChange = (date: Date | null) => {
        setValue(date);
        onChangeValue(date ? date.toISOString().slice(0, 19) : null);
    };

    return (
        <DateTimePicker
            id={`filter-${id}`}
            value={value}
            onChange={handleChange}
            clearable
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
            placeholder="Введите название компании"
            value={value}
            onChange={handleChange}
        />
    );
}


export function FilterStack({ id, onChangeValue, initialValue }: { id: string; initialValue: string | null; onChangeValue: (val: string | null) => void; }) {
    const { data, isLoading } = useGetStackListQuery(undefined);

    const options = isLoading || !Array.isArray(data)
        ? []
        : data?.map((stack) => ({
            value: stack.id,
            label: stack.name,
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
            placeholder={isLoading ? "Загрузка..." : "Выберите стэк"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterCompanySelect({ id, onChangeValue, initialValue }: { id: string; initialValue: string | null; onChangeValue: (val: string | null) => void; }) {
    const { data, isLoading } = useGetPartnersQuery(undefined, undefined, undefined, 0, 1000);

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
            placeholder={isLoading ? "Загрузка..." : "Выберите название компании"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterGroupSelect({ id, onChangeValue, initialValue }: { id: string; initialValue: string | null; onChangeValue: (val: string | null) => void; }) {
    const { data, isLoading } = useGetGroupsQuery(undefined, undefined, 0, 10000000000);

    const options = isLoading || !Array.isArray(data?.items)
        ? []
        : data.items.map((group) => ({
            value: group.id!,
            label: group.number!,
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
            placeholder={isLoading ? "Загрузка..." : "Выберите поток"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}


export function FilterGroupMultiple({ id, initialValue = [], onChangeValue }: { id: string; initialValue: string[] | string | null; onChangeValue: (val: string[]) => void; }) {
    const normalizeValue = (val: string[] | string | null): string[] => {
        if (Array.isArray(val)) {
            return val;
        }
        if (typeof val === "string") {
            return [val];
        }
        return [];
    };

    const [value, setValue] = useState<string[]>(normalizeValue(initialValue));

    const { data, isLoading } = useGetGroupsQuery(undefined, undefined, 0, 1000);

    const options =
        isLoading || !Array.isArray(data?.items)
            ? []
            : data.items
                .filter((group) => group.id && group.number)
                .map((group) => ({
                    value: group.id!,
                    label: group.number!
                }));

    useEffect(() => {
        setValue(normalizeValue(initialValue));
    }, [initialValue]);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder={isLoading ? "Загрузка..." : "Выберите номер потока"}
            value={value}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterCompanyMultiple({ id, initialValue = [], onChangeValue }: { id: string; initialValue: string[] | string | null; onChangeValue: (val: string[]) => void; }) {
    const normalizeValue = (val: string[] | string | null): string[] => {
        if (Array.isArray(val)) {
            return val;
        }
        if (typeof val === "string") {
            return [val];
        }
        return [];
    };

    const [value, setValue] = useState<string[]>(normalizeValue(initialValue));

    const { data, isLoading } = useGetPartnersQuery(undefined, undefined, undefined, 0, 1000);

    const options =
        isLoading || !Array.isArray(data?.items)
            ? []
            : data.items
                .filter((company) => company.id && company.name)
                .map((company) => ({
                    value: company.id!,
                    label: company.name!
                }));

    useEffect(() => {
        setValue(normalizeValue(initialValue));
    }, [initialValue]);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder={isLoading ? "Загрузка..." : "Выберите компании"}
            value={value ?? []}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterStackMultiple({ id, initialValue = [], onChangeValue }: { id: string; initialValue: string[] | string | null; onChangeValue: (val: string[]) => void; }) {
    const normalizeValue = (val: string[] | string | null): string[] => {
        if (Array.isArray(val)) {
            return val;
        }
        if (typeof val === "string") {
            return [val];
        }
        return [];
    };

    const [value, setValue] = useState<string[]>(normalizeValue(initialValue));

    const { data, isLoading } = useGetStackListQuery(undefined);

    const options =
        isLoading || !Array.isArray(data)
            ? []
            : data
                .filter((stack) => stack.id && stack.name)
                .map((stack) => ({
                    value: stack.id!,
                    label: stack.name!
                }));

    useEffect(() => {
        setValue(normalizeValue(initialValue));
    }, [initialValue]);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder={isLoading ? "Загрузка..." : "Выберите направления"}
            value={value ?? []}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterLanguageMultiple({ id, initialValue = [], onChangeValue }: { id: string; initialValue: string[] | string | null; onChangeValue: (val: string[]) => void; }) {
    const normalizeValue = (val: string[] | string | null): string[] => {
        if (Array.isArray(val)) {
            return val;
        }
        if (typeof val === "string") {
            return [val];
        }
        return [];
    };

    const [value, setValue] = useState<string[]>(normalizeValue(initialValue));

    const { data, isLoading } = useGetLanguageListQuery(undefined);

    const options =
        isLoading || !Array.isArray(data)
            ? []
            : data
                .filter((stack) => stack.id && stack.name)
                .map((stack) => ({
                    value: stack.id!,
                    label: stack.name!
                }));

    useEffect(() => {
        setValue(normalizeValue(initialValue));
    }, [initialValue]);

    const handleChange = (val: string[]) => {
        setValue(val);
        onChangeValue(val);
    };

    return (
        <MultiSelect
            id={`filter-${id}`}
            placeholder={isLoading ? "Загрузка..." : "Выберите язык программирования"}
            value={value ?? []}
            onChange={handleChange}
            data={options}
            clearable
            searchable
            disabled={isLoading}
        />
    );
}

export function FilterTrueFalseNull({ id, onChangeValue }: { id: string; onChangeValue: (val: string | null) => void; }) {
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
    const [value, setValue] = useState<string | null>(initialValue ?? "false");

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
            data={[{ value: "true", label: "Да" }, { value: "false", label: "Нет" }]}
        />
    );
}

export function FilterUserRole({ id, onChangeValue, initialValue  }: { id: string; onChangeValue: (val: string | null) => void; initialValue?: string | null;  }) {
    const [value, setValue] = useState<string | null>(initialValue || null);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setValue(initialValue || null);
    }, [initialValue]);

    useEffect(() => {
        setTimeout(() => {
            setData([
                //{ value: "ADMIN", label: "Админ" },
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

export function FilterStackName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

export function FilterGroupName({ id, onChangeValue }: { id: string; onChangeValue: (val: string) => void; }) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Номер потока"
            value={value}
            onChange={handleChange}
        />
    );
}

export function FilterUserName({ 
    id, 
    onChangeValue, 
    initialValue = "" 
}: { 
    id: string; 
    initialValue?: string | null; 
    onChangeValue: (val: string | null) => void; 
}) {
    const [value, setValue] = useState(initialValue || "");

    useEffect(() => {
        setValue(initialValue || "");
    }, [initialValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        onChangeValue(val || null);
    };

    return (
        <TextInput
            id={`filter-${id}`}
            placeholder="Введите ФИО"
            value={value}
            onChange={handleChange}
        />
    );
}
