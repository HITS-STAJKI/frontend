import { Card, Flex } from '@mantine/core';
import { Group as MGroup } from "@mantine/core";
import { DeleteGroupButton, EditGroupButton } from "features/Group";
import { EditListOfStudentsButton } from "features/Group/EditListOfStudents";
import { GroupDto } from "services/api/api-client.types";

type GroupProps = {
    group: GroupDto;
} & {

}

export const Group = ({ group }: GroupProps) => {
    return (
        <Card shadow='sm' withBorder>
            <Flex justify='space-between'>

                <EditListOfStudentsButton group={group} />
                <MGroup>
                    <EditGroupButton group={group} />
                    <DeleteGroupButton group={group} />
                </MGroup>
            </Flex>
        </Card>
    )
}