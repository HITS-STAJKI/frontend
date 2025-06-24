//@ts-nocheck
import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from "shared/ui"
import { DeleteRoleForm } from "./form"
import { RoleDtoUserRole, UserDto } from "services/api/api-client.types"
import { User } from "shared/lib"

export const DeleteUserButton = ({ user }: {user: UserDto}) => {

    // const queryClient = useQueryClient();
    // const { mutateAsync:  } = useDelete(id);

    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        

        <Modal
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <DeleteRoleForm 
            user={user} 
            onSuccess={close} 
          />}
            title={'Удаление роли пользователя'}
        />

    )
}