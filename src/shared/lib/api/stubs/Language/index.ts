import { Language, LanguagePage } from "../../entities";

export const LANGUAGE1: Language = {
    id: 'language_id_1',
    name: 'JavaScript',
}
export const LANGUAGE2: Language = {
    id: 'language_id_2',
    name: 'C#',
}
export const LANGUAGE3: Language = {
    id: 'language_id_3',
    name: 'C++',
}

export const GET_LANGUAGES: LanguagePage  = {
    items: [LANGUAGE1, LANGUAGE2, LANGUAGE3],
    pagination: {
        totalPages: 1,
        currentPage: 0,
        size: 10
    }
}