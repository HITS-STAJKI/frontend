import { useEffect, useState } from "react";
import { Button, Container, Space, Stack, Title, Group, Flex } from "@mantine/core";
import { Modal } from '@mantine/core';

import { Comment } from "entity";
import { GET_INTERVIEWS_COMMENTS, InterviewsComment } from "shared/lib";
import { CreateCommentForm } from "features/CreateCommentForm";
import { ReportOpenModal } from "features/PracticesFullButtons";
import { useGetPracticeReportQuery } from "services/api/api-client/Practice_reportsQuery";
import { downloadFileUrl } from "services/api/api-client/FilesQuery";

type ReportIdProps = {
    id: string;
    studentId: string;
};

export const ReportShortOpen = ({ id, studentId }: ReportIdProps) => {
    const [opened, setOpened] = useState(false);
    const [buttonState, setButtonState] = useState<'attach' | 'edit' | 'document'>();
    
    const { data: report, isLoading: reportLoading } = useGetPracticeReportQuery(id ?? '', {
        enabled: !!id,
    });

    useEffect(() => {
        if (id) 
        {
            // TODO: Сделать отображение кнопок от роли
            const states: ('attach' | 'edit' | 'document')[] = ['attach', 'edit', 'document'];
            const randomState = states[Math.floor(Math.random() * states.length)];
            setButtonState(randomState);
        } 
        else 
        {
            setButtonState('attach');
        }
    }, [id]);

    const handleDownload = () => {
        if (report?.fileId) 
        {
            const url = downloadFileUrl(report.fileId);
            window.open(url, '_blank');
        }
    };

    const renderOpenButton = () => {
        if (!id) 
        {
            return (
                <Button color="green" size="sm" onClick={() => setOpened(true)}>
                    Прикрепить
                </Button>
            );
        }

        switch (buttonState) 
        {
            case 'attach':
                return (
                    <Button color="green" size="sm" onClick={() => setOpened(true)}>
                        Прикрепить
                    </Button>
                );
            case 'edit':
                return (
                    <Button variant="light" size="sm" onClick={() => setOpened(true)}>
                        Изменить
                    </Button>
                );
            case 'document':
                return (
                    <Button size="sm" variant="default" onClick={handleDownload} disabled={reportLoading || !report?.fileId}>
                        {reportLoading ? 'Загрузка...' : 'Документ'}
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderOpenButton()}

            {id && ( <ReportOpenModal practiceId={id} studentId={studentId} opened={opened} onClose={() => setOpened(false)} />)}
        </>
    );
};
