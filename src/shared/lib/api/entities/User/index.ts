import { Page, PageFilter } from "../Common"
import { Role, RoleType } from "../Role"

export type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    roles: Array<Role>
}

export type UserRegistration = Pick<User, 'email' | 'firstName' | 'lastName'>&{
    password: string
}

export type UserLogin = Pick<UserRegistration, 'email' | 'password'>

export type UserList = Page<User>

export type UserUpdate = Pick<User, 'firstName' | 'lastName'>

export type UserListFilter = PageFilter & {
    userRole: RoleType
}