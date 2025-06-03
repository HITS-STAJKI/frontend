import { Student } from "shared/lib"
import { Card, Flex } from '@mantine/core';
import { DeleteStudentFromGroupButton } from "features/Group/DeleteStudentFromGroupButton";

type StudentProps = {
    student: Student;
}

export const StudentCard = ({ student }: StudentProps) => {
    return (
        <Card withBorder mb="md">
            <Flex justify='space-between'>
                
                {student.user.lastName} {student.user.firstName}
                <DeleteStudentFromGroupButton student={student} />
                
            </Flex>
        </Card>
    )
}