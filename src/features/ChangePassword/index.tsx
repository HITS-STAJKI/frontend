import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { ChangePasswordForm } from "./form";

export const ChangePassword = () => {
    return (
        <Modal
            render={open =><Button onClick={() => open()} color="gray">{'Изменить пароль'}</Button>}
            content={({ close }) => <ChangePasswordForm onSuccess={() => close()} />}
            title={'Изменение пароля'}
        />
    )
}