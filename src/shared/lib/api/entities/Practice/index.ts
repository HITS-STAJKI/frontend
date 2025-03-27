import { Page } from "../Common"

export type Practice = {
    id: string
    createdAt: Date
    isPaid: boolean
    isArchived: boolean
    isApproved: boolean
}

export type PracticeRequestPage = Page<Practice>

export type PracticeEdit = Pick<Practice, 'isPaid'>

export type PracticeCreate = Pick<Practice, 'isPaid'> & {companyId: string}

export type PracticeApprove = Pick<Practice, 'id'> &
{
    createdAt: Date
    modifiedAt: Date
    fileId: string
    isApproved: boolean
}