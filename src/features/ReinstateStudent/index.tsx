import { Button } from "@mantine/core"
import { Modal } from "shared/ui";
import { ReinstateStudentForm } from "./form";
import { UserDetailsDto } from "services/api/api-client.types";

export const ReinstateStudent = ({ user, onRefresh }: { user: UserDetailsDto, onRefresh?: () => void }) => {
    return (
        <Modal
            render={open => <Button onClick={() => open()} color="gray">{'Восстановить студента'}</Button>}
            content={({ close }) => <ReinstateStudentForm onSuccess={() => {onRefresh?.(); close();}} user={user} />}
            title={'Восстановить студента'}
        />
    )
}
