import { RoleDto, UserDto } from "services/api/api-client.types"
import { Page, PageFilter } from "../Common"
import { RoleType } from "../Role"

export type User = {
    id: string
    email: string
    fullname: string
    roles: Array<RoleDto>
}

export type UserRegistration = Pick<User, 'email' | 'fullname'> & {
    password: string
}

export type UserLogin = Pick<UserRegistration, 'email' | 'password'>

export type UserList = Page<UserDto>

export type UserUpdate = Pick<User, 'fullname'>

export type UserListFilter = PageFilter & {
    userRole: RoleType
}