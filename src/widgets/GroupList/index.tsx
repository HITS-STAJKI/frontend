import { FilterBlockFull, FilterLanguageName, Group } from "entity"
import { GroupPage } from "shared/lib"
import { Pagination } from "shared/ui";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { FilterSelect } from "widgets/Selection/indexTeachers";
import { convertGroupsToGroupsWithName } from "widgets/Selection/newTypes";

export const GroupList = ({ items, pagination, size }: GroupPage & {size: number}) => {

    console.log("ppp", items)
    return (

        <div style={{ paddingBottom: '70px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {items.map((group, localIndex) => {
                    const globalIndex = ((pagination?.currentPage ?? 1)) * (size) + localIndex;
                    return (
                        <div key={group.id} style={{ width: '100%', margin: '8px 0' }}>
                            <Group group={group} number={globalIndex + 1} />
                        </div>
                    );
                })}
            </div>
            <Pagination pagination={pagination} />
        </div>

    )
}

export function GroupFilters({ items }: GroupPage) {
    return (
        <FilterBlockFull availableFilters={[
            { id: "number", label: "Номер потока (ввод)", element: (props) => <FilterLanguageName id="number" onChangeValue={props.onChangeValue} /> },
            { id: "id", label: "Номер потока (выбор)", element: (props) => <FilterSelect items={items} id="id" onChangeValue={props.onChangeValue} label="Выберите номер потока" /> },
        ]}
            printButton={false}
        />
    );
}