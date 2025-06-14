import { Group } from "entity"
import { GET_GROUPS } from "shared/lib"
import { Grid } from "@mantine/core";
import { Pagination } from "shared/ui";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";

export const GroupList = () => {
    const {data, isLoading} = useGetGroupsQuery()
    if(isLoading){
        return 'Загрузка'
    }
    return (
        
        <div style={{ paddingBottom: '70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {data?.items!.map((group) => (
                    <div key={group.id} style={{ width: '100%', margin: '8px 0' }}>
                        <Group group={group} />
                    </div>
                ))}
            </div>
            <Pagination pagination={GET_GROUPS.pagination} />
        </div>
        
    )
}