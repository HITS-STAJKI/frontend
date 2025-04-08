import { Button } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateSelectionForm, EditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom, TrashSvgrepoCom } from "assets/icons";


export function CreateSelection({ id }: { id : string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                minWidth: '9rem'}}>{"Создать отбор"}</Button>}
            content={({ close }) => (
                <CreateSelectionForm
                    onSuccess={() => close()}
                    id={id}
                />
            )}
            title={"Создать отбор"}
        />
    );
}

export function EditSelection({ id }: { id : string }) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                aspectRatio: '1 / 1', marginInline: '10px' }}>{<PencilSvgrepoCom fontSize={'30'}/>}</Button>}
            content={({ close }) => (
                <EditSelectionForm
                    onSuccess={() => close()}
                    id={id}
                />
            )}
            title={"Редактировать отбор"}
        />
    );
}

export const DeleteSelection = ({ id }: { id : string }) => {

    const handleDelete = (close: () => void) => {
        console.log(`Тело запроса удаления ${id}:`);
        close()
    }
    return (
        <Modal
            render={open => <Button color="red" onClick={() => open()} style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <TrashSvgrepoCom fontSize={'27'}/>
            </Button>}
            content={({ close }) => <Button onClick={() => handleDelete(close)} color='red'>{'Удалить'}</Button>}
            title={'Вы уверены, что хотите удалить данный отбор?'}
        />

    )
}