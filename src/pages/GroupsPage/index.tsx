import { CreateGroup } from "features/CreateGroup"
import { GroupList } from "widgets/GroupList"
import { GroupSearchBlock } from "widgets/GroupSearchBlock"
import { Title } from '@mantine/core';

export const GroupsPage = () => {
    return (
        <div style={{ width: '100%', padding: '0 2vw' }}>
            <Title order={1}>Группы</Title>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginTop: "3vh" }} >
                <GroupSearchBlock />
                <CreateGroup />
            </div>
            
            <GroupList />
        </div>
    )
}