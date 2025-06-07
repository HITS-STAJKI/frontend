export const dateFormatter = (date: string) => {
    const splittedDate = date.split('-')
    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`
}