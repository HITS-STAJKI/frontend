import { User, UserList } from "../../entities";

export const GET_USER: User = {
    id: 'some_user_uuid',
    email: 'some_user_email',
    fullname: 'some_fullname',
    roles: [
        {
            id: 'some_role_uuid',
            userRole: 'STUDENT'
        }
    ]
}

export const GET_USER_PAGE: UserList = {
    content: [GET_USER, GET_USER, GET_USER],
    pagination: {
        totalPages : 5,
        currentPage : 0,
        size : 10
    }
}