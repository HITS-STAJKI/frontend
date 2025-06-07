import { Flex, Textarea, Button  } from "@mantine/core";

export const CreateCommentForm = () => {

    const CreateComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Новый комментарий:', e.currentTarget.comment.value);
        e.currentTarget.reset();
    };

    return(
        <form onSubmit={CreateComment} style={{ marginTop: '10px' }}>
        <Flex align="center">
            <Textarea
                name="comment"
                placeholder="Комментарий"
                style={{ marginBottom: '10px', flex: 1 }}
                minRows={4}
            />
        </Flex>
        <Flex justify="flex-end">
                <Button type="submit" style={{ fontWeight: 'normal' }}>Отправить</Button>
            </Flex>
    </form>
    )
}