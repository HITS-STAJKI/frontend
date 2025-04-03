import { Flex, Textarea, Button  } from "@mantine/core";
import { useState } from 'react';


export const CreateCommentForm = () => {
    const [newComment, setNewComment] = useState('');

    const CreateComment = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Новый комментарий:', newComment);
        setNewComment('');
    };

    return(
        <form onSubmit={CreateComment} style={{ marginTop: '10px' }}>
        <Flex align="center">
            <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
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