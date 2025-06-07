import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "services/api/api-client/UserQuery";
import { ProfileBlock } from "widgets/ProfileBlock"

export const UserProfilePage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetUserByIdQuery(id!)
    if (isLoading) {
        return 'Загрузка'
    }
    return (
        <>
            <ProfileBlock profileData={data!} mode="user" />
        </>
    )
}