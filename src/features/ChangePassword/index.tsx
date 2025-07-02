import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { ChangePasswordForm } from "./form";

export const ChangePassword = ({ onRefresh }: { onRefresh?: () => void; }) => {
    return (
        <Modal
            render={open =><Button onClick={() => open()} color="gray">{'Изменить пароль'}</Button>}
            content={({ close }) => <ChangePasswordForm onSuccess={() => {onRefresh?.(); close();}} />}
            title={'Изменение пароля'}
        />
    )
}