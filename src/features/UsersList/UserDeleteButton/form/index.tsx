import { Button, Flex, Select, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQueryClient } from "@tanstack/react-query";
import { QueryFactory } from "services/api";
import { RoleDtoUserRole, UserDto } from "services/api/api-client.types";
import { useDeleteUserRoleMutation, useDeleteUserRoleMutationWithParameters } from "services/api/api-client/RoleQuery"
import { User } from "shared/lib";

  
  export const DeleteRoleForm = ({ user, onSuccess }: {user: UserDto} & {onSuccess: () => void;}) => {
    const queryClient = useQueryClient();
  
    const form = useForm({
      initialValues: {
        roleId: '',
      },
      validate: {
        roleId: (value: string) => (!value ? 'Выберите роль для удаления' : null),
      },
    });
  
    
    const { mutateAsync: deleteRole, isPending } = useDeleteUserRoleMutationWithParameters({
        onSuccess: () => {
          
          queryClient.invalidateQueries({
            queryKey: QueryFactory.UserQuery.getUserListQueryKey()
          });
          onSuccess();
        },
      });
  
    const handleSubmit = async (values: { roleId: string }) => {
      await deleteRole({
        roleId: values.roleId,
        userId: user.id as string,
      });
    };
  
    const roleLabels: Record<string, string> = {
        ADMIN: "Админ",
        DEAN: "Деканат",
        CURATOR: "Куратор",
        STUDENT: "Студент",
        TEACHER: "Преподаватель",
        EDUCATIONAL_PROGRAM_LEAD: "Руководитель образовательной программы",
      };
      

    const rolesOptions = user.roles?.map((role) => {
        const userRole = role.userRole;
        return {
            value: role.id,
            label: userRole ? roleLabels[userRole] || userRole : "Неизвестная роль", 
        }
        
    });

    const filteredRolesOptions = rolesOptions?.filter(role => role.label !== undefined).map(role => ({
        value: role.value,
        label: role.label as string,
      })) || [];
  
    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          <Text>Пользователь: {user.fullName} </Text>
          
          <Select
            label="Выберите роль для удаления"
            placeholder="Роль"
            data={filteredRolesOptions}
            {...form.getInputProps('roleId')}
          />
          
          <Button 
            color="red" 
            type="submit"
            disabled={!form.values.roleId || isPending}
            loading={isPending}
          >
            Удалить роль
          </Button>
        </Flex>
      </form>
    );
  };