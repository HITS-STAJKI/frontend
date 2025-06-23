import { Button, Center, Loader, Modal, Text, Card, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { ArchiveSvgrepoCom } from "assets/icons"
import { useArchiveStudentPracticeMutation } from "services/api/api-client/PracticeQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

type ReportIdProps = {
    id: string;
};

export const ReportArchive = ({ id, onSuccess }: ReportIdProps & { onSuccess?: () => void }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const { mutate, isPending, isError, error, isSuccess, reset } = useArchiveStudentPracticeMutation(id, {
        onSuccess: () => {
            onSuccess?.();
        },
    });

    const handleConfirm = () => {
        mutate();
    };

    return (
        <>
            <Tooltip label="Заархивировать практику практику" withArrow position="top">
                <Button color="yellow" onClick={open} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }} >
                    <span style={{ fontSize: '2em' }}>
                        <ArchiveSvgrepoCom />
                    </span>
                </Button>
            </Tooltip>

            <Modal opened={opened} onClose={() => { reset(); close(); }} centered title={<Text size="lg" fw={700}>Подтверждение архивирования</Text>}>
                {isPending ? (
                    <Center mt="md">
                        <Loader />
                    </Center>
                ) : isError ? (
                    <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                        <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                            Ошибка: {getErrorMessage(error)}
                        </Text>
                    </Card>
                ) : isSuccess ? (
                    <Card mt="md" p="md" style={{ width: '100%' }}>
                        <Text size="sm" style={{ textAlign: 'center' }}>
                            Практика успешно архивирована
                        </Text>
                    </Card>
                ) : (
                    <>
                        <Text mb="md">Вы уверены, что хотите заархивировать эту практику?</Text>
                        <Button color="red" fullWidth onClick={handleConfirm}>
                            Заархивировать
                        </Button>
                    </>
                )}
            </Modal>
        </>
    );
};