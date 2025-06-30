import { Center, Flex, Loader, Title } from "@mantine/core"
import { ResponsiveBar } from '@nivo/bar'
import { useCountStudentsByFilterQuery } from "services/api/api-client/StatisticsQuery"
import { useData } from "./hook"
import { useEffect, useState } from "react"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"
import { useGetStackListQuery } from "services/api/api-client/StackQuery"

export type FilterType = keyof FilterRequest

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
    const [filters, setFilters] = useState<Array<{ main: string, students: number }>>([])
    useEffect(() => {
        const objects: FilterRequest = {
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
        if (main !== undefined) {
            if (Array.isArray(objects[main])) {
                objects[main].forEach(el => {
                    getStats({ main, object: objects, value: el }).then(count => {
                        setFilters(prev => [...prev, { main: String(el), students: count.count }])
                    })
                })
            }
            else {
                const val = objects[main]
                if (val !== undefined && val !== '') {
                    getStats({ main, object: objects, value: val }).then(count => {
                        setFilters([{ main: String(objects[main]), students: count?.count || 0 }])
                    })
                }
            }
        }
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
        return <Flex w={'66%'} style={{ flexGrow: 1 }} p={'lg'} direction={'column'} align='center' justify='center'>
            <Center>
                <Loader />
            </Center>
        </Flex>
    }
    return (
        <Flex w={'66%'} style={{ flexGrow: 1 }} p={'lg'} direction={'column'}>
            <Title>Всего результатов {data?.count}</Title>
            <div style={{ width: '100%', height: '100%' }}>
                {filters.length <= 0 ? <Center w={'100%'} h='100%'>
                    <Title order={2}>Для отображения графика выберете индексируемый фильтр</Title>
                </Center> : <ResponsiveBar data={filters.map(filter => {
                    console.log(filter)
                    return {
                        main: dataGroups?.items?.find(item => item.id === filter.main)?.number || dataCompany?.items?.find(item => item.id === filter.main)?.name || dataStack?.find(item => item.id === filter.main)?.name || filter.main,
                        value: filter.students
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