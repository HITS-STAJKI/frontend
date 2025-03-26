import { DeleteMessage, Page, PageFilter, Sort } from "../Common"

export type Language = {
    id: string
    name: string
}

export type LanguagePage = Page<Language>

export type LanguageCreate = Pick<Language, 'name'>

export type LanguageUpdate = Pick<Language, 'name'>

export type LanguageSearchAndFilter = {
    query: string
    sort?: Array<Sort<Language, keyof Language>>
} & PageFilter

export type DeleteLanguage = DeleteMessage