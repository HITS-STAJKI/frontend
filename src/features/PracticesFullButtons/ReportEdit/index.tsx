import { Button } from "@mantine/core"
import { PencilSvgrepoCom } from "assets/icons"

type ReportIdProps = {
    id: string
}

export const ReportEdit = ({ id }: ReportIdProps) => {

    const handleEdit = (close: () => void) => {
        close()
    }

    return (
        <Button color="gray" onClick={() => open()} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
            <span style={{ fontSize: '2em' }}>
                <PencilSvgrepoCom />
            </span>
        </Button>
    )
}