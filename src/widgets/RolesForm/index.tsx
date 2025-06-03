import { Button, Flex, TextInput, Menu, MultiSelect, Select } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserList } from "shared/lib/api/entities/User";
import { Company, Group } from "shared/lib";
import { UserCard } from "entity/UserCard";


function RoleDropdown() {
    return (
        <Menu position="left-start">
            <Menu.Target>
                <Button>Создать пользователя</Button>
            </Menu.Target>
            <Menu.Dropdown style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 0}}>
                <Menu.Item onClick={() => console.log("Студент")}>Студент</Menu.Item>
                <Menu.Item onClick={() => console.log("Куратор")}>Куратор</Menu.Item>
                <Menu.Item onClick={() => console.log("Деканат")}>Деканат</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export function SearchRolesForm({ groupContent, companyContent }: { groupContent: Group[], companyContent: Pick<Company, 'id' | 'name'>[] }) {
    const form = useForm({
        initialValues: {
            name: '',
            roles: [] as ('student' | 'curator' | 'dean')[],
            selectedGroup: null,
            selectedStudentCompany: null,
            selectedCuratorCompany: null,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Имя слишком короткое' : null),
        },
    });

    const roles = [
        { value: "student", label: "Студент" },
        { value: "curator", label: "Куратор" },
        { value: "dean", label: "Деканат" }
    ];
    const groups = groupContent.map(group => ({ value: group.id, label: group.number }));
    const companies = companyContent.map(company => ({ value: company.id, label: company.name }));

    function handleSearch() {
        console.log("Поиск выполнен!");
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ alignSelf: "flex-end" }}>
                <RoleDropdown/>
            </div>

            <form onSubmit={form.onSubmit(handleSearch)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <TextInput label="Поиск по имени" placeholder="ФИО" {...form.getInputProps('name')} />
                    <MultiSelect data={roles} {...form.getInputProps('roles')} label="Выберите роль" placeholder="Выберите роли" clearable/>
                    <Button type="submit">Поиск</Button>
                </div>

                {form.values.roles.includes("student") && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Select style={{ width: "50%" }} data={groups} {...form.getInputProps('selectedGroup')} label="Выберите группу" placeholder="Группы" clearable/>
                        <Select style={{ width: "50%" }} data={companies} {...form.getInputProps('selectedStudentCompany')} label="Выберите компанию" placeholder="Компании" clearable/>
                    </div>
                )}

                {form.values.roles.includes("curator") && (
                    <Select style={{ marginTop: "10px", width: "50%" }} data={companies} {...form.getInputProps('selectedCuratorCompany')} label="Выберите компанию" placeholder="Компании" clearable/>
                )}
            </form>
        </div>
    );
}


export function UsersList({ content }: UserList) {
    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
                {content.map(user => (
                <UserCard key={user.id} id={user.id} email={user.email} fullname={user.fullname} roles={user.roles}/>
            ))}
        </Flex>
    );
};