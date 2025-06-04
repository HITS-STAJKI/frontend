import { Container, Flex } from "@mantine/core";
import { FilterBlockShort, FilterCompanySelect, FilterGroup, FilterName, FilterTrueFalseNull } from "entity";
import { useState } from "react";
import { GET_PRACTICES, GET_STUDENT, PracticeRequestPage, Student } from "shared/lib";
import { PracticesFormOver, PracticesFormUnder, PracticesList } from "widgets/StudentPracticesForm";

export const StudentPracticesPage = () => {
    const [practices, setPractices] = useState<PracticeRequestPage>(GET_PRACTICES);
    const [student, setStudent] = useState<Student>(GET_STUDENT);

    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <PracticesFormOver studentName={student.user.fullname} group={student.group.number}/>
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