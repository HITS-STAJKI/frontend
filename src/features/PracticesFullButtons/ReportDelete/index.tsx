import { Button, Center, Loader, Modal, Text, Card, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { TrashSvgrepoCom } from "assets/icons"

type ReportIdProps = {
    id: string
}

export const ReportDelete = ({ id }: ReportIdProps & { onSuccess?: () => void }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const isPending = false;
    const isError = false;
    const isSuccess = false;
    const reset = () => { };

    const handleConfirm = () => {
        console.log('Delete report with id:', id);
    };

    return (
        <>
            <Tooltip label="Удалить практику" withArrow position="top">
                <Button color="red" onClick={open} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                    <span style={{ fontSize: '2em' }}>
                        <TrashSvgrepoCom />
                    </span>
                </Button>
            </Tooltip>

            <Modal opened={opened} onClose={() => { reset(); close(); }} centered title={<Text size="lg" fw={700}> Подтверждение удаления </Text>} >
                {isPending ? (
                    <Center mt="md">
                        <Loader />
                    </Center>
                ) : isError ? (
                    <Card mt="md" p="md" style={{ backgroundColor: '#ffe6e6', borderRadius: 6, width: '100%' }}>
                        <Text color="red" size="sm" style={{ textAlign: 'center' }}>
                            Ошибка: {/* getErrorMessage(error) */}
                            Произошла ошибка при удалении
                        </Text>
                    </Card>
                ) : isSuccess ? (
                    <Card mt="md" p="md" style={{ width: '100%' }}>
                        <Text size="sm" style={{ textAlign: 'center' }}>
                            Практика успешно удалена
                        </Text>
                    </Card>
                ) : (
                    <>
                        <Text mb="md">Вы уверены, что хотите удалить эту практику?</Text>
                        <Button color="red" fullWidth onClick={handleConfirm}>
                            Удалить
                        </Button>
                    </>
                )}
            </Modal>
        </>
    );
};