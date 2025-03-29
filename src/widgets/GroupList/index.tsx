import { Group } from "entity"
import { GET_GROUPS } from "shared/lib"
import { useMediaQuery } from '@mantine/hooks';

export const GroupList = () => {

    //TODO сделать нормальный адаптив
    const isWideScreen = useMediaQuery('(min-width: 1000px)'); 
    const isMediumScreen = useMediaQuery('(min-width: 500px)'); 

    const columns = isWideScreen ? 4 : isMediumScreen ? 2 : 1;

    return (
        <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${columns}, 1fr)`, 
                gap: '1vw', 
                width: '100%', 
                marginTop: "3vh" 
            }}>
            {GET_GROUPS.content.map((group) => (
                <Group key={group.id} group={group} /> 
            ))}
        </div>
    )
}