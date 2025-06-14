import { Card, Flex } from '@mantine/core';
import { Group as MGroup } from "@mantine/core";
import { DeleteGroupButton, EditGroupButton } from "features/Group";
import { EditListOfStudentsButton } from "features/Group/EditListOfStudents";
import { GroupDto } from "services/api/api-client.types";

type GroupProps = {
    group: GroupDto;
} & {

}

export const Group = ({ group, number }: GroupProps & {number: number}) => {
    return (
        <Card shadow='sm' withBorder>
            <Flex justify='space-between'>
                <MGroup>
                <div>{number}</div>
                <EditListOfStudentsButton group={group} />
                </MGroup>
                
                <MGroup>
                    <div>{group.studentsCount} учащихся</div>
                    <EditGroupButton group={group} />
                    <DeleteGroupButton group={group} />
                </MGroup>
            </Flex>
        </Card>
    )
}