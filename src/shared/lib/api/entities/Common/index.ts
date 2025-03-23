export type Pagination = {
    size: number
    current: number
    count: number
}

export type Page<T> = {
    content: Array<T>
    pagination: Pagination
}