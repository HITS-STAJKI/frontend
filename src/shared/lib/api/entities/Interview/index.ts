import { User } from '../User';
import { DeleteMessage, Page, PageFilter, Sort } from "../Common"
import { Stack } from "../Stack"

export type InterviewStatus = "PENDING" | "REJECTED" | "SUCCEED"

export type Interview = {
    id: string
    status: InterviewStatus
    stack: Stack
    companyPartner: string //TODO заменить потом на импортированный тип компании
}

export type InterviewUpdate = Pick<Interview, 'status'>&{
    stackId: string
}

export type DeleteInterview = DeleteMessage

export type InterviewCreate = Pick<Interview, 'status'>&{
    stackId: string
    companyPartnerId: string
}

export type InterviewPage = Page<Interview>

export type SpecificStudentInterviewSearchAndFilter = {
    studentId: string
    sort?: Array<Sort<Interview, keyof Interview>>
} & PageFilter

export type MyInterviewSearchAndFilter = {
    sort?: Array<Sort<Interview, keyof Interview>>
} & PageFilter


export type InterviewsComment = {
    id: string
    content: string
    createdAt: string
    modifiedAt: string
    author: User 
}

export type InterviewsCommentCreate = Pick<InterviewsComment, 'content'>

export type DeleteInterviewsComment = DeleteMessage

export type InterviewsCommentUpdate = Pick<InterviewsComment, 'content'>

export type InterviewsCommentSearchAndFilter = {
    interviewId: string
    sort?: Array<Sort<InterviewsComment, keyof InterviewsComment>>
} & PageFilter

export type InterviewsCommentPage = Page<InterviewsComment>