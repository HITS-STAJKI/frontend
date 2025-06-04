import { Button } from "@mantine/core"
import { TrashSvgrepoCom } from "assets/icons"

type ReportIdProps = {
    id: string
}

export const ReportDelete = ({ id }: ReportIdProps) => {

    const handleEdit = (close: () => void) => {
        close()
    }

    return (
        <Button color="red" onClick={() => open()} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
            <span style={{ fontSize: '2em' }}>
                <TrashSvgrepoCom />
            </span>
        </Button>
    )
}