import React, { useState } from "react";
import { Button, Select, Collapse, Flex, Box } from "@mantine/core";
import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";


{/*<FilterBlockShort availableFilters={[
    {id: "languageName",label: "Название технологии",element: (props) => <FilterLanguageName id="languageName" onChangeValue={props.onChangeValue} />},
    {id: "name",label: "ФИО",element: (props) => <FilterName id="name" onChangeValue={props.onChangeValue} />},
    {id: "stack",label: "Направление",element: (props) => <FilterStack id="stack" onChangeValue={props.onChangeValue} />},
    {id: "languages",label: "Технологии",element: (props) => <FilterLanguageMultiple id="languages" onChangeValue={props.onChangeValue} />},
    {id: "group",label: "Группа",element: (props) => <FilterGroup id="group" onChangeValue={props.onChangeValue} />},
    {id: "interviewStatus",label: "Статус отбора",element: (props) => <FilterInterviewStatus id="interviewStatus" onChangeValue={props.onChangeValue} />},
    {id: "date",label: "Дата",element: (props) => <FilterDate id="date" onChangeValue={props.onChangeValue} />},
    {id: "companyname", label: "Название компании",element: (props) => <FilterCompanyName id="companyname" onChangeValue={props.onChangeValue} />},
    {id: "company",label: "Компания",element: (props) => <FilterCompanySelect id="company" onChangeValue={props.onChangeValue} />},
    {id: "companyType",label: "Новая компания",element: (props) => <FilterTrueFalseNull id="companyType" onChangeValue={props.onChangeValue} />},
    {id: "groups",label: "Группы",element: (props) => <FilterGroupMultiple id="groups" onChangeValue={props.onChangeValue} />},
    {id: "truefalse",label: "Да?",element: (props) => <FilterTrueFalseNull id="truefalse" onChangeValue={props.onChangeValue} />},
    {id: "userRole",label: "Роль пользователя",element: (props) => <FilterUserRole id="userRole" onChangeValue={props.onChangeValue} />},
    {id: "stackName",label: "Название стэка",element: (props) => <FilterStackName id="stackName" onChangeValue={props.onChangeValue} />},
    {id: "groupName",label: "Номер группы",element: (props) => <FilterGroupName id="groupName" onChangeValue={props.onChangeValue} />}
]}/>*/}

const pageSizes = [10, 15, 20, 25, 50, 100];

type FilterItem = 
{
    id: string;
    label: string;
    element: (props: 
        { 
            onChangeValue: (val: any) => void 
        }) => React.ReactNode;
};


type FilterBlockProps = 
{
    availableFilters: FilterItem[];
    printButton?: boolean;
};


export function FilterBlockFull({ availableFilters, printButton}: FilterBlockProps) 
{
    const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null);
    const [selectedPage, setSelectedPage] = useState<number>(10);
    const [activeFilters, setActiveFilters] = useState<FilterItem[]>([]);
    const [opened, setOpened] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    const handleAddFilter = () => 
    {
        if (!selectedFilterId)
        {
            return;
        }

        if (activeFilters.some(f => f.id === selectedFilterId))
        {
            return;
        }

        const filterToAdd = availableFilters.find(f => f.id === selectedFilterId);

        if (filterToAdd) 
        {
            setActiveFilters(prev => [...prev, filterToAdd]);
            setOpened(true);
        }

        setSelectedFilterId(null);
    };

    const handleRemoveFilter = (id: string) => 
    {
        const updated = activeFilters.filter(f => f.id !== id);

        if (updated.length === 0) 
        {
            setOpened(false);
            setTimeout(() => setActiveFilters([]), 300);
        } 
        else
        {
            setActiveFilters(updated);
        }

        setFilterValues(prev => 
        {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const handleClear = () => 
    {
        setOpened(false);
        setTimeout(() => setActiveFilters([]), 300);
        setFilterValues({});
    };

    const handleChangePage = (value: string | null) => {
        if (value !== null) {
        setSelectedPage(Number(value));
        }
    };

    const handleSearch = () => 
    {
        console.log("🔍 Filter values:", filterValues);
    };

    const handlePrint = () => 
    {
        console.log("Печать");
    };

    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap="md" style={{ flex: 1, minWidth: 0 }}>
                    <Box style={{ flex: '0 0 33.33%', minWidth: 0 }}>
                        <Select
                            placeholder="Выберите фильтр"
                            value={selectedFilterId}
                            onChange={setSelectedFilterId}
                            data={availableFilters.map(f => ({ value: f.id, label: f.label }))}
                            styles={{ input: { minWidth: 0 } }}
                        />
                    </Box>
                    <Box style={{ flex: '0 0 auto' }}>
                        <Button onClick={handleAddFilter}>
                            Добавить
                        </Button>
                    </Box>
                </Flex>

                <Flex align="center" gap="md">
                    <Select
                        placeholder="Выберите количество"
                        value={selectedPage.toString()}
                        onChange={handleChangePage}
                        data={pageSizes.map(size => ({ value: size.toString(), label: size.toString() }))}
                        styles={{ input: { minWidth: 0 } }}
                    />
                    <Button color="green" onClick={handleSearch}>
                        Поиск
                    </Button>
                    <Button color="red" onClick={handleClear}>
                        Очистить
                    </Button>
                    {printButton ? (
                        <Button color="gray" onClick={handlePrint}>
                            Печать
                        </Button>) : null
                    }
                    {activeFilters.length > 0 && (
                        <Button
                            variant="subtle"
                            onClick={() => setOpened(o => !o)}
                            px={8}
                            style={{ height: 36 }}
                            >
                            {opened ? 
                                <IconChevronUp size={18} /> : 
                                <IconChevronDown size={18} />
                            }
                        </Button>
                    )}
                </Flex>
            </Flex>

            <Collapse in={opened}>
                <Box pt="sm">
                    <Flex direction="column" gap="sm">
                        {activeFilters.map(f => (
                            <Flex key={f.id} align="center" gap="sm">
                                <Button
                                    variant="subtle"
                                    color="red"
                                    size="xs"
                                    onClick={() => handleRemoveFilter(f.id)}
                                    style={{ alignSelf: "center" }}
                                >
                                    <IconX/>
                                </Button>

                                <Flex align="center" gap="sm" style={{ flex: 1 }}>
                                    <Box style={{ flex: 1, textAlign: "left", paddingRight: 4 }}>
                                        {f.label}
                                    </Box>
                                    <Box style={{ flex: 1 }}>
                                        {f.element({
                                            onChangeValue: (val: any) => {
                                                setFilterValues(prev => ({ ...prev, [f.id]: val }));
                                            },
                                        })}
                                    </Box>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Collapse>
        </Box>
    );
}

export function FilterBlockShort({ availableFilters, printButton }: FilterBlockProps) 
{
    const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null);
    const [selectedPage, setSelectedPage] = useState<number>(10);
    const [activeFilters, setActiveFilters] = useState<FilterItem[]>([]);
    const [opened, setOpened] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});

    const handleAddFilter = () => 
    {
        if (!selectedFilterId)
        {
            return;
        }

        if (activeFilters.some(f => f.id === selectedFilterId))
        {
            return;
        }

        const filterToAdd = availableFilters.find(f => f.id === selectedFilterId);

        if (filterToAdd) 
        {
            setActiveFilters(prev => [...prev, filterToAdd]);
            setOpened(true);
        }

        setSelectedFilterId(null);
    };

    const handleRemoveFilter = (id: string) => 
    {
        const updated = activeFilters.filter(f => f.id !== id);

        if (updated.length === 0) 
        {
            setOpened(false);
            setTimeout(() => setActiveFilters([]), 300);
        } 
        else
        {
            setActiveFilters(updated);
        }

        setFilterValues(prev => 
        {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const handleClear = () => 
    {
        setOpened(false);
        setTimeout(() => setActiveFilters([]), 300);
        setFilterValues({});
    };

    const handleChangePage = (value: string | null) => {
        if (value !== null) {
        setSelectedPage(Number(value));
        }
    };

    const handleSearch = () => 
    {
        console.log("🔍 Filter values:", filterValues);
    };

    const handlePrint = () => 
    {
        console.log("Печать");
    };

    return (
        <Box p="md" style={{ border: "1px solid #ccc", borderRadius: 8 }}>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap="md" style={{ flex: 1, minWidth: 0 }}>
                    <Box style={{ flex: '0 0 33.33%', minWidth: 0 }}>
                        <Select
                            placeholder="Выберите фильтр"
                            value={selectedFilterId}
                            onChange={setSelectedFilterId}
                            data={availableFilters.map(f => ({ value: f.id, label: f.label }))}
                            styles={{ input: { minWidth: 0 } }}
                        />
                    </Box>
                    <Box style={{ flex: '0 0 auto' }}>
                        <Button onClick={handleAddFilter}>
                            Добавить
                        </Button>
                    </Box>
                </Flex>

                <Flex align="center" gap="md">
                    <Select
                        placeholder="Выберите количество"
                        value={selectedPage.toString()}
                        onChange={handleChangePage}
                        data={pageSizes.map(size => ({ value: size.toString(), label: size.toString() }))}
                        styles={{ input: { minWidth: 0 } }}
                    />
                    <Button color="green" onClick={handleSearch}>
                        Поиск
                    </Button>
                    <Button color="red" onClick={handleClear}>
                        Очистить
                    </Button>
                    {printButton ? (
                        <Button color="gray" onClick={handlePrint}>
                            Печать
                        </Button>) : null
                    }
                    {activeFilters.length > 0 && (
                        <Button
                            variant="subtle"
                            onClick={() => setOpened(o => !o)}
                            px={8}
                            style={{ height: 36 }}
                            >
                            {opened ? 
                                <IconChevronUp size={18} /> : 
                                <IconChevronDown size={18} />
                            }
                        </Button>
                    )}
                </Flex>
            </Flex>

            <Collapse in={opened}>
                <Box pt="sm">
                    <Flex direction="column" gap="sm">
                        {activeFilters.map(f => (
                            <Flex key={f.id} align="center" gap="sm">
                                <Button
                                    variant="subtle"
                                    color="red"
                                    size="xs"
                                    onClick={() => handleRemoveFilter(f.id)}
                                    style={{ alignSelf: "center" }}
                                >
                                    <IconX/>
                                </Button>

                                <Flex align="center" gap="sm" style={{ flex: 1 }}>
                                    <Box style={{ flex: 1, textAlign: "left", paddingRight: 4 }}>
                                        {f.label}
                                    </Box>
                                    <Box style={{ flex: 1 }}>
                                        {f.element({
                                            onChangeValue: (val: any) => {
                                                setFilterValues(prev => ({ ...prev, [f.id]: val }));
                                            },
                                        })}
                                    </Box>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Collapse>
        </Box>
    );
}
