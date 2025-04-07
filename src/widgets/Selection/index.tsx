import { Button } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateSelectionForm, EditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom } from "assets/icons";


export function CreateSelection() {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                minWidth: '9rem'}}>{"Создать отбор"}</Button>}
            content={({ close }) => (
                <CreateSelectionForm
                    onSuccess={() => close()}
                />
            )}
            title={"Создать отбор"}
        />
    );
}

export function EditSelection() {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                aspectRatio: '1 / 1'}}>{<PencilSvgrepoCom fontSize={'30'}/>}</Button>}
            content={({ close }) => (
                <EditSelectionForm
                    onSuccess={() => close()}
                />
            )}
            title={"Редактировать отбор"}
        />
    );
}