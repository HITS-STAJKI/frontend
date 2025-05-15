import { Curator, Dean, Student, Teacher, UserRoleList } from "../../entities";
import { GET_USER } from "../User";

export const GET_STUDENT: Student = {
    id: 'some_student_uuid',
    groupId: 'some_group_uuid',
    user: GET_USER
}

export const GET_STUDENT_2: Student = {
    id: 'some_student_uuid_2',
    groupId: 'some_group_uuid',
    user: GET_USER
}

export const GET_TEACHER: Teacher = {
    id: 'some_teacher_uuid',
    user: GET_USER
}

export const GET_CURATOR: Curator = {
    id: 'some_curator_uuid',
    companyId: 'some_company_uuid',
    user: GET_USER
}

export const GET_DEAN: Dean = {
    id: 'some_dean_uuid',
    user: GET_USER
}

export const GET_USER_ROLE_LIST: UserRoleList = [
    {
        id: 'some_role_uuid1',
        role:'STUDENT'
    },
    {
        id: 'some_role_uuid2',
        role:'ADMIN'
    }
]