import { GET_USER } from "..";
import { Interview, InterviewPage, InterviewsComment, InterviewsCommentPage } from "../../entities";
import { STACK1, STACK2 } from "../Stack"

const INTERVIEW1: Interview = {
    id: "interview_id_1",
    status: "PENDING",
    stack: STACK1,
    companyPartner: "Норм компани 1" //TODO заменить потом на импортированный стаб компании
}

const INTERVIEW2: Interview = {
    id: "interview_id_2",
    status: "REJECTED",
    stack: STACK2,
    companyPartner: "Норм компани 2" //TODO заменить потом на импортированный стаб компании
}

const INTERVIEW3: Interview = {
    id: "interview_id_3",
    status: "SUCCEED",
    stack: STACK2,
    companyPartner: "Норм компани 3" //TODO заменить потом на импортированный стаб компании
}

export const GET_INTERVIEWS: InterviewPage  = {
    content: [INTERVIEW1, INTERVIEW2, INTERVIEW3],
    pagination: {
        count: 1,
        current: 0,
        size: 10
    }
}

const INTERVIEW_COMMENT1: InterviewsComment = {
    id: "interview_comm_id_1",
    content: "Комментарий 1",
    createdAt: "2025-03-27",
    modifiedAt: "2025-03-27",
    author: GET_USER 
}

const INTERVIEW_COMMENT2: InterviewsComment = {
    id: "interview_comm_id_2",
    content: "Комментарий 2",
    createdAt: "2025-03-26",
    modifiedAt: "2025-03-27",
    author: GET_USER 
}

const INTERVIEW_COMMENT3: InterviewsComment = {
    id: "interview_comm_id_3",
    content: "Комментарий 3",
    createdAt: "2025-03-28",
    modifiedAt: "2025-03-27",
    author: GET_USER 
}

export const GET_INTERVIEWS_COMMENTS: InterviewsCommentPage  = {
    content: [INTERVIEW_COMMENT1, INTERVIEW_COMMENT2, INTERVIEW_COMMENT3],
    pagination: {
        count: 1,
        current: 0,
        size: 10
    }
}