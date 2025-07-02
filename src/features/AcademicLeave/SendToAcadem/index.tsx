import { Button } from "@mantine/core"
import { UserDetailsDto } from "services/api/api-client.types"
import { useSendStudentToAcademMutation } from "services/api/api-client/StudentQuery"
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery"
import { Modal } from "shared/ui"

type SendToAcademProps = {
    user: UserDetailsDto
}

export const SendToAcadem = ({ user }: SendToAcademProps) => {
    const { mutateAsync } = useSendStudentToAcademMutation(user.student?.id!)
    const { refetch } = useGetUserByIdQuery(user.id)
    //добавить запрос
    const handleDelete = (close: () => void) => {
        mutateAsync()
            .then(() => {
                refetch()
                close()
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Modal
            title={`Вы уверены, что хотите отправить студента ${user.fullName} в академ?`}
            render={open => <Button onClick={() => open()} color="red">{'Отправить в академ'}</Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Отправить в академ'}</Button>}
        />
    )
}