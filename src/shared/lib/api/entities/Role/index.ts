import { DeleteMessage } from "../Common"
import { User } from "../User"

export type RoleType = 'ADMIN' | 'DEAN' | 'CURATOR' |'STUDENT' | 'TEACHER'

export type Role = {
    id: string
    role: RoleType
}

type UserWithId = {
    id: string
    user: User
}

type UserId = {
    userId: string
}

export type Student = UserWithId & {
    groupId: string
}

export type StudentCreate = Pick<Student, 'groupId'> & UserId

export type StudentUpdate = Pick<Student, 'groupId'>

export type Curator = UserWithId & {
    companyId: string
}

export type CuratorCreate = Pick<Curator, 'companyId'> & UserId

export type UpdateCurator = Pick<Curator, 'companyId'>

export type Dean = UserWithId

export type CreateDean = UserId

export type Teacher = UserWithId

export type CreateTeacher = UserId

export type UserRoleList = Array<Role>

export type DeleteUserRole = DeleteMessage