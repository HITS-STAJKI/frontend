import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"

import { LanguagePage } from "../../pages/LanguagePage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
                <Route path="/languages" element={<LanguagePage />} />
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}