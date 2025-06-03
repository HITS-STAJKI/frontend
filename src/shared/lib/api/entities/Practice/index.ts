import { Page } from "../Common"
import { Company } from "../Company"
import { Group } from "../Group"
import { User } from "../User"

export type Practice = {
    id: string
    user: User
    group: Group
    company: Company
    createdAt: string
    isPaid: boolean
    isArchived: boolean
    isApproved: boolean
}

export type PracticeRequestPage = Page<Practice>

export type PracticeEdit = Pick<Practice, 'isPaid'>

export type PracticeCreate = Pick<Practice, 'isPaid'> & {companyId: string}

export type PracticeApprove = Pick<Practice, 'id'> &
{
    createdAt: string
    modifiedAt: string
    fileId: string
    isApproved: boolean
}