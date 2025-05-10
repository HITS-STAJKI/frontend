import { Page, PageFilter } from "../Common"
import { Role, RoleType } from "../Role"

export type User = {
    id: string
    email: string
    fullname: string
    roles: Array<Role>
}

export type UserRegistration = Pick<User, 'email' | 'fullname'>&{
    password: string
}

export type UserLogin = Pick<UserRegistration, 'email' | 'password'>

export type UserList = Page<User>

export type UserUpdate = Pick<User, 'fullname'>

export type UserListFilter = PageFilter & {
    userRole: RoleType
}