import { Container, Flex } from "@mantine/core";
import { FilterBlockShort, FilterCompanySelect, FilterGroup, FilterName, FilterTrueFalseNull } from "entity";
import { useState } from "react";
import { GET_PRACTICES, PracticeRequestPage } from "shared/lib";
import { PracticesFormUnder, PracticesList } from "widgets/StudentsPracticesForm";

export const StudentsPracticesPage = () => {
    const [practices, setPractices] = useState<PracticeRequestPage>(GET_PRACTICES);

    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <FilterBlockShort availableFilters={[
                    {id: "name",label: "ФИО",element: (props) => <FilterName id="name" onChangeValue={props.onChangeValue} />},
                    {id: "company",label: "Компания",element: (props) => <FilterCompanySelect id="company" onChangeValue={props.onChangeValue} />},
                    {id: "group",label: "Группа",element: (props) => <FilterGroup id="group" onChangeValue={props.onChangeValue} />},
                    {id: "reportavailibility",label: "Отчёт по практике",element: (props) => <FilterTrueFalseNull id="reportavailibility" onChangeValue={props.onChangeValue} />},
                    {id: "reportapproved",label: "Отчёт подтверждён",element: (props) => <FilterTrueFalseNull id="reportapproved" onChangeValue={props.onChangeValue} />},
                    {id: "archive",label: "Архивная",element: (props) => <FilterTrueFalseNull id="archive" onChangeValue={props.onChangeValue} />},
                    {id: "practiveapprove",label: "Практика подтверждена",element: (props) => <FilterTrueFalseNull id="practiveapprove" onChangeValue={props.onChangeValue} />},
                ]}/>
                <PracticesFormUnder studentCount={10}/>
                <PracticesList content={practices.content} pagination={practices.pagination}/>
            </Flex>
        </Container>
    );
};