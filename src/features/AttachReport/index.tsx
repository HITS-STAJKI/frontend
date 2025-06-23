import { Button } from "@mantine/core"
import { ReportOpenModal } from "features/PracticesFullButtons"
import { useState } from "react"

export const AttachReport = ({ practiceId }: { practiceId: string }) => {
    const [opened, setOpened] = useState<boolean>(false)
    return (
        <>
            <Button variant='outline' onClick={() => setOpened(true)}>
                Прикрепить отчет
            </Button>
            <ReportOpenModal practiceId={practiceId} studentId={null} opened={opened} onClose={() => setOpened(false)} />
        </>
    )
}