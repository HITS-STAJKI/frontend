import { Card, Center, Container, Loader, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery";
import { getErrorMessage } from "widgets/Helpes/GetErrorMessage";
import { ProfileBlock } from "widgets/ProfileBlock"

const UserProfilePage = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error, refetch } = useGetUserByIdQuery(id!)

    if (isLoading) 
    {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <Loader size="lg" />
            </Center>
        );
    }

    if (isError) 
    {
        return (
            <Container w="90%" fluid>
                <Card withBorder padding="lg" radius="md" shadow="sm" mt="xl" bg="red.1">
                    <Text ta="center" size="lg" color="red">
                        Ошибка при загрузке данных:
                    </Text>
                    <Text ta="center" size="sm" color="red">
                        {getErrorMessage(error)}
                    </Text>
                </Card>
            </Container>
        );
    }

    if (!data) 
    {
        return (
            <Center style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }} >
                <div>Информация не найдена не найдена</div>;
            </Center>
        );
    }

    return (
        <>
            <ProfileBlock profileData={data!} mode="user" onRefresh={refetch}/>
        </>
    )
}

export default UserProfilePage