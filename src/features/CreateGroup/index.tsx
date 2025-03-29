import { Button } from "@mantine/core"
import { useState } from 'react';
import { GroupCreate } from "shared/lib";
import { CreateGroupModal } from "shared/ui/modals/CreateGroupModal";

export const CreateGroup = () => {

    const [createModalOpened, setCreateModalOpened] = useState(false);

    const handleCreateOpen = () => setCreateModalOpened(true);
    const handleCreateClose = () => setCreateModalOpened(false);

    const handleCreate = (newNumber: string) => {
        const body: GroupCreate = {
            number: newNumber
        }
        // TODO Логика создания группы
        console.log("Тело запроса", body);
    };

    return (
        <div>
            <Button onClick={handleCreateOpen}>Создать группу</Button>

            <CreateGroupModal
                opened={createModalOpened}
                onClose={handleCreateClose}
                onCreate={handleCreate}
            />
        </div>
    )
}