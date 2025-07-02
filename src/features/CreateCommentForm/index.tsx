import { Button, Flex, Group, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useSendMessageMutation } from "services/api/api-client/Messages_in_chatQuery"
import { InterviewsCommentCreate } from "shared/lib"

type CreateCommentFormProps = {
    id: string;
    onMessageSent?: () => void;
};

export const CreateCommentForm = ({ id, onMessageSent }: CreateCommentFormProps) => {
    const form = useForm<InterviewsCommentCreate>({
        initialValues: 
        {
            content: ''
        },
        validate: 
        {
            content: (value) => (value.trim().length === 0 ? 'Введите сообщение' : null)
        }
    });

    const sendMutation = useSendMessageMutation(id, {
        onSuccess: () => {
            form.reset();
            onMessageSent?.();
        }
    });

    const onSubmitHandler = (vals: InterviewsCommentCreate) => {
        sendMutation.mutate(vals);
    };

    return (
        <form style={{ width: '100%' }} onSubmit={form.onSubmit(onSubmitHandler)}>
            <Flex w="100%" align="end" justify="center" direction="column" gap="sm">
                <Textarea w="100%" autosize minRows={2} maxRows={4} placeholder="Введите сообщение" {...form.getInputProps('content')} />
                <Group>
                    <Button type="submit" disabled={!form.values.content.trim()} >
                        Отправить
                    </Button>
                </Group>
            </Flex>
        </form>
    );
};