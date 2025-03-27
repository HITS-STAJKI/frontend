import { Practice, PracticeRequestPage } from "../../entities";

export const PRACTICE1: Practice = {
    id: 'practice_id_1',
    createdAt: "1995-12-17T03:24:00",
    isPaid: true,
    isArchived: false,
    isApproved: false,
}

export const PRACTICE2: Practice = {
    id: 'practice_id_2',
    createdAt: "1995-12-17T03:24:00",
    isPaid: false,
    isArchived: true,
    isApproved: false,
}

export const PRACTICE3: Practice = {
    id: 'practice_id_3',
    createdAt: "1995-12-17T03:24:00",
    isPaid: false,
    isArchived: false,
    isApproved: true,
}

export const GET_PRACTICES: PracticeRequestPage = {
    content: [PRACTICE1, PRACTICE2, PRACTICE3],
    pagination: {
        count: 3,
        current: 0,
        size: 10
    }
};

export const GET_PRACTICE: Practice = PRACTICE1;