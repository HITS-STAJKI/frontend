import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"
import { Modal } from "shared/ui"

type UserIdProps = {
    id: string
}

export const EditUserButton = ({ id }: UserIdProps) => {

    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}><TrashSvgrepoCom /></Button>

    )
}