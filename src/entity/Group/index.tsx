import { DeleteButton, EditButton, Modal } from "shared/ui"
import { Group as GroupType } from "shared/lib"
import { Card, Flex } from '@mantine/core';
import { Group as MGroup } from "@mantine/core";
import { DeleteGroupButton, EditGroupForm } from "features/Group";

type GroupProps = {
    group: GroupType;
} & {

}

export const Group = ({ group }: GroupProps) => {
    return (
        <Card shadow='sm' withBorder>
            <Flex justify='space-between'>
                {group.number}
                <MGroup>
                    <Modal
                        render={open => <EditButton onClick={() => open()} />}
                        content={({ close }) => <EditGroupForm group={group} onSuccess={() => close()} />}
                        title={'Редактировать группу'}
                    />

                    <Modal
                        title={`Вы уверены, что хотите удалить группу ${group.number}?`}
                        render={open => <DeleteButton onClick={() => open()} />}
                        content={({ close }) => {
                            return (
                                <DeleteGroupButton group={group} onClick={() => {
                                    close()
                                }} />
                            )
                        }}
                    />

                </MGroup>
            </Flex>
        </Card>
    )
}