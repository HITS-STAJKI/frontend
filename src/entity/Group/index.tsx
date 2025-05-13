import { Modal } from "shared/ui"
import { Group as GroupType } from "shared/lib"
import { Card, Flex, Button } from '@mantine/core';
import { Group as MGroup } from "@mantine/core";
import { DeleteGroupButton, EditGroupForm } from "features/Group";
import { TrashSvgrepoCom } from "assets/icons"
import { PencilSvgrepoCom } from "assets/icons"

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
                        render={open => <Button color="gray" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                            <PencilSvgrepoCom />
                        </Button>}
                        content={({ close }) => <EditGroupForm group={group} onSuccess={() => close()} />}
                        title={'Редактировать группу'}
                    />

                    <Modal
                        title={`Вы уверены, что хотите удалить группу ${group.number}?`}
                        render={open => <Button color="red" onClick={() => open()} size="md" style={{ aspectRatio: '1 / 1', padding: 0 }}>
                            <TrashSvgrepoCom />
                        </Button>}
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