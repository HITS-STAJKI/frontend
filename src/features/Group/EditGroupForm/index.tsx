import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"
import { EditGroupForm } from "./form"
import { Group } from "shared/lib"

type EditGroupButtonProps = {
    group: Group
} 

export const EditGroupButton = ({ group }: EditGroupButtonProps) => {

    return (
        <Modal
            render={open => <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                <PencilSvgrepoCom />
            </Button>}
            content={({ close }) => <EditGroupForm group={group} onSuccess={() => close()} />}
            title={'Редактировать группу'}
        />

    )
}