import { GET_USER } from "..";
import { Interview, InterviewPage, InterviewsComment, InterviewsCommentPage } from "../../entities";
import { STACK1, STACK2 } from "../Stack"
import { LANGUAGE1, LANGUAGE2 } from "../Language"

const INTERVIEW1: Interview = {
    id: "interview_id_1",
    status: "PENDING",
    stack: STACK1,
    companyPartner: {
        id: 'some_company_id_1',
        name: 'some_company_name_1'
    },
    languages: [LANGUAGE1]
}

const INTERVIEW2: Interview = {
    id: "interview_id_2",
    status: "REJECTED",
    stack: STACK2,
    companyPartner: {
        id: 'some_company_id_2',
        name: 'some_company_name_2'
    },
    languages: [LANGUAGE2]
}

export const GET_INTERVIEWS: InterviewPage = {
    content: [INTERVIEW1, INTERVIEW2, INTERVIEW1],
    pagination: {
        totalPages: 1,
        currentPage: 0,
        size: 10
    }
}

const INTERVIEW_COMMENT1: InterviewsComment = {
    id: "interview_comm_id_1",
    content: "Комментарий 1 ssssssssssssssssssssssssss ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ssssssssss ssssssssssssss ss sssssssssssssssss",
    createdAt: "2025-03-27",
    modifiedAt: "2025-03-27",
    author: GET_USER
}
const INTERVIEW_COMMENT2: InterviewsComment = {
    id: "interview_comm_id_2",
    content: "Комментарий 2",
    createdAt: "2025-03-27",
    modifiedAt: "2025-03-27",
    author: GET_USER
}

export const GET_INTERVIEWS_COMMENTS: InterviewsCommentPage = {
    content: [INTERVIEW_COMMENT1, INTERVIEW_COMMENT2],
    pagination: {
        totalPages: 1,
        currentPage: 0,
        size: 10
    }
}