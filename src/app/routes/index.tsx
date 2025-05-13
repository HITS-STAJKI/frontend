import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANGUAGES_ROUTE, STACKS_ROUTE, INTERVIEW_REPORT, ROLES_ROUTE, GROUPS_ROUTE, PARTNERS_ROUTE, CONCRETE_PARTNER_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"

import { LanguagePage } from "../../pages/LanguagePage";
import { StackPage } from "../../pages/StackPage";
import { RolesPage } from "pages/RolesPage"
import { InterviewReportPage } from "pages/InterviewReportPage"
import { PrivateLayout } from "./layout/PrivateLayout"
import { GroupsPage } from "pages/GroupsPage"
import { PartnersPage } from "pages/PartnersPage"
import { ConcretePartnerPage } from "pages/ConcretePartnerPage"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
                <Route path={LANGUAGES_ROUTE} element={<LanguagePage />} />
                <Route path={STACKS_ROUTE} element={<StackPage />} />
                <Route path={ROLES_ROUTE} element={<RolesPage />} />
            </Route>
            <Route element={<PrivateLayout />}>
                <Route path={INTERVIEW_REPORT} element={<InterviewReportPage />} />
                <Route path={GROUPS_ROUTE} element={<GroupsPage />} />
                <Route path={PARTNERS_ROUTE} element={<PartnersPage />} />
                <Route path={CONCRETE_PARTNER_ROUTE} element={<ConcretePartnerPage />} />
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}