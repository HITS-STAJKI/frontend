import { PageDto } from "services/api/api-client.types"

export type Pagination = {
    size: number
    currentPage: number
    totalPages: number
}

export type Page<T> = {
    items: Array<T>
    pagination: PageDto
}

export type PageFilter = {
    size?: number
    page?: number
}

export type DeleteMessage = {
    message: 'Объект успешно удален'
    timestamp: string
    status: 200
}

export type Sort<T, K extends keyof T> = `${K extends string ? K : never},${'ASC' | 'DESC'}`