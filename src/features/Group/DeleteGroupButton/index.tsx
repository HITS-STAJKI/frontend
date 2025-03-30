import { Button } from "@mantine/core"
import { Group } from "shared/lib"

type DeleteGroupButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    group: Group
}

export const DeleteGroupButton = ({ onClick, group }: DeleteGroupButtonProps) => {
    //добавить запрос
    const handleDelete = () => {
        // TODO Логика удаления группы
        console.log(`Группа ${group.number} удалена`);
    };

    return (
        <Button color='red' onClick={e => {
            handleDelete()
            onClick(e)
        }}>
            {'Удалить'}
        </Button>
    )
}