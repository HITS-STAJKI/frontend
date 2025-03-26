import { DeleteMessage, Page, PageFilter, Sort } from "../Common"

export type Stack = {
    id: string
    name: string
}

export type StackPage = Page<Stack>

export type StackCreate = Pick<Stack, 'name'>

export type StackUpdate = Pick<Stack, 'name'>

export type StackSearchAndFilter = {
    query: string
    sort?: Array<Sort<Stack, keyof Stack>>
} & PageFilter

export type DeleteStack = DeleteMessage