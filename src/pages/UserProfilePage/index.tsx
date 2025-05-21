import { UserProfileType } from "shared/lib";
import { ProfileBlock } from "widgets/ProfileBlock"

export const UserProfilePage = () => {
    //stub, удалить потом
    const profileData: UserProfileType = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: "example@example.ru",
        fullName: "Иванов Иван Иванович",
        // dean: {
        //     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        // },
        student: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            isAcadem: true,
            isGraduated: false,
            group: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            number: "972202"
            }
        },
        // curator: {
        //     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     companyPartner: {
        //       id: "3ea42ea8-5258-4086-a43f-113ff89577a1",
        //       name: "1Сники",
        //       fileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        //     }
        //   },
        //   teacher: {
        //     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        //   },
        //   educationalProgramLead: {
        //     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        //   }
    };
    return (
        <>
            <ProfileBlock profileData={profileData} mode="user" />
        </>
    )
}