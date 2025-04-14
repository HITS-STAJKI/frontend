import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"

type UserIdProps = {
    id: string
}

export const EditUserButton = ({ id }: UserIdProps) => {

    const handleEdit = (close: () => void) => {
        close()
    }

    return (
        <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}><PencilSvgrepoCom /></Button>

    )
}