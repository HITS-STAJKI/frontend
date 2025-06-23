import { CommentList } from "widgets/Selection/Comment/CommentList";
import { Text, Accordion, Container } from "@mantine/core";
import { GET_INTERVIEWS_COMMENTS } from "shared/lib/api/stubs";
import { CreateCommentForm } from 'features'

export const SelectionComments = ({ }: { id: string }) => {
    return (
        <Container fluid p={'0'}>
            <Accordion>
                <Accordion.Item value="comments">
                    <Accordion.Control px={'lg'}>
                        <Text size="xl">Комментарии:</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <hr />
                        <CommentList items={GET_INTERVIEWS_COMMENTS.items} pagination={GET_INTERVIEWS_COMMENTS.pagination} />
                        <CreateCommentForm />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};