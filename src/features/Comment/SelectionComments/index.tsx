import { CommentList } from "widgets/Selection/Comment";
import { Flex, Text} from "@mantine/core";
import { GET_INTERVIEWS_COMMENTS } from "shared/lib/api/stubs";
import { useState } from 'react';
import  { CreateCommentForm } from 'features'

export const SelectionComments = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleComments = () => {
        setIsOpen(prev => !prev);
    };
    
return (
    <div className="comment" style={{ width: '100%', margin: '1rem' }}>
        <Flex align="center" justify="space-between" onClick={toggleComments} style={{ cursor: 'pointer' }}>
            <Text size="xl">Комментарии:</Text>
            <span style={{ marginLeft: '5px', fontWeight: 'bold'}}>
                {isOpen ? '︿' : '﹀'}
            </span>
        </Flex>
        <Flex direction="column">
            <div className={`comment-list ${isOpen ? 'visible' : ''}`}>
            <hr/>
            {isOpen && (
                    <>
                        <CommentList content={GET_INTERVIEWS_COMMENTS.content} pagination={GET_INTERVIEWS_COMMENTS.pagination} />
                        <CreateCommentForm />
                    </>
                )}
            </div>
        </Flex>
    </div>
);
};