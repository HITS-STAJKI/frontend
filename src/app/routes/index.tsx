import { Navigate, Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, LANGUAGES_ROUTE, STACKS_ROUTE, INTERVIEW_REPORT, ROLES_ROUTE, GROUPS_ROUTE, PARTNERS_ROUTE, CONCRETE_PARTNER_ROUTE, MY_PROFILE_ROUTE, PERSON_PROFILE_ROUTE, STUDENTS_PRACTICES_ROUTE, STUDENT_PRACTICES_ROUTE, PRACTICE_ROUTE, STUDENTS_ROUTE, STATISTICS_ROUTE, SELECTION_FOR_STUDENT_ROUTE, SELECTION_FOR_TEACHER_ROUTE, MY_PRACTICE_ROUTE } from "shared/lib"

import { PrivateLayout } from "./layout/PrivateLayout"
import { lazy } from "react"

const LoginPage = lazy(() => import('pages/LoginPage'))
const RegistrationPage = lazy(() => import('pages/RegistrationPage'))
const LanguagePage = lazy(() => import('../../pages/LanguagePage'))
const StackPage = lazy(() => import('../../pages/StackPage'))
const InterviewReportPage = lazy(() => import('pages/InterviewReportPage'))
const RolesPage = lazy(() => import('pages/RolesPage'))
const GroupsPage = lazy(() => import('pages/GroupsPage'))
const PartnersPage = lazy(() => import('pages/PartnersPage'))
const ConcretePartnerPage = lazy(() => import('pages/ConcretePartnerPage'))
const MyProfilePage = lazy(() => import('pages/MyProfilePage'))
const UserProfilePage = lazy(() => import('pages/UserProfilePage'))
const StudentsPracticesPage = lazy(() => import('pages/StudentsPracticesPage'))
const StudentPracticesPage = lazy(() => import('pages/StudentPracticesPage'))
const StudentsListPage = lazy(() => import('pages/StudentsListPage'))
const Dashboard = lazy(() => import('pages/Dashboard'))
const SelectionStudentPage = lazy(() => import('pages/SelectionStudentPage'))
const SelectionTeacherPage = lazy(() => import('pages/SelectionTeacherPage'))
const StudentPractice = lazy(() => import('pages/StudentPractice'))
const MyPracticePage = lazy(() => import('pages/MyPracticePage'))

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
                <Route path={PRACTICE_ROUTE} element={<StudentPractice />} />
                <Route path={STUDENTS_ROUTE} element={<StudentsListPage />} />
                <Route path={SELECTION_FOR_STUDENT_ROUTE} element={<SelectionStudentPage />} />
                <Route path={SELECTION_FOR_TEACHER_ROUTE} element={<SelectionTeacherPage />} />
                <Route path={STATISTICS_ROUTE} element={<Dashboard />} />
                <Route path={MY_PRACTICE_ROUTE} element={<MyPracticePage />} />
            </Route>
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}