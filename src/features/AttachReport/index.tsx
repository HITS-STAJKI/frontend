import { Button } from "@mantine/core"
import { ReportOpenModal } from "features/PracticesFullButtons"
import { useState } from "react"

export const AttachReport = ({ practiceId, studentId }: { practiceId: string, studentId: string }) => {
    const [opened, setOpened] = useState<boolean>(false)
    return (
        <>
            <Button variant='outline' onClick={() => setOpened(true)}>
                Прикрепить отчет
            </Button>
            <ReportOpenModal practiceId={practiceId} studentId={studentId} opened={opened} onClose={() => setOpened(false)} />
        </>
    )
}