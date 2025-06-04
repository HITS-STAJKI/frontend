import { Button } from "@mantine/core"
import { ArchiveSvgrepoCom } from "assets/icons"

type ReportIdProps = {
    id: string
}

export const ReportArchive = ({ id }: ReportIdProps) => {

    const handleEdit = (close: () => void) => {
        close()
    }

    return (
        <Button color="yellow" onClick={() => open()} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
            <span style={{ fontSize: '2em' }}>
                <ArchiveSvgrepoCom />
            </span>
        </Button>
    )
}