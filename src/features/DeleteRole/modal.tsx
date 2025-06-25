import { Button, Modal } from "@mantine/core"
import { useDeleteUserRoleMutation } from "services/api/api-client/RoleQuery";
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery";

export const DeleteModal = ({ type, setType, userId }: {
    type?: {
        value: "student" | "teacher" | "curator" | "edpl" | "dean";
        label: string;
    }, setType: React.Dispatch<React.SetStateAction<{
        value: "student" | "teacher" | "curator" | "edpl" | "dean";
        label: string;
    } | undefined>>,
    userId: string
}) => {
    const { mutateAsync } = useDeleteUserRoleMutation(type?.label!, userId)
    const { refetch } = useGetUserByIdQuery(userId)
    const onClickHandler = () => {
        mutateAsync().then(() => {
            refetch()
        }).then(() => {
            setType(undefined)
        })
    }
    return (
        <Modal opened={!!type} onClose={() => setType(undefined)} title={'Удалить роль'}>
            <Button onClick={onClickHandler} color='red'>Удалить</Button>
        </Modal>
    )
}