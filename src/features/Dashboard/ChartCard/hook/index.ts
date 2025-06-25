import { FilterRequest, FilterType } from "..";

const link = 'https://tomcat.sonya.jij.li/internship/api/v1/statistics/students/count'
export const useData = () => {

    const getStats = async (data: { main: FilterType, object: FilterRequest, value?: string | boolean }) => {
        const sp = new URLSearchParams()
        if (data.value !== undefined) {
            sp.append(data.main, data.value.toString())
        }
        Object.entries(data.object).forEach(pair => {
            const [key, value] = pair
            if (key !== data.main)
                if (value !== undefined && value !== '')
                    Array.isArray(value) ? value.forEach(val => sp.append(key, val)) : sp.append(key, value.toString())
        })
        const response = await fetch(`${link}?${sp.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json()
    }
    return { getStats }
}