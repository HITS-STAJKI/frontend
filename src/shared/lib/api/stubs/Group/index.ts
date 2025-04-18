import { Group, GroupPage } from "../../entities";
import { GET_STUDENT } from "../Role";

const GROUP: Group = {
    id: 'some_group_id',
    studentsCount:3,
    number: '972203',
    students:[GET_STUDENT, GET_STUDENT, GET_STUDENT]
}

export const GET_GROUPS: GroupPage  = {
    content: [GROUP, GROUP, GROUP, GROUP],
    pagination: {
        count: 4,
        current: 2,
        size: 10
    }
}