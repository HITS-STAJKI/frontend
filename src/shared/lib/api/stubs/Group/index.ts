import { Group, GroupPage } from "../../entities";
import { GET_STUDENT, GET_STUDENT_2 } from "../Role";

export const GROUP1: Group = {
    id: 'some_group_id_1',
    studentsCount: 3,
    number: '972201',
    students: [GET_STUDENT, GET_STUDENT, GET_STUDENT]
}

export const GROUP2: Group = {
    id: 'some_group_id_2',
    studentsCount: 3,
    number: '972202',
    students: [GET_STUDENT, GET_STUDENT, GET_STUDENT]
}

export const GROUP3: Group = {
    id: 'some_group_id_3',
    studentsCount: 3,
    number: '972203',
    students: [GET_STUDENT, GET_STUDENT, GET_STUDENT]
}

export const GET_GROUPS: GroupPage = {
    content: [GROUP1, GROUP2, GROUP3],
    pagination: {
        totalPages: 1,
        currentPage: 0,
        size: 10
    }
}