import { Button } from '@mantine/core';
import { Modal } from 'shared/ui';
import { AddStudentInGroupForm } from './form';
import { StudentCard } from 'entity/StudentCard';
import { GroupDto } from "services/api/api-client.types";

type ViewStudentsButtonProps = {
    group: GroupDto;
}

export const EditListOfStudentsButton = ({ group }: ViewStudentsButtonProps) => {
    return (
        <Modal
            title={`Список учащихся в потоке ${group.number}`}
            render={open => (
                <Button variant="subtle" color="blue" onClick={() => open()} size="md">
                    {group.number}
                </Button>
            )}
            content={({ close }) => (
                <div>
                    <div>
                        {group.students!.map(student => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </div>
                    <AddStudentInGroupForm group={group} onSuccess={() => close()} />
                </div>
            )}
        />
    );
}