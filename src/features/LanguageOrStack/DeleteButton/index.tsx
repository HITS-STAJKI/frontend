import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"

type DeleteLanguageOrStackProps = {
    id: string
    type: 'language' | 'stack'
}

export const DeleteLanguageOrStack = ({ id, type }: DeleteLanguageOrStackProps) => {

    const handleDelete = (close: () => void) => {
        if (type === 'language') {
            //удаляем по 1 типу
        }
        else {
            //удаляем по 2 типу
        }
        close()
    }

    return (
        <Modal
            render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom />
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
            title={'Вы уверены, что хотите удалить данный элемент?'}
        />

    )
}