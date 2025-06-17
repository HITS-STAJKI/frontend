import { Group, Student } from "shared/lib";

export type GroupWithName = {
    id: string
    name: string
    students: Array<Student>,
    studentsCount: number
}

export function convertGroupsToGroupsWithName(groups: Group[]): GroupWithName[] {
    return groups.map(group => ({
        id: group.id,
        name: group.number,
        students: group.students,
        studentsCount: group.studentsCount,
    }));
}

export type StatusWithID = {
    id: string
    name: string
}

export const STATUS1: StatusWithID = {
    id: 'PENDING',
    name: 'В процессе',
}
export const STATUS2: StatusWithID = {
    id: 'REJECTED',
    name: 'Отклонено',
}
export const STATUS3: StatusWithID = {
    id: 'SUCCEED',
    name: 'Пройдено',
}
