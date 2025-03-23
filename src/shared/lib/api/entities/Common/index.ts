export type Pagination = {
    size: number
    current: number
    count: number
}

export type Page<T> = {
    content: Array<T>
    pagination: Pagination
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