import { Card, Grid, Text } from "@mantine/core"
import { User } from "shared/lib/api/entities/User";
import { EditUserButton } from "features/UsersList/UserEditButton";
import { DeleteUserButton } from "features/UsersList/UserDeleteButton";

export function UserCard({ id, email, firstName, lastName, roles }: User) {
    function handleEdit() {
    }

    function handleDelete() {
        console.log(id, firstName);
    }

    return (
        <Card key={id} shadow="sm" style={{ width: '100%', height: '64px', display: 'flex' }} data-role={JSON.stringify(roles)}>
            <Grid grow>
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {firstName + lastName}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {email}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {email}
                    </Text>
                </Grid.Col>                
                <Grid.Col span={2.5} style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: "center", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Text style={{ justifyContent: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {roles.map(role => roleTranslations[role.role]).join(", ")}
                    </Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <EditUserButton id={id}/>
                    <DeleteUserButton id={id}/>
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
    TEACHER: "Преподаватель"
};