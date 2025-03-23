import { User, UserList } from "../../entities";

export const GET_USER: User = {
    id: 'some_user_uuid',
    email: 'some_user_email',
    firstName: 'some_first_name',
    lastName: 'some_last_name',
    roles: [
        {
            id: 'some_role_uuid',
            role: 'STUDENT'
        }
    ]
}

export const GET_USER_PAGE: UserList = {
    content: [GET_USER, GET_USER, GET_USER],
    pagination: {
        count : 5,
        current : 0,
        size : 10
    }
}