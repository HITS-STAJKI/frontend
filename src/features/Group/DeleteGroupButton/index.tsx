import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { GroupDto } from "services/api/api-client.types";

type DeleteGroupButtonProps = {
    group: GroupDto
}

export const DeleteGroupButton = ({ group }: DeleteGroupButtonProps) => {
    //добавить запрос
    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Modal
            title={`Вы уверены, что хотите удалить группу ${group.number}?`}
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
        />
    )
}