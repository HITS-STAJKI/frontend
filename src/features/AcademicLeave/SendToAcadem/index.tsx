import { Button } from "@mantine/core"
import { UserProfileType } from "shared/lib"
import { Modal } from "shared/ui"

type SendToAcademProps = {
    user: UserProfileType
}

export const SendToAcadem = ({ user }: SendToAcademProps) => {
    //добавить запрос
    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите отправить студента ${user.fullName} в академ?`}
            render={open => <Button onClick={() => open()} color="red">{'Отправить в академ'}</Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Отправить в академ'}</Button>}
        />
    )
}