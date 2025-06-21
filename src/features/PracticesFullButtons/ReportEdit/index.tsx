import { Button, Center, Loader, Modal, Text, Notification, Select, Card, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { PencilSvgrepoCom } from "assets/icons"
import { useEffect, useState } from "react";
import { useUpdatePracticeMutation } from "services/api/api-client/PracticeQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";

type ReportIdProps = {
    id: string;
    initialValue?: boolean | null;
    onSuccess?: () => void;
};

export const ReportEdit = ({ id, initialValue = null, onSuccess }: ReportIdProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const initialStringValue = initialValue === null ? null : initialValue ? 'true' : 'false';
    const [value, setValue] = useState<string | null>(initialStringValue);

    const { mutate, isPending, isError, error, isSuccess, reset } = useUpdatePracticeMutation(id, {
        onSuccess: () => {
            onSuccess?.();
        },
    });

    const handleOpen = () => {
        setValue(initialStringValue);
        open();
    };

    useEffect(() => {
        if (isSuccess) 
        {
            close();
            reset();
            setValue(null);
        }
    }, [isSuccess, close, reset]);

    const handleEdit = () => {
        if (value === null) 
        {
            return;
        }
        mutate({
            isPaid: value === 'true',
        });
    };

    return (
        <>
            <Tooltip label="Изменить информацию о практике" withArrow position="top">
                <Button color="gray" onClick={handleOpen} size="sm" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                    <span style={{ fontSize: '2em' }}>
                        <PencilSvgrepoCom />
                    </span>
                </Button>
            </Tooltip>

            <Modal opened={opened} onClose={() => { reset(); close(); }} centered title={<Text size="lg" fw={700}>Изменить оплачиваемость</Text>} >
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
                            Практика успешно обновлена
                        </Text>
                    </Card>
                ) : (
                    <>
                        <Text mb="sm">Выберите новое значение:</Text>
                        <Select
                            data={[
                                { value: 'true', label: 'Да' },
                                { value: 'false', label: 'Нет' },
                            ]}
                            placeholder="Выберите значение"
                            value={value}
                            onChange={setValue}
                            mb="md"
                        />
                        <Button onClick={handleEdit} fullWidth disabled={value === null}>
                            Сохранить
                        </Button>
                    </>
                )}
            </Modal>
        </>
    );
};
