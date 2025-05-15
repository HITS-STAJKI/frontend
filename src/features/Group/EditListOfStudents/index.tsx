import { Button } from '@mantine/core';
import { Group } from 'shared/lib';
import { Modal } from 'shared/ui';
import { AddStudentInGroupForm } from './form';
import { StudentCard } from 'entity/StudentCard';

type ViewStudentsButtonProps = {
    group: Group;
}

export const EditListOfStudentsButton = ({ group }: ViewStudentsButtonProps) => {
    return (
        <Modal
            title={`Список учащихся в группе ${group.number}`}
            render={open => (
                <Button variant="subtle" color="blue" onClick={() => open()} size="md">
                    {group.number}
                </Button>
            )}
            content={({ close }) => (
                <div>
                    <div>
                        {group.students.map(student => (
                            <StudentCard key={student.id} student={student} />
                        ))}
                    </div>
                    <AddStudentInGroupForm group={group} onSuccess={() => close()} />
                </div>
            )}
        />
    );
}