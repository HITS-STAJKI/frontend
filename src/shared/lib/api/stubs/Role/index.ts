import { Curator, Dean, Student, Teacher, UserRoleList } from "../../entities";
import { GET_USER } from "../User";

export const GET_STUDENT: Student = {
    id: 'some_student_uuid',
    group: {
        id: 'some_group_uuid',
        number: 'some_group_number',
    },
    user: GET_USER
}

export const GET_STUDENT_2: Student = {
    id: 'some_student_uuid_2',
    group: {
        id: 'some_id',
        number: '9999'
    },
    user: GET_USER
}

export const GET_TEACHER: Teacher = {
    id: 'some_teacher_uuid',
    user: GET_USER
}

export const GET_CURATOR: Curator = {
    id: 'some_curator_uuid',
    companyPartner: {
        id: 'some_company_id',
        name: 'some_company_name'
    },
    user: GET_USER
}

export const GET_DEAN: Dean = {
    id: 'some_dean_uuid',
    user: GET_USER
}

export const GET_USER_ROLE_LIST: UserRoleList = [
    {
        id: 'some_role_uuid1',
        userRole: 'STUDENT'
    },
    {
        id: 'some_role_uuid2',
        userRole: 'ADMIN'
    }
]