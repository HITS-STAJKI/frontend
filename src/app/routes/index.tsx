import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { CONCRETE_PARTNER_ROUTE, GROUPS_ROUTE, LOGIN_ROUTE, PARTNERS_ROUTE, REGISTRATION_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"
import { GroupsPage } from "pages/GroupsPage"
import { PartnersPage } from "pages/PartnersPage"
import { ConcretePartnerPage } from "pages/ConcretePartnerPage"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
                <Route path={GROUPS_ROUTE} element={<GroupsPage />} />
                <Route path={PARTNERS_ROUTE} element={<PartnersPage />} />
                <Route path={CONCRETE_PARTNER_ROUTE} element={<ConcretePartnerPage />} />
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}