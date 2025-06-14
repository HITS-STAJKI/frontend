import { Practice, PracticeRequestPage } from "../../entities";
import { COMPANY1, COMPANY2, COMPANY3 } from "../Company";
import { GROUP1, GROUP2, GROUP3 } from "../Group";
import { GET_USER } from "../User";

export const PRACTICE1: Practice = {
    id: 'practice_id_1',
    user: GET_USER,
    group: GROUP1,
    company: COMPANY1,
    createdAt: "1995-12-17T03:24:00",
    isPaid: true,
    isArchived: false,
    isApproved: false,
}

export const PRACTICE2: Practice = {
    id: 'practice_id_2',
    user: GET_USER,
    group: GROUP2,
    company: COMPANY2,
    createdAt: "1995-12-17T03:24:00",
    isPaid: false,
    isArchived: true,
    isApproved: false,
}

export const PRACTICE3: Practice = {
    id: 'practice_id_3',
    user: GET_USER,
    group: GROUP3,
    company: COMPANY3,
    createdAt: "1995-12-17T03:24:00",
    isPaid: false,
    isArchived: false,
    isApproved: true,
}

export const GET_PRACTICES: PracticeRequestPage = {
    content: [PRACTICE1, PRACTICE2, PRACTICE3],
    pagination: {
        totalPages: 3,
        currentPage: 1,
        size: 10
    }
};

export const GET_PRACTICE: Practice = PRACTICE1;