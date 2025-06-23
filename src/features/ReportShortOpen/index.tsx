import { useState } from "react";
import { Button } from "@mantine/core";
import { ReportOpenModal } from "features/PracticesFullButtons";

type ReportIdProps = {
    id: string;
    studentId: string;
};

export const ReportShortOpen = ({ id, studentId }: ReportIdProps) => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            {/* {renderOpenButton()} */}
            <Button variant='light' size="sm" onClick={() => setOpened(true)}>
                Посмотреть отчет
            </Button>

            {id && (<ReportOpenModal practiceId={id} studentId={studentId} opened={opened} onClose={() => setOpened(false)} />)}
        </>
    );
};
