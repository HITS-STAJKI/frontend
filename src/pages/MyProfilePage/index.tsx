import { useEffect } from "react";
import { useGetCurrentUserQuery } from "services/api/api-client/UserQuery";
import { ProfileBlock } from "widgets/ProfileBlock"

const MyProfilePage = () => {
    const { data, isLoading } = useGetCurrentUserQuery()
    useEffect(() => {
        if (data !== undefined) {
            localStorage.setItem('userId', data.id)
        }
    }, [data])
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