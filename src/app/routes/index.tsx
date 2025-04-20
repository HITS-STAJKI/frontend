import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANGUAGES_ROUTE, STACKS_ROUTE, INTERVIEW_REPORT, ROLES_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"

import { LanguagePage } from "../../pages/LanguagePage";
import { StackPage } from "../../pages/StackPage";
import { PrivateLayout } from "./layout/PrivateLayout"
import { InterviewReportPage } from "pages/InterviewReportPage"
import { RolesPage } from "pages/RolesPage"

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
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Route>
        </Routes>
    )
}