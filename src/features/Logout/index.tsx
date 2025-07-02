import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { LOGIN_ROUTE } from "shared/lib"

export const Logout = () => {
    const navigate = useNavigate()
    return <Button color='indigo' onClick={() => {
        localStorage.clear()
        navigate(LOGIN_ROUTE)
    }}
    >
        Выйти
    </Button>
}