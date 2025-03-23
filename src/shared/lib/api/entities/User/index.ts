import { Role } from "../Role"

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

