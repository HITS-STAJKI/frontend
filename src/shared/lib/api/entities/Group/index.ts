import { DeleteMessage, PageFilter, Sort } from "../Common"
import { Student } from "../Role"

export type Group = {
    id: string
    number: string
    students: Array<Student>,
    studentsCount: number
}

export type GroupCreate = Pick<Group, 'number'>

export type GroupUpdate = Pick<Group, 'number'>

export type GroupSearchAndFilter = {
    id?: string
    number?: string
    sort?: Sort<Group, keyof Group>
} & PageFilter

export type DeleteGroup = DeleteMessage