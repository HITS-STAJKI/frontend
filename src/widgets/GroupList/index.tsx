import { FilterBlockFull, Group, ImputFilter } from "entity"
import { GET_GROUPS } from "shared/lib"
import { Grid, TextInput } from "@mantine/core";
import { Pagination } from "shared/ui";
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery";
import { useState } from "react";
import { FilterSelect } from "widgets/Selection/indexTeachers";
import { convertGroupsToGroupsWithName } from "widgets/Selection/newTypes";

export const GroupList = () => {
    const {data, isLoading} = useGetGroupsQuery()

    const currentPage = data?.pagination?.currentPage || 1; 
    const size = data?.pagination?.size || 10; 
    if(isLoading){
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
            { id: "number", label: "Номер группы (ввод)", element: (props) => <ImputFilter id="number" onChangeValue={props.onChangeValue} label={"Введите номер группы"} /> },
            { id: "group", label: "Номер группы (выбор)", element: (props) => <FilterSelect items={convertGroupsToGroupsWithName(GET_GROUPS.items)} id="group" onChangeValue={props.onChangeValue} label="Выберите номер группы" /> },
        ]}
            printButton={false}
        />
    );
}