import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { CreateGroupForm } from "./form";

export const CreateGroup = () => {
    return (
        <Modal
            render={open => <Button onClick={() => open()}>{'Создать поток'}</Button>}
            content={({ close }) => <CreateGroupForm onSuccess={() => close()} />}
            title={'Создать поток'}
        />
    )
}