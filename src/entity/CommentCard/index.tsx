import { Card, Flex, Avatar, Text } from "@mantine/core";
import { InterviewsComment } from "shared/lib";

export function CommentCard({ id, content, createdAt, modifiedAt, author }: InterviewsComment) {
    return (
        <Card className="" id={id} style={{ width: '100%', padding: '0.25vh', minHeight: '48px' }}>
            <Flex align="flex-start">
                {<Avatar color={getColorById(id)}>{/* author.avatar != null ? author.avatar :*/ author.fullName.toUpperCase()}</Avatar>}
                <div style={{ flex: 1, marginLeft: '10px' }}>
                    <Flex direction="column">
                        <Flex align="center">
                            <Text>{author.fullName}</Text>
                            <Text style={{ color: 'gray', fontSize: '0.8em', marginLeft: '5px' }}>
                                {createdAt === modifiedAt ? createdAt : modifiedAt}
                            </Text>
                        </Flex>
                        <Text style={{ marginTop: '5px' }}>{content}</Text>
                    </Flex>
                </div>
            </Flex>
        </Card>
    )
}

function getColorById(id: string) {
    const colors = [
        '#B22222', '#4CAF50', '#3F51B5', '#D5006D', '#009688', '#FF8C00', '#6A5ACD', '#FF4500', '#3CB371'
    ];
    const index = Math.abs(hashCode(id)) % colors.length;
    return colors[index];
}

function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
