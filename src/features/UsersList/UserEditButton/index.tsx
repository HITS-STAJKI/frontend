import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"
import { useNavigate } from "react-router-dom"

type UserIdProps = {
    id: string
}

export const EditUserButton = ({ id }: UserIdProps) => {
    const navigate = useNavigate()
    return (
        <Button color="gray" onClick={() => navigate(`/profile/${id}`)} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}><PencilSvgrepoCom /></Button>
    )
}