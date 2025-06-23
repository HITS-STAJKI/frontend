//@ts-nocheck
import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"

type UserIdProps = {
    id: string
}

export const DeleteUserButton = ({ id }: UserIdProps) => {

    const handleDelete = (close: () => void) => {
        close()
    }

    return (
        <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}><TrashSvgrepoCom /></Button>

    )
}