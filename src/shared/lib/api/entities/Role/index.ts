export type RoleType = 'ADMIN' | 'DEAN' | 'CURATOR' |'STUDENT' | 'TEACHER'

export type Role = {
    id: string
    role: RoleType
}