import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { CreatePartnerForm } from "./form";

export const CreatePartner = () => {
    return (
        <Modal
            render={open => <Button onClick={() => open()}>{'Создать компанию'}</Button>}
            content={({ close }) => <CreatePartnerForm onSuccess={() => close()} />}
            title={'Создать компанию'}
        />
    )
}