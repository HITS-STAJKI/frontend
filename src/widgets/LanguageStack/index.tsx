import { Button, Flex, TextInput, Text } from "@mantine/core";
import { LanguageStackCard } from "entity";
import { CreateLanguageOrStackForm } from "features";
import { Modal } from "shared/ui";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { LanguageDto, StackDto } from "services/api/api-client.types";


interface SearchFormProps {
    type: 'language' | 'stack'; // что создавать
    onSearch?: (query: string) => void;

}

export function SearchForm({ type, onSearch }: SearchFormProps) {

    const [searchValue, setSearchValue] = useState('');

    // Обработчик изменения ввода с debounce (чтобы не делать запрос на каждое нажатие)
    const handleSearchChange = useDebouncedCallback((value: string) => {
        onSearch?.(value);
    }, 300);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <TextInput
                placeholder={type === 'language' ? "Поиск языка..." : "Поиск стека..."}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    handleSearchChange(e.target.value);
                }}
            />
            <Modal
                render={open => <Button onClick={() => open()}>{type === 'language' ? 'Создать язык' : 'Создать стек'}</Button>}
                content={({ close }) => (
                    <CreateLanguageOrStackForm
                        type={type}
                        onSuccess={() => close()}
                    />
                )}
                title={type === 'language' ? "Создать язык" : "Создать стек"}
            />
        </div>
    );
}

export function LanguageList({ items, type, query }: { items: LanguageDto[] | StackDto[] } & { type: 'language' | 'stack' } & {query: string}) {
    return (
        <Flex direction="column" gap="md" mt="lg" style={{ width: '100%' }}>
            <Text style={{ marginBottom: '10px' }}>
                Найдено {type === 'language' ? 'языков' : 'стеков'}: {items.length}
            </Text>
            {items.map((item, index) => (
                <LanguageStackCard query={query} key={item.id} type={type} id={item.id} name={item.name} index={index} />
            ))}
        </Flex>
    );
};




