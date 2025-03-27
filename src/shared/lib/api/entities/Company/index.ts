import { Page } from "../Common"
import { Curator } from "../Role"

export type Company = {
    id: string
    name: string
    description: string
    photo?: File
}

export type CompanyCreate = Pick<Company, 'name' | 'description'> & {
    curator: Curator
}

export type CompanyUpdate = Pick<Company, 'name' | 'description'>

export type CompanyPage = Page<Company & {
    studentsNum: number
    popularStack: string
}>