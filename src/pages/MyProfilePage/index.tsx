import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery";
import { ProfileBlock } from "widgets/ProfileBlock"

const MyProfilePage = () => {
    const { data, isLoading } = useGetCurrentUserQuery()
    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <>
            <ProfileBlock profileData={data!} mode="my" />
        </>
    )
}

export default MyProfilePage