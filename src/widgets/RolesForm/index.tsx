import { Button, Flex, TextInput, Menu, Select, SelectProps, Title, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { UserList } from "shared/lib/api/entities/User";
import { UserCard } from "entity/UserCard";
import { UserRole } from "services/api/api-client.types";
import { useGetUserListQuery } from "services/api/api-client/UserQuery";
import { forwardRef, useMemo, useState } from "react";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery";
import { useCreateStudentMutation } from "services/api/api-client/StudentQuery";
import { useCreateCuratorMutation } from "services/api/api-client/CuratorQuery";
import { useCreateDeanMutation } from "services/api/api-client/DeanQuery";
import { useCreateTeacherMutation } from "services/api/api-client/TeacherQuery";
import { useCreateProgramLeadMutation } from "services/api/api-client/Educational_program_leadQuery";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFactory } from "services/api";


export function RoleDropdown() {
    const [type, setType] = useState<'STUDENT' | 'TEACHER' | 'CURATOR' | 'DEAN' | 'EDUCATIONALPROGRAMLEAD' | undefined>(undefined)
    return (
        <>
            <Menu position="left-start">
                <Menu.Target>
                    <Button>Добавить роль пользователю</Button>
                </Menu.Target>
                <Menu.Dropdown style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 0 }}>
                    <Menu.Item onClick={() => setType('STUDENT')}>Студент</Menu.Item>
                    <Menu.Item onClick={() => setType('DEAN')}>Деканат</Menu.Item>
                    <Menu.Item onClick={() => setType('TEACHER')}>Преподаватель</Menu.Item>
                    <Menu.Item onClick={() => setType('CURATOR')}>Куратор</Menu.Item>
                    <Menu.Item onClick={() => setType('EDUCATIONALPROGRAMLEAD')}>Руководитель образовательной программы</Menu.Item>
                </Menu.Dropdown>

            </Menu>
            <Modal opened={!!type} onClose={() => setType(undefined)}>
                <AddUserRoleForm type={type} returnFn={() => setType(undefined)} />
            </Modal>
        </>
    );
}

const UserSelect = forwardRef<HTMLInputElement, SelectProps>(({ ...props }, ref) => {
    const [name, setName] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const { data } = useGetUserListQuery(name, undefined, 0, 100000)
    const studentsOptions = useMemo(() => {
        return data?.items?.map(student => ({
            value: student.id!,
            label: `${student?.fullName || 'Неизвестный студент'}`,
        })) || [];
    }, [data]);
    return <Select searchValue={name}
        searchable ref={ref} data={studentsOptions}
        clearable
        onSearchChange={setName}
        value={selectedStudentId}
        onChange={setSelectedStudentId} {...props} />
})

type AddUserRoleForm = {
    groupId?: string
    companyId?: string
    userId?: string
}

const AddUserRoleForm = ({ type, returnFn }: { type?: 'STUDENT' | 'TEACHER' | 'CURATOR' | 'DEAN' | 'EDUCATIONALPROGRAMLEAD', returnFn: () => void }) => {
    const form = useForm<AddUserRoleForm>()
    const { data } = type === 'STUDENT' ? useGetGroupsQuery(undefined, undefined, 0, 1000000000) : useGetPartnersQuery(undefined, undefined, undefined, 0, 100000)
    const { mutateAsync: mutateStudent } = useCreateStudentMutation(form.getValues().userId || '')
    const { mutateAsync: mutateDean } = useCreateDeanMutation()
    const { mutateAsync: mutateCurator } = useCreateCuratorMutation()
    const { mutateAsync: mutateTeacher } = useCreateTeacherMutation()
    const { mutateAsync: mutateLead } = useCreateProgramLeadMutation()
    const { refetch } = useGetUserListQuery()
    const queryClient = useQueryClient()
    const onSubmit = async (vals: AddUserRoleForm) => {
        switch (type) {
            case 'STUDENT':
                await mutateStudent({ groupId: vals.groupId! }).then(() => {
                    returnFn()
                })
                break
            case 'TEACHER':
                await mutateTeacher({ userId: vals.userId! }).then(() => {
                    returnFn()
                })
                break
            case 'CURATOR':
                await mutateCurator({ companyId: vals.companyId!, userId: vals.userId! }).then(() => {
                    returnFn()
                })
                break
            case 'DEAN':
                await mutateDean({ userId: vals.userId! }).then(() => {
                    returnFn()
                })
                break
            case 'EDUCATIONALPROGRAMLEAD':
                await mutateLead({ userId: vals.userId! }).then(() => {
                    returnFn()
                })
                break
        }
        await queryClient.invalidateQueries({
            queryKey: QueryFactory.UserQuery.getUserListQueryKey().slice(-1, 0)
        })

    }
    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(onSubmit)}>
            <Title>Выдать пользователю роль: {type === 'STUDENT' ? 'студент' : type === 'CURATOR' ? 'куратор' : type === 'DEAN' ? 'декан' : type === 'TEACHER' ? 'преподаватель' : 'руководитель образовательной программы'}</Title>
            <UserSelect key={form.key('userId')} {...form.getInputProps('userId')} label={'Пользователь'} />
            {type === 'STUDENT' ? (
                <Select searchable key={form.key('groupId')} {...form.getInputProps('groupId')} data={data?.items?.map(item => {
                    return { value: item.id!, label: item.number! }
                }) || []} label={'Поток'} />
            ) :
                type === 'CURATOR' ? (
                    <Select searchable key={form.key('companyId')} {...form.getInputProps('companyId')} data={data?.items?.map(item => {
                        return { value: item.id!, label: item.name }
                    }) || []} label={'Компания'} />
                ) : <></>}
            <Button type='submit'>Выдать роль</Button>
        </form>
    )
}



export function SearchRolesForm({ onSearch, initialValues }: {
    onSearch: (values: {
        name?: string;
        role?: UserRole;
    }) => void;
    initialValues?: {
        name?: string;
        role?: UserRole;
    };
}) {
    const form = useForm({
        initialValues: {
            name: initialValues?.name || '',
            role: initialValues?.role || undefined as UserRole | undefined,
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


export function UsersList({ items, pagination, size }: UserList & {size: number}) {

    return (
        <Flex wrap="wrap" gap="md" mt="lg" style={{ width: '100%' }}>
            {items.map((user, localIndex) => {
                const globalIndex = ((pagination?.currentPage ?? 1)) * (size) + localIndex;
                return <UserCard
                    key={user.id}
                    user={user}
                    number={globalIndex + 1}
                />
            })}
        </Flex>
    );
};