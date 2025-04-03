import { Language, LanguagePage } from "../../entities";

const LANGUAGE1: Language = {
    id: 'language_id_1',
    name: 'JavaScript',
}
const LANGUAGE2: Language = {
    id: 'language_id_2',
    name: 'C#',
}
const LANGUAGE3: Language = {
    id: 'language_id_3',
    name: 'C++',
}

export const GET_LANGUAGES: LanguagePage  = {
    content: [LANGUAGE1, LANGUAGE2, LANGUAGE3],
    pagination: {
        count: 1,
        current: 0,
        size: 10
    }
}