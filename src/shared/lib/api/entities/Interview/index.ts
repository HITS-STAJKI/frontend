import { User } from '../User';
import { DeleteMessage, Page, PageFilter, Sort } from "../Common"
import { Stack } from "../Stack"
import { Language } from '../Language';
import { Company } from '../Company';
import { InterviewDto, UserDto } from 'services/api/api-client.types';

export type InterviewStatus = "PENDING" | "REJECTED" | "SUCCEED"

export type Interview = {
    id: string
    status: InterviewStatus
    stack: Stack
    languages: Array<Language>
    companyPartner: Pick<Company, 'id' | 'name'>
}

export type InterviewUpdate = {
    stackId: string
    languageIds: Array<string>
    status: InterviewStatus
}

export type DeleteInterview = DeleteMessage

export type InterviewCreate = Pick<Interview, 'status'> & {
    stackId: string
    languagesIds: string
    companyPartnerId: string
}

export type InterviewPage = Page<Interview>

export type PagedListDtoInterviewDto = Page<InterviewDto>

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
    modifiedAt?: string
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


export type InterviewForTeachers = {
    id: string
    createdAt: string
    modifiedAt?: string
    status: InterviewStatus
    stack: Stack
    languages: Array<Language>
    companyPartner: Pick<Company, 'id' | 'name'>
    student: UserDto
}