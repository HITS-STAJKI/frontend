import { Company, CompanyPage } from "../../entities";
import { GET_CURATOR } from "../Role";

export const COMPANY1: Company = {
    id: 'company_id_1',
    name: 'TBANK',
    description: 'company_description_1',
    curator: GET_CURATOR
};

export const COMPANY2: Company = {
    id: 'company_id_2',
    name: 'HITS',
    description: 'company_description_2',
    curator: GET_CURATOR
};

export const COMPANY3: Company = {
    id: 'company_id_3',
    name: 'MCC',
    description: 'company_description_3',
    curator: GET_CURATOR
};

export const GET_COMPANIES: CompanyPage = {
    items: [COMPANY1, COMPANY2, COMPANY3],
    pagination: {
        size: 3,
        currentPage: 1,
        totalPages: 10
    }
};