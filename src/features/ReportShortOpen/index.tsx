import { useState } from "react";
import { Button } from "@mantine/core";
import { ReportOpenModal } from "features/PracticesFullButtons";

type ReportIdProps = {
    id: string;
    studentId: string;
    isApproved: boolean; 
    isReportAttached: boolean;
};

export const ReportShortOpen = ({ id, studentId, isApproved, isReportAttached }: ReportIdProps) => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            {/* {renderOpenButton()} */}
            <Button variant='light' size="sm" onClick={() => setOpened(true)}>
                Посмотреть отчет
            </Button>

            {id && (<ReportOpenModal practiceId={id} studentId={studentId} opened={opened} onClose={() => setOpened(false)} isApproved={isApproved} isReportAttached={isReportAttached}/>)}
        </>
    );
};
