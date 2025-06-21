import { Button, Flex, TextInput, Menu, MultiSelect, Select, SelectProps, Title, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserList } from "shared/lib/api/entities/User";
import { UserCard } from "entity/UserCard";
import { CompanyPartnerDto, GroupDto } from "services/api/api-client.types";
import { useGetUserListQuery } from "services/api/api-client/UserQuery";
import { forwardRef, useState } from "react";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useCreateStudentMutation } from "services/api/api-client/StudentQuery";
import { useCreateCuratorMutation } from "services/api/api-client/CuratorQuery";
import { useCreateDeanMutation } from "services/api/api-client/DeanQuery";
import { useCreateTeacherMutation } from "services/api/api-client/TeacherQuery";


function RoleDropdown() {
    const [type, setType] = useState<'STUDENT' | 'TEACHER' | 'CURATOR' | 'DEAN' | undefined>(undefined)
    return (
        <>
            <Menu position="left-start">
                <Menu.Target>
                    <Button>Создать пользователя</Button>
                </Menu.Target>
                <Menu.Dropdown style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 0 }}>
                    <Menu.Item onClick={() => setType('STUDENT')}>Студент</Menu.Item>
                    <Menu.Item onClick={() => setType('DEAN')}>Деканат</Menu.Item>
                    <Menu.Item onClick={() => setType('TEACHER')}>Преподаватель</Menu.Item>
                    <Menu.Item onClick={() => setType('CURATOR')}>Куратор</Menu.Item>
                </Menu.Dropdown>

            </Menu>
            <Modal opened={!!type} onClose={() => setType(undefined)}>
                <AddUserRoleForm type={type} returnFn={() => setType(undefined)} />
            </Modal>
        </>
    );
}

const UserSelect = forwardRef<HTMLInputElement, SelectProps>(({ ...props }, ref) => {
    const { data } = useGetUserListQuery(undefined, undefined, 0, 10000000000000)
    return <Select ref={ref} data={data?.items?.map(item => {
        return { value: item.id!, label: item.fullName! }
    }) || []} {...props} />
})

type AddUserRoleForm = {
    groupId?: string
    companyId?: string
    userId?: string
}

const AddUserRoleForm = ({ type, returnFn }: { type?: 'STUDENT' | 'TEACHER' | 'CURATOR' | 'DEAN', returnFn: () => void }) => {
    const form = useForm<AddUserRoleForm>()
    const { data, isLoading } = type === 'STUDENT' ? useGetGroupsQuery(undefined, undefined, 0, 1000000000) : useGetPartnersQuery(undefined, undefined, undefined, 0, 10000000)
    const { mutateAsync: mutateStudent } = useCreateStudentMutation(form.getValues().userId || '')
    const { mutateAsync: mutateDean } = useCreateDeanMutation()
    const { mutateAsync: mutateCurator } = useCreateCuratorMutation()
    const { mutateAsync: mutateTeacher } = useCreateTeacherMutation()
    const { refetch } = useGetUserListQuery()
    const onSubmit = (vals: AddUserRoleForm) => {
        switch (type) {
            case 'STUDENT':
                mutateStudent({ groupId: vals.groupId! }).then(() => {
                    returnFn()
                }).then(() => {
                    refetch()
                })
                break
            case 'TEACHER':
                mutateTeacher({ userId: vals.userId! }).then(() => {
                    returnFn()
                }).then(() => {
                    refetch()
                })
                break
            case 'CURATOR':
                mutateCurator({ companyId: vals.companyId!, userId: vals.userId! }).then(() => {
                    returnFn()
                }).then(() => {
                    refetch()
                })
                break
            case 'DEAN':
                mutateDean({ userId: vals.userId! }).then(() => {
                    returnFn()
                })
                break
        }


    }
    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(onSubmit)}>
            <Title>Выдать пользователю роль: {type === 'STUDENT' ? 'студент' : type === 'CURATOR' ? 'куратор' : type === 'DEAN' ? 'декан' : 'преподаватель'}</Title>
            <UserSelect key={form.key('userId')} {...form.getInputProps('userId')} label={'Пользователь'} />
            {type === 'STUDENT' ? (
                <Select key={form.key('groupId')} {...form.getInputProps('groupId')} data={data?.items?.map(item => {
                    return { value: item.id!, label: item.number! }
                }) || []} label={'Группа'} />
            ) :
                type === 'CURATOR' ? (
                    <Select key={form.key('companyId')} {...form.getInputProps('companyId')} data={data?.items?.map(item => {
                        return { value: item.id!, label: item.name }
                    }) || []} label={'Компания'} />
                ) : <></>}
            <Button type='submit'>Выдать роль</Button>
        </form>
    )
}

export function SearchRolesForm({ groupContent, companyContent }: { groupContent: GroupDto[], companyContent: Pick<CompanyPartnerDto, 'id' | 'name'>[] }) {
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
                <RoleDropdown />
            </div>

            <form onSubmit={form.onSubmit(handleSearch)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <TextInput label="Поиск по имени" placeholder="ФИО" {...form.getInputProps('name')} />
                    <MultiSelect data={roles} {...form.getInputProps('roles')} label="Выберите роль" placeholder="Выберите роли" clearable />
                    <Button type="submit">Поиск</Button>
                </div>

                {form.values.roles.includes("student") && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <Select style={{ width: "50%" }} data={groups.map(el => {
                            return {
                                value: el.value!,
                                label: el.label!
                            }
                        })} {...form.getInputProps('selectedGroup')} label="Выберите группу" placeholder="Группы" clearable />
                        <Select style={{ width: "50%" }} data={companies} {...form.getInputProps('selectedStudentCompany')} label="Выберите компанию" placeholder="Компании" clearable />
                    </div>
                )}

                {form.values.roles.includes("curator") && (
                    <Select style={{ marginTop: "10px", width: "50%" }} data={companies} {...form.getInputProps('selectedCuratorCompany')} label="Выберите компанию" placeholder="Компании" clearable />
                )}
            </form>
        </div>
    );
}


export function UsersList({ items }: UserList) {
    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            {items.map(user => (
                <UserCard key={user.id} id={user.id!} email={user.email!} fullname={user.fullName!} roles={user.roles!} />
            ))}
        </Flex>
    );
};