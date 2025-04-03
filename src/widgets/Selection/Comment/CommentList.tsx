import { Flex } from "@mantine/core";
import { InterviewsCommentPage } from "shared/lib";
import { CommentCard } from "entity/CommentCard";


export function CommentList({ content }: ( InterviewsCommentPage )) {
    return (
        <Flex wrap="wrap" style={{ width: '100%' }}>
            {content.map(comment => (
                <CommentCard key={comment.id} 
                id={comment.id} 
                content={comment.content} 
                createdAt={comment.createdAt} 
                modifiedAt={comment.modifiedAt} 
                author={comment.author}/>
            ))}
        </Flex>
    );
};