import { GroupDto } from "services/api/api-client.types"
import { DeleteMessage, Page, PageFilter, Sort } from "../Common"
import { Student } from "../Role"

export type Group = {
    id: string
    number: string
    students: Array<Student>,
    studentsCount: number
}

export type GroupPage = Page<GroupDto>

export type GroupCreate = Pick<Group, 'number'>

export type GroupUpdate = Pick<Group, 'number'>

export type GroupSearchAndFilter = {
    id?: string
    number?: string
    sort?: Array<Sort<Group, keyof Group>>
} & PageFilter

export type DeleteGroup = DeleteMessage