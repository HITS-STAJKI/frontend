import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANGUAGES_ROUTE, STACKS_ROUTE, INTERVIEW_REPORT, ROLES_ROUTE, GROUPS_ROUTE, PARTNERS_ROUTE, CONCRETE_PARTNER_ROUTE, MY_PROFILE_ROUTE, PERSON_PROFILE_ROUTE, STUDENTS_PRACTICES_ROUTE, STUDENT_PRACTICES_ROUTE, PRACTICE_ROUTE, STUDENTS_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"

import { LanguagePage } from "../../pages/LanguagePage";
import { StackPage } from "../../pages/StackPage";
import { PrivateLayout } from "./layout/PrivateLayout"
import { InterviewReportPage } from "pages/InterviewReportPage"
import { RolesPage } from "pages/RolesPage"
import { GroupsPage } from "pages/GroupsPage"
import { PartnersPage } from "pages/PartnersPage"
import { ConcretePartnerPage } from "pages/ConcretePartnerPage"
import { MyProfilePage } from "pages/MyProfilePage"
import { UserProfilePage } from "pages/UserProfilePage"
import { StudentsPracticesPage } from "pages/StudentsPracticesPage"
import { StudentPracticesPage } from "pages/StudentPracticesPage"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />

            </Route>
            <Route element={<PrivateLayout />}>
                <Route path={LANGUAGES_ROUTE} element={<LanguagePage />} />
                <Route path={STACKS_ROUTE} element={<StackPage />} />
                <Route path={ROLES_ROUTE} element={<RolesPage />} />
                <Route path={INTERVIEW_REPORT} element={<InterviewReportPage />} />
                <Route path={GROUPS_ROUTE} element={<GroupsPage />} />
                <Route path={PARTNERS_ROUTE} element={<PartnersPage />} />
                <Route path={CONCRETE_PARTNER_ROUTE} element={<ConcretePartnerPage />} />
                <Route path={MY_PROFILE_ROUTE} element={<MyProfilePage />} />
                <Route path={PERSON_PROFILE_ROUTE} element={<UserProfilePage />} />
                <Route path={STUDENTS_PRACTICES_ROUTE} element={<StudentsPracticesPage />} />
                <Route path={STUDENT_PRACTICES_ROUTE} element={<StudentPracticesPage />} />
                <Route path={PRACTICE_ROUTE} element={<StudentsPracticesPage />} />
                <Route path={STUDENTS_ROUTE} element={<StudentsPracticesPage />} />
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}