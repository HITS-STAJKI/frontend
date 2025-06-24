import { Card, Grid, Text } from "@mantine/core"
import { User } from "shared/lib/api/entities/User";
import { EditUserButton } from "features/UsersList/UserEditButton";
import { DeleteUserButton } from "features/UsersList/UserDeleteButton";
import { UserDto } from "services/api/api-client.types";

export function UserCard({ user, number }: {user: UserDto} & { number: number }) {
    console.log("ooo", user.fullName)
    return (
        <Card key={user.id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex' }} data-role={JSON.stringify(user.roles)}>
            <Grid grow>

                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {number}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.fullName}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.roles?.map(role => roleTranslations[role.userRole!]).join(", ")}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <EditUserButton id={user.id!} />
                    <DeleteUserButton user={user} />
                </Grid.Col>
            </Grid>
        </Card>
    );
}

const roleTranslations: Record<string, string> = {
    ADMIN: "Админ",
    DEAN: "Декан",
    CURATOR: "Куратор",
    STUDENT: "Студент",
    TEACHER: "Преподаватель",
    EDUCATIONAL_PROGRAM_LEAD: "Руководитель образовательной программы"
};