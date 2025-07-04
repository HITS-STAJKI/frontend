import { ProfileForm } from "./Form";
import { Title, Badge, Text } from "@mantine/core";
import { ChangePassword } from "features/ChangePassword";
import { RemoveFromAcadem } from "features/AcademicLeave/RemoveFromAcadem";
import { SendToAcadem } from "features/AcademicLeave";
import { UserDetailsDto } from "services/api/api-client.types";
import { Logout } from "features";
import { DeleteRole } from "features/DeleteRole";
import { ReinstateStudent } from "features/ReinstateStudent"

type ProfileBlockProps = {
    profileData: UserDetailsDto;
    mode: "my" | "user";
    onRefresh?: () => void;
};

export const ProfileBlock = ({ profileData, mode, onRefresh }: ProfileBlockProps) => {
    const isStudent = !!profileData.student;

    const renderActionButton = ({ profileData }: { profileData: UserDetailsDto }) => {
        if (mode === "my") {
            return <ChangePassword onRefresh={onRefresh} />;
        }

        if (mode === "user" && isStudent) {
            if (profileData.student?.isAcadem) {
                return (
                    <RemoveFromAcadem user={profileData} onRefresh={onRefresh} />
                );
            }
            else {
                return (
                    <>
                        {!profileData.student?.isAcadem && <SendToAcadem user={profileData} />}
                        {profileData.student?.isGraduated && <ReinstateStudent user={profileData} />}

                    </>
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
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                    {renderActionButton({ profileData })}
                    {mode === 'user' ? <DeleteRole profileData={profileData} /> : <Logout />}
                </div>
            </div>

            <div style={{ marginBottom: '1vh' }}>
                {profileData.dean && <Badge variant="gradient" gradient={{ from: 'red', to: 'orange' }} mr="xs">Деканат</Badge>}
                {profileData.student && profileData.student?.group !== null && profileData.student?.number !== null && <Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} mr="xs">{profileData.student?.group.number}</Badge>}
                {profileData.curator?.companyPartner.name && <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} mr="xs">{profileData.curator?.companyPartner.name}</Badge>}
                {profileData.teacher && <Badge color="grape" mr="xs">Учитель</Badge>}
                {profileData.educationalProgramLead && <Badge color="yellow" mr="xs">Рук. ОП</Badge>}
            </div>

            <ProfileForm profileInfo={profileData} mod={mode} onSuccess={onRefresh} />
            {(!!!profileData.curator && !!!profileData.dean && !!!profileData.educationalProgramLead && !!!profileData.student && !!!profileData.teacher) && <div>Ожидайте пока вам выдадут роль</div>}

        </div>
    )
}