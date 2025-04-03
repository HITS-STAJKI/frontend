import { Card, Flex} from "@mantine/core";
import { InterviewsComment } from "shared/lib";
import { UserIcon } from "./UserIcon/UserIcon";

export function CommentCard({ id, content, createdAt, modifiedAt, author }: InterviewsComment) {

    function getColorById(id: string) {
        const colors = [
            '#B22222', '#4CAF50', '#3F51B5', '#D3D300', '#D5006D', '#009688', '#FF8C00', '#6A5ACD', '#FF4500', '#3CB371'
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

    return (
        <Card className="comment" id={id} style={{width: '100%', padding:'0.25vh', minHeight: '48px'}}>
            <Flex align="flex-start">
                <UserIcon color={getColorById(id)}/>
                <div style={{ flex: 1, marginLeft: '10px'}}>
                    <Flex direction="column">
                        <Flex align="center">
                            <span>{author.firstName} {author.lastName}</span>
                            <span style={{ color: 'gray', fontSize: '0.8em', marginLeft: '5px' }}>
                                {createdAt === modifiedAt ? createdAt : modifiedAt}
                            </span>
                        </Flex>
                        <span style={{ marginTop: '5px' }}>{content}</span>
                    </Flex>
                </div>
            </Flex>
        </Card>
    )
}
