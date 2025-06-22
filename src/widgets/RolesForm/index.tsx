import { Button, Flex, TextInput, Menu, MultiSelect, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserList } from "shared/lib/api/entities/User";
import { UserCard } from "entity/UserCard";
import { CompanyPartnerDto, GroupDto, UserRole } from "services/api/api-client.types";


export function SearchRolesForm({ onSearch }: { onSearch: (values: {
    name?: string;
    role?: UserRole;
}) => void }) {
    const form = useForm({
        initialValues: {
            name: '',
            role: undefined as UserRole | undefined,
        },
    });

    const roles = [
        { value: "STUDENT", label: "Студент" },
        { value: "CURATOR", label: "Куратор" },
        { value: "DEAN", label: "Деканат" },
        { value: "TEACHER", label: "Преподаватель" },
        { value: "EDUCATIONAL_PROGRAM_LEAD", label: "Руководитель ОП" },
    ];

    function handleSearch(values: typeof form.values) {
        const searchParams: {
            name?: string;
            role?: UserRole;
        } = {};
        
        if (values.name.trim()) searchParams.name = values.name;
        if (values.role) searchParams.role = values.role;
        console.log("yyy")
        
        onSearch(searchParams);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <form onSubmit={form.onSubmit(handleSearch)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <TextInput label="Поиск по имени" placeholder="ФИО" {...form.getInputProps('name')} />
                    <Select 
                        data={roles}
                        value={form.values.role}
                        onChange={(value) => form.setFieldValue('role', 
                            value as UserRole | undefined
                        )}
                        label="Роль пользователя"
                        placeholder="Все роли"
                        clearable
                        style={{ width: "250px" }}
                    />
                    
                    <Button 
                        type="submit" 
                        style={{ marginBottom: "4px", height: "36px" }}
                    >
                        Поиск
                    </Button>
                </div>

                
            </form>
        </div>
    );
}


export function UsersList({ items, pagination }: UserList) {

    const currentPage = pagination.currentPage || 1; 
    const size = pagination.size || 10; 

    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            {items.map((user, index) => {
                const number = (currentPage - 1) * size + index + 1;
                return (
                    <UserCard 
                        key={user.id} 
                        id={user.id!} 
                        email={user.email!} 
                        fullname={user.fullName!} 
                        roles={user.roles!}
                        number={number} // Передаем номер в карточку
                    />
                );
            })}
        </Flex>
    );
};