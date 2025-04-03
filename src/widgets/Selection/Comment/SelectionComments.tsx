import { CommentList } from "widgets/Selection/Comment/CommentList";
import { Flex, Text, Accordion} from "@mantine/core";
import { GET_INTERVIEWS_COMMENTS } from "shared/lib/api/stubs";
import  { CreateCommentForm } from 'features'

export const SelectionComments = () => {
return (
    <div className="comment" style={{ width: '100%', margin: '1rem' }}>
        <Accordion>
            <Accordion.Item value="comments">
                <Accordion.Control>
                    <Text size="xl">Комментарии:</Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <hr />
                    <CommentList content={GET_INTERVIEWS_COMMENTS.content} pagination={GET_INTERVIEWS_COMMENTS.pagination} />
                    <CreateCommentForm />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    </div>
);
};