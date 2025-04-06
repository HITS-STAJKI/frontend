import { Button } from "@mantine/core";
import { Modal } from "shared/ui";
import { CreateEditSelectionForm } from "features/Selection/CreateEditSelectionForm";
import { PencilSvgrepoCom } from "assets/icons";

interface CreateEditSelectionProps {
    type: 'create' | 'edit';
}

export function CreateEditSelection({ type }: CreateEditSelectionProps) {
    return (
        <Modal
            render={open => <Button onClick={() => open()} style={{ padding: '0', 
                minWidth: type === 'create' ? '9rem' : 'null', 
                aspectRatio: type === 'edit' ? '1 / 1' : ''}}>{type === 'create' ? "Создать отбор" : <PencilSvgrepoCom fontSize={'30'}/>}</Button>}
            content={({ close }) => (
                <CreateEditSelectionForm
                    onSuccess={() => close()}
                    type={type}
                />
            )}
            title={type === 'create' ? "Создать отбор" : "Редактировать отбор"}
        />
    );
}