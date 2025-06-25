import { FilterBlockFull, FilterGroupInput, Group } from "entity"
import { GET_GROUPS } from "shared/lib"
import { Pagination } from "shared/ui";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { FilterSelect } from "widgets/Selection/indexTeachers";
import { convertGroupsToGroupsWithName } from "widgets/Selection/newTypes";

export const GroupList = () => {
    const { data, isLoading } = useGetGroupsQuery()

    const currentPage = data?.pagination?.currentPage || 1;
    const size = data?.pagination?.size || 10;
    if (isLoading) {
        return 'Загрузка'
    }
    return (

        <div style={{ paddingBottom: '70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {data?.items!.map((group, index) => {
                    const number = (currentPage - 1) * size + index + 1;
                    return (
                        <div key={group.id} style={{ width: '100%', margin: '8px 0' }}>
                            <Group group={group} number={number} />
                        </div>
                    );
                })}
            </div>
            <Pagination pagination={GET_GROUPS.pagination} />
        </div>

    )
}

export function GroupFilters() {
    return (
        <FilterBlockFull availableFilters={[
            { id: "number", label: "Номер потока (ввод)", element: (props) => <FilterGroupInput id="number" onChangeValue={props.onChangeValue} /> },
            { id: "group", label: "Номер потока (выбор)", element: (props) => <FilterSelect items={convertGroupsToGroupsWithName(GET_GROUPS.items)} id="group" onChangeValue={props.onChangeValue} label="Выберите номер потока" /> },
        ]}
            printButton={false}
        />
    );
}