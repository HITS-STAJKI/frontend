import { DeleteMessage } from "../Common"
import { Company } from "../Company"
import { Group } from "../Group"
import { User } from "../User"

export type RoleType = 'ADMIN' | 'DEAN' | 'CURATOR' |'STUDENT' | 'TEACHER'

export type Role = {
    id: string
    userRole: RoleType
}

type UserWithId = {
    id: string
    user: User
}

type UserId = {
    userId: string
}

type GroupId = {
    groupId: string
}

export type Student = UserWithId & {
    group: Pick<Group, 'id' | 'number'>
}

export type StudentCreate = GroupId

export type StudentUpdate = GroupId

export type Curator = UserWithId & {
    companyPartner: Pick<Company, 'id' | 'name'>
}

export type CuratorCreate = UserId & {
    companyId: string
}

export type UpdateCurator = {
    companyId: string
}

export type Dean = UserWithId

export type CreateDean = UserId

export type Teacher = UserWithId

export type CreateTeacher = UserId

export type UserRoleList = Array<Role>

export type DeleteUserRole = DeleteMessage