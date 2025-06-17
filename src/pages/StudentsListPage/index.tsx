import { Container, Flex } from "@mantine/core";
import { FilterBlockShort, FilterCompanySelect, FilterInterviewStatus, FilterName, FilterTrueFalseNull } from "entity";
import { useState } from "react";
import { GET_PRACTICES, GET_STUDENT, PracticeRequestPage, Student } from "shared/lib";
import { StudentsCommentaryForm, StudentsFormUnder, StudentsListForm } from "widgets/StudentsListForm";

export const StudentsListPage = () => {
    const [practices, setPractices] = useState<PracticeRequestPage>(GET_PRACTICES);
    const [student, setStudent] = useState<Student>(GET_STUDENT);

    return (
        <Container fluid>
            <Flex direction="column" style={{ width: '95%', margin: '0 auto' }} gap="md">
                <FilterBlockShort availableFilters={[
                    { id: "name", label: "ФИО", element: (props) => <FilterName id="name" onChangeValue={props.onChangeValue} /> },
                    { id: "interviewavailibility", label: "Был ли отбор", element: (props) => <FilterTrueFalseNull id="interviewavailibility" onChangeValue={props.onChangeValue} /> },
                    { id: "company", label: "Компания", element: (props) => <FilterCompanySelect id="company" onChangeValue={props.onChangeValue} initialValue={props.initialValue} /> },
                    { id: "interviewresult", label: "Результат отбора", element: (props) => <FilterInterviewStatus id="interviewresult" onChangeValue={props.onChangeValue} /> },
                ]} />
                <StudentsFormUnder studentCount={10} />
                <StudentsListForm items={practices.items} pagination={practices.pagination} />
                <StudentsCommentaryForm />
            </Flex>
        </Container>
    );
};