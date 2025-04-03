import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANGUAGES_ROUTE, STACKS_ROUTE, SELECTION_ROUTE } from "shared/lib"
import { RegistrationPage } from "pages/RegistrationPage"
import { LoginPage } from "pages/LoginPage"

import { LanguagePage } from "../../pages/LanguagePage";
import { StackPage } from "../../pages/StackPage";
import { SelectionPage } from "pages/SelectionPage"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
                <Route path={LANGUAGES_ROUTE} element={<LanguagePage />} />
                <Route path={STACKS_ROUTE} element={<StackPage />} />
                <Route path={SELECTION_ROUTE} element={<SelectionPage />} /> {/*Пока только комменты*/}
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}