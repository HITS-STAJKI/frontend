import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { RemoveFromAcademForm } from "./form";
import { UserDetailsDto } from "services/api/api-client.types";

export const RemoveFromAcadem = ({ user }: { user: UserDetailsDto }) => {
    return (
        <Modal
            render={open => <Button onClick={() => open()} color="gray">{'Вернуть из академа'}</Button>}
            content={({ close }) => <RemoveFromAcademForm onSuccess={() => close()} user={user} />}
            title={'Вернуть из академа'}
        />
    )
}
