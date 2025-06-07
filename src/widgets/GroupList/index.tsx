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
        <Grid
            type='container'
            breakpoints={{ xs: '100px', sm: '200px', md: '500px', lg: '1000px', xl: '1920px' }}
            mt={'md'}
        >
        {data?.items!.map((group) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Group key={group.id} group={group} />
            </Grid.Col>
        ))}
        </Grid>
        <Pagination pagination={GET_GROUPS.pagination} />
        </div>
        
    )
}