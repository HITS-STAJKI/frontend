import { Center, ComboboxData, Flex, Input, Loader, MultiSelect, Select } from "@mantine/core"
import { FilterRequest, FilterType } from "../ChartCard"
import { memo, ReactNode } from "react"
import { useGetGroupsQuery } from "services/api/api-client/GroupQuery"
import { useGetPartnersQuery } from "services/api/api-client/CompanyPartnersQuery"
import { useGetStackListQuery } from "services/api/api-client/StackQuery"

// {
//     fullname?: string;
//     isAcadem?: boolean;
//     isGraduated?: boolean;
//     groupIds?: Array<string>;
//     companyIds?: Array<string>;
//     isOnPractice?: boolean;
//     hasPracticeRequest?: boolean;
//     hasInterviews?: boolean;
//     stackIds?: Array<string>;
//     includeArchived?: boolean;
// }

const filters: ComboboxData = [
    // { value: 'fullname', label: 'ФИО' },
    { value: 'isAcadem', label: 'Академ' },
    { value: 'isGraduated', label: 'Выпущен' },
    { value: 'groupIds', label: 'Потоки' },
    { value: 'companyIds', label: 'Компании' },
    { value: 'isOnPractice', label: 'На практике' },
    { value: 'hasPracticeRequest', label: 'Есть запрос на практику' },
    { value: 'hasInterviews', label: 'Есть интервью' },
    { value: 'stackIds', label: 'Стеки' },
    { value: 'includeArchived', label: 'Архивированные' },
]

const fields: Array<{ value: string | null, field: (setStats: React.Dispatch<React.SetStateAction<FilterRequest>>, data?: Array<{ value: string, label: string }>) => ReactNode }> = [
    // {
    //     value: 'fullName', field: (setStats) => <Input.Wrapper label={'ФИО'}>
    //         <Input
    //             onChange={(e) => setStats(prev => {
    //                 return {
    //                     ...prev,
    //                     fullname: e.currentTarget.value
    //                 }
    //             })}
    //         />
    //     </Input.Wrapper>
    // },
    {
        value: 'isAcadem', field: (setStats) => <Select label={'В академическом отпуске'} data={[
            { value: '', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        isAcadem: e === '' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''}
        />
    },
    {
        value: 'isGraduated', field: (setStats) => <Select label={'Выпустился'} data={[
            { value: '', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        isGraduated: e === '' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''} />
    },
    {
        value: 'groupIds', field: (setStats, data) => <MultiSelect label={'Потоки'} data={data} onChange={e => {
            setStats(prev => {
                return {
                    ...prev,
                    groupIds: e
                }
            })
        }} />
    },
    {
        value: 'companyIds', field: (setStats, data) => <MultiSelect label='Компании' data={data} onChange={e => {
            setStats(prev => {
                return {
                    ...prev,
                    companyIds: e
                }
            })
        }} />
    },
    {
        value: 'isOnPractice', field: (setStats) => <Select label='На практике' data={[
            { value: '', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        isOnPractice: e === '' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''} />
    },
    {
        value: 'hasPracticeRequest', field: (setStats) => <Select label='Есть оффер' data={[
            { value: '', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        hasPracticeRequest: e === '' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''} />
    },
    {
        value: 'hasInterviews', field: (setStats) => <Select label='Проходил собеседования' data={[
            { value: 'none', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        hasInterviews: e === 'none' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''} />
    },
    {
        value: 'stackIds', field: (setStats, data) => <MultiSelect label='Стек технологий' data={data} onChange={e => {
            setStats(prev => {
                return {
                    ...prev,
                    stackIds: e
                }
            })
        }} />
    },
    {
        value: 'includeArchived', field: (setStats) => <Select label='Архивированные' data={[
            { value: '', label: '--' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ]}
            onChange={e => {
                setStats(prev => {
                    return {
                        ...prev,
                        includeArchived: e === '' ? undefined : e === 'true' ? true : false
                    }
                })
            }}
            defaultValue={''} />
    },
    { value: null, field: () => <></> }
]

export const Filters = ({ setStats, setMain, main }: {
    setStats: React.Dispatch<React.SetStateAction<FilterRequest>>,
    setMain: React.Dispatch<React.SetStateAction<FilterType | undefined>>, main: FilterType | undefined
}) => {
    const { data: dataGroups, isLoading: isLoadingGroups } = useGetGroupsQuery(undefined, undefined, 0, 100000000,)
    const { data: dataCompany, isLoading: isLoadingCompany } = useGetPartnersQuery(undefined, undefined, undefined, 0, 1000000000)
    const { data: dataStack, isLoading: isLoadingStack } = useGetStackListQuery()
    if (isLoadingGroups || isLoadingCompany || isLoadingStack) {
        return <Flex flex={'33%'} style={{ flexGrow: 1, border: '1px solid black' }} p={'lg'} gap='0.25rem' direction='column' align='center' justify='center'>
            <Center>
                <Loader />
            </Center>
        </Flex>
    }
    return (
        <Flex flex={'33%'} style={{ flexGrow: 1, border: '1px solid black' }} p={'lg'} gap='0.25rem' direction='column'>
            <Select data={filters} label='Индексируемый фильтр' onChange={e => {
                if (e !== null)
                    setMain(e as FilterType)
            }} />
            {main !== undefined && (
                <>
                    <div style={{ border: '1px solid red', margin: '0.12rem -0.25rem 0.12rem -0.25rem', padding: '0.12rem 0.25rem 0.12rem 0.25rem', borderRadius: '8px' }}>
                        {fields.find(element => element.value === main)?.field(setStats,
                            main === 'groupIds' ? dataGroups?.items?.map(group => {
                                return { value: group.id!, label: group.number! }
                            }) : main === 'companyIds' ? dataCompany?.items?.map(company => {
                                return { value: company.id, label: company.name }
                            }) : dataStack?.map(stack => {
                                return { value: stack.id, label: stack.name }
                            }))}
                    </div>
                    {fields.filter(element => element.value !== main)!.map(element => {
                        return <div key={element.value}>{element.field(setStats,
                            element.value === 'groupIds' ? dataGroups?.items?.map(group => {
                                return { value: group.id!, label: group.number! }
                            }) : element.value === 'companyIds' ? dataCompany?.items?.map(company => {
                                return { value: company.id, label: company.name }
                            }) : dataStack?.map(stack => {
                                return { value: stack.id, label: stack.name }
                            }))}</div>
                    })}
                </>
            )}
        </Flex>
    )
}
export const FiltersMemo = memo(Filters)