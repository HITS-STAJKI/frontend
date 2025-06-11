import { Avatar, Container, Flex, Group, MantineColor, Space, Stack, Text, Title } from "@mantine/core"
import { CreateCommentForm } from "features/CreateCommentForm"
import { dateFormatter, hashCode, InterviewsComment } from "shared/lib"

const AvatarColor: Array<MantineColor> = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'teal']

type CommentSectionProps = {
    comments: Array<InterviewsComment>
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
    return (
        <Container fluid>
            <Title order={3}>{"Комментарии"}</Title>
            <Space h='md' />
            <Stack>
                {comments.map(comment => {
                    return (
                        <Comment key={comment.id} {...comment} id={comment.id} />
                    )
                })}
            </Stack>
            <Space h='md' />
            <CreateCommentForm id={'some_id'} />
        </Container >
    )
}

export const Comment = ({ content, createdAt, modifiedAt, author, id }: InterviewsComment) => {
    return (
        <Group>
            <Flex align="flex-start" gap="sm">
                <Avatar color={AvatarColor[Math.abs(hashCode(id)) % AvatarColor.length]}>
                    {author.fullname[0].toUpperCase()}
                </Avatar>
                <Flex direction="column" style={{ maxWidth: '100%' }}>
                    <Group gap="xs">
                        <Text fw={500}>{author.fullname}</Text>
                        <Text c="gray" size="sm">
                            {dateFormatter(modifiedAt ?? createdAt)}
                        </Text>
                    </Group>
                    <Text style={{maxWidth: '100%', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-all', }}>{content}</Text>
                </Flex>
            </Flex>
        </Group>
    )
}