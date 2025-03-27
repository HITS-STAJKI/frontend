import { Company, CompanyPage } from "../../entities";

export const COMPANY1: Company = {
    id: 'company_id_1',
    name: 'TBANK',
    description: 'company_description_1'
};

export const COMPANY2: Company = {
    id: 'company_id_2',
    name: 'HITS',
    description: 'company_description_2'
};

export const COMPANY3: Company = {
    id: 'company_id_3',
    name: 'MCC',
    description: 'company_description_3'
};

export const GET_COMPANIES: CompanyPage = {
    content: [
        { ...COMPANY1, studentsNum: 100, popularStack: 'JavaScript' },
        { ...COMPANY2, studentsNum: 200, popularStack: 'Python' },
        { ...COMPANY3, studentsNum: 150, popularStack: 'Java' }
    ],
    pagination: {
        count: 3,
        current: 0,
        size: 10
    }
};