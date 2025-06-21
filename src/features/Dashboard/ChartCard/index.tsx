import { Flex, Title } from "@mantine/core"
import { ResponsiveBar } from '@nivo/bar'
import { useCountStudentsByFilterQuery } from "services/api/api-client/StatisticsQuery"
import { useData } from "./hook"
import { useEffect, useState } from "react"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"
import { useGetStackListQuery } from "services/api/api-client/StackQuery"

export type FilterType = 'fullname' | 'isAcadem' | 'isGraduated' | 'groupIds' | 'companyIds' | 'isOnPractice' | 'hasPracticeRequest' | 'hasInterviews' | 'stackIds' | 'includeArchived'

export type FilterRequest = {
    fullname?: string
    isAcadem?: boolean
    isGraduated?: boolean
    groupIds?: Array<string>
    companyIds?: Array<string>
    isOnPractice?: boolean
    hasPracticeRequest?: boolean
    hasInterviews?: boolean
    stackIds?: Array<string>
    includeArchived?: boolean
}


export const ChartCard = ({
    fullname,
    isAcadem,
    isGraduated,
    groupIds,
    companyIds,
    isOnPractice,
    hasPracticeRequest,
    hasInterviews,
    stackIds,
    includeArchived,
    main
}: FilterRequest & { main?: FilterType }) => {
    const datas = {
        fullname,
        isAcadem,
        isGraduated,
        groupIds,
        companyIds,
        isOnPractice,
        hasPracticeRequest,
        hasInterviews,
        stackIds,
        includeArchived,
    }
    const { data, isLoading } = useCountStudentsByFilterQuery(
        fullname,
        isAcadem,
        isGraduated,
        groupIds,
        companyIds,
        isOnPractice,
        hasPracticeRequest,
        hasInterviews,
        stackIds,
        includeArchived
    )
    const { getStats } = useData()
    const [filters, setFilters] = useState<Array<{ key: string, main: string, value: number }>>([])
    useEffect(() => {
        if (main !== undefined)
            Object.entries({
                fullname,
                isAcadem,
                isGraduated,
                groupIds,
                companyIds,
                isOnPractice,
                hasPracticeRequest,
                hasInterviews,
                stackIds,
                includeArchived,
            }).forEach(pair => {
                const [key, value] = pair
                if (Array.isArray(value) && !Array.isArray(datas[main])) {
                    value.forEach(data => {
                        getStats({ key: key as keyof FilterRequest, value: data, add: data }, { key: main, value: datas[main] }).then(data321 => {
                            if (data321 !== undefined)
                                setFilters(prev => [...prev, { ...data321 }])
                        })
                    })
                }
                else if (Array.isArray(datas[main]) && !Array.isArray(value)) {
                    datas[main].forEach(maind => {
                        getStats({ key: key as keyof FilterRequest, value }, { key: main, value: maind, add: maind }).then(data321 => {
                            if (data321 !== undefined)
                                setFilters(prev => [...prev, { ...data321 }])
                        })
                    })
                }
                else if (Array.isArray(value)) {
                    value.forEach(data => {
                        if (Array.isArray(datas[main]))
                            datas[main].forEach(maind => {
                                getStats({ key: key as keyof FilterRequest, value: data, add: data }, { key: main, value: maind, add: maind }).then(data321 => {
                                    if (data321 !== undefined)
                                        setFilters(prev => [...prev, { ...data321 }])
                                })
                            })
                    })
                }
                else {
                    getStats({ key: key as keyof FilterRequest, value }, { key: main, value: datas[main] }).then(data321 => {
                        if (data321 !== undefined)
                            setFilters(prev => [...prev, { ...data321 }])
                    })
                }

            })
        return () => {
            setFilters([])
        }
    }, [
        fullname,
        isAcadem,
        isGraduated,
        groupIds,
        companyIds,
        isOnPractice,
        hasPracticeRequest,
        hasInterviews,
        stackIds,
        includeArchived,
        main
    ])
    const { data: dataGroups, isLoading: isLoadingGroups } = useGetGroupsQuery(undefined, undefined, 0, 100000000,)
    const { data: dataCompany, isLoading: isLoadingCompany } = useGetPartnersQuery(undefined, undefined, undefined, 0, 1000000000)
    const { data: dataStack, isLoading: isLoadingStack } = useGetStackListQuery()
    if (isLoading || isLoadingGroups || isLoadingCompany || isLoadingStack) {
        return 'Загрузка'
    }
    console.log(filters.map(filter => {
        return {
            main: dataGroups?.items?.find(item => item.id === filter.main)?.number || dataCompany?.items?.find(item => item.id === filter.main)?.name || dataStack?.find(item => item.id === filter.main)?.name || filter.main,
            key: dataGroups?.items?.find(item => item.id === filter.main)?.number || dataCompany?.items?.find(item => item.id === filter.main)?.name || dataStack?.find(item => item.id === filter.main)?.name || filter.key,
            value: filter.value
        }
    }))
    return (
        <Flex flex={"2"} style={{ flexGrow: 1 }} p={'lg'} direction={'column'}>
            <Title>Всего результатов {data?.count}</Title>
            <div style={{ width: '100%', height: '100%' }}>
                {filters.length > 0 && <ResponsiveBar data={filters.map(filter => {
                    return {
                        main: dataGroups?.items?.find(item => item.id === filter.main)?.number || dataCompany?.items?.find(item => item.id === filter.main)?.name || dataStack?.find(item => item.id === filter.main)?.name || filter.main,
                        key: filter.key,
                        value: filter.value
                    }
                })}
                    indexBy={'main'}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            translateX: 120,
                            itemsSpacing: 3,
                            itemWidth: 100,
                            itemHeight: 16
                        }
                    ]}
                    axisLeft={{ legend: "Студенты", legendOffset: -40 }}
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                />}
            </div>
        </Flex>
    )
}