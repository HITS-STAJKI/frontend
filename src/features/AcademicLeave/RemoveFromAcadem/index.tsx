import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { RemoveFromAcademForm } from "./form";

export const RemoveFromAcadem = () => {
    return (
        <Modal
            render={open =><Button onClick={() => open()} color="gray">{'Вернуть из академа'}</Button>}
            content={({ close }) => <RemoveFromAcademForm onSuccess={() => close()} />}
            title={'Вернуть из академа'}
        />
    )
}
