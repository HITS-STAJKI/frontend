import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { UserDto } from "services/api/api-client.types"
import { Modal } from "shared/ui"

type DeleteStudentFromGroupButtonProps = {
    student: UserDto
}

export const DeleteStudentFromGroupButton = ({ student }: DeleteStudentFromGroupButtonProps) => {
    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите удалить студента ${student.fullName} из данной группы?`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
        />
    )
}