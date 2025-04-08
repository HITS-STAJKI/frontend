import { Flex, Textarea, Button  } from "@mantine/core";
import { useForm } from "@mantine/form";

export const CreateCommentForm = () => {
    const form = useForm({
        initialValues: {
            comment: ''
        },
        validate: {
            comment: (value) => (value ? null : ' '),
        }
    });
    const handleSubmit = (values: { comment: string }) => {
        console.log('Новый комментарий:', values.comment);
        form.reset();
    };
    return (
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ marginTop: '10px' }}>
            <Flex align="center">
                <Textarea
                    {...form.getInputProps('comment')}
                    placeholder="Комментарий"
                    style={{ marginBottom: '10px', flex: 1 }}
                    minRows={4}
                />
            </Flex>
            <Flex justify="flex-end">
                <Button type="submit" style={{ fontWeight: 'normal' }}>Отправить</Button>
            </Flex>
        </form>
    );
};