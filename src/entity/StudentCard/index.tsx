import { Card, Flex } from '@mantine/core';
import { DeleteStudentFromGroupButton } from "features/Group/DeleteStudentFromGroupButton";
import { UserDto } from "services/api/api-client.types";

type StudentProps = {
    student: UserDto;
}

export const StudentCard = ({ student }: StudentProps) => {
    return (
        <Card withBorder mb="md">
            <Flex justify='space-between'>

                {student.fullName}
                <DeleteStudentFromGroupButton student={student} />

            </Flex>
        </Card>
    )
}