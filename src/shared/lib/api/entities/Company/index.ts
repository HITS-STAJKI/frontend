import { Page } from "../Common"
import { Curator } from "../Role"

export type Company = {
    id: string
    name: string
    description: string
    photo?: string
    curator: Curator
}

export type CompanyCreate = Pick<Company, 'name' | 'description'>

export type CompanyUpdate = Pick<Company, 'name' | 'description'>

export type CompanyPage = Page<Pick<Company, 'id' | 'name'>>

export type CompanyFull = Pick<Company, 'id' | 'name' | 'description'> &
{
    curator: Curator
}