import { Button, Flex, TextInput } from "@mantine/core";
import { LanguagePage, StackPage } from "../../shared/lib/api/entities";
import { LanguageStackCard } from "entity";
import { CreateLanguageOrStackForm } from "features";
import { Modal } from "shared/ui";


interface SearchFormProps {
    type: 'language' | 'stack'; // что создавать
}

export function SearchForm({ type }: SearchFormProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <TextInput
                placeholder={type === 'language' ? "Поиск языка..." : "Поиск стека..."}
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

export function LanguageList({ content, type }: (LanguagePage | StackPage) & { type: 'language' | 'stack' }) {
    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            {content.map(card => (
                <LanguageStackCard key={card.id} type={type} id={card.id} name={card.name} />
            ))}
        </Flex>
    );
};




