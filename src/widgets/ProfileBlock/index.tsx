import { ProfileForm } from "./Form";
import { Title, Badge, Text } from "@mantine/core";
import { ChangePassword } from "features/ChangePassword";
import { RemoveFromAcadem } from "features/AcademicLeave/RemoveFromAcadem";
import { SendToAcadem } from "features/AcademicLeave";
import { UserDetailsDto } from "services/api/api-client.types";

type ProfileBlockProps = {
    profileData: UserDetailsDto;
    mode: "my" | "user";
};

export const ProfileBlock = ({
    profileData,
    mode,
}: ProfileBlockProps) => {
    const isStudent = !!profileData.student;

    const renderActionButton = () => {
        if (mode === "my") {
            return <ChangePassword />;
        }

        if (mode === "user" && isStudent) {
            if (profileData.student?.isAcadem) {
                return (
                    <RemoveFromAcadem user={profileData} />
                );
            } else {
                return (
                    <SendToAcadem user={profileData} />
                );
            }
        }

        return null;
    };

    return (
        <div style={{ marginTop: '2vh', marginLeft: '4vw', width: '50vw', minWidth: "300px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title order={2}>Профиль</Title>
                {profileData.student?.isGraduated && <Text c="gray" ml="xs">(Выпустился)</Text>}
                {profileData.student?.isAcadem && <Text c="red" ml="xs">(В академе)</Text>}
                <div style={{ marginLeft: 'auto' }}>
                    {renderActionButton()}
                </div>
            </div>

            <div style={{ marginBottom: '1vh' }}>
                {profileData.dean && <Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }} mr="xs">Деканат</Badge>}
                {profileData.student?.group !== null && profileData.student?.number !== null && <Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} mr="xs">{profileData.student?.group.number}</Badge>}
                {profileData.curator?.companyPartner.name && <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} mr="xs">{profileData.curator?.companyPartner.name}</Badge>}
                {profileData.teacher && <Badge color="grape" mr="xs">Учитель</Badge>}
                {profileData.educationalProgramLead && <Badge color="yellow" mr="xs">Рук. ОП</Badge>}
            </div>

            <ProfileForm profileInfo={profileData} mod={mode} />

        </div>
    )
}