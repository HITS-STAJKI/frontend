import { FilterRequest, FilterType } from "..";

const link = 'https://tomcat.sonya.jij.li/internship/api/v1/statistics/students/count'
export const useData = () => {

    const getStats = async (data: { key: keyof FilterRequest, value: FilterRequest[keyof FilterRequest], add?: string }, main: { key: FilterType, value: FilterRequest[FilterType], add?: string }) => {
        const sp = new URLSearchParams()
        if (main.key !== data.key) {
            if (main.value) {
                if (Array.isArray(main.value)) {
                    main.value.forEach(el => {
                        sp.append(main.key, el)
                    })
                }
                else {
                    sp.append(main.key, main.value!.toString())
                }
            }
            if (data.value) {
                if (Array.isArray(data.value)) {
                    data.value.forEach(el => {
                        sp.append(data.key, el)
                    })
                }
                else {
                    sp.append(data.key, data.value!.toString())
                }
            }
            if (main.value && data.value) {
                const response = await fetch(`${link}?${sp.toString()}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const dataFilter = (await response.json()) as { count: number }
                return { main: main.add || main.key, key: data.add || data.key, value: dataFilter.count }
            }
        }

    }
    return { getStats }
}