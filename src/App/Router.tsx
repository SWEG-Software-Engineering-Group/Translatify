import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReviewTextsView from '../views/ReviewTextsView/ReviewTextsView';
import CreateEditTextView from '../views/CreateEditTextView/CreateEditTextView';
import CreateTenantView from '../views/CreateTenantView/CreateTenantView';
import LoginView from '../views/LoginView/LoginView';
import SuperAdminView from '../views/SuperAdminView/SuperAdminView';
import SingleTenantView from '../views/SingleTenantView/SingleTenantView';
import AdminView from '../views/AdminView/AdminView';
import CreateTranslationView from '../views/CreateTranslationView/CreateTranslationView';
import CreateUserView from '../views/CreateUserView/CreateUserView';
import TenantTextsView from '../views/TenantTextsView/TenantTextsView';
import UserView from '../views/UserView/UserView';
import LinksView from '../views/LinksView';
import TenantSettingView from '../views/TenantSettingsView/TenantSettingsView';
import ForgotPasswordView from '../views/LoginView/ForgotPasswordView';
import TenantCategoriesView from '../views/TenantTextCategoriesView/TenantTextCategoriesView';
import HomePage from '../views/HomePage/HomePage';
import AccessDeniedView from '../views/AccessDeniedView/AccessDeniedView';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>;
                <Route path="/login" element={<LoginView />}/>;
                <Route path="/CreateTenant" element={<CreateTenantView />}/>;
                <Route path="/CreateUser" element={<CreateUserView />}/>;
                <Route path="/CreateUser/:tenantId" element={<CreateUserView />}/>;
                <Route path="/SuperAdmin" element={<SuperAdminView />}/>;
                <Route path="/write" element={<CreateEditTextView />}/>;
                <Route path="/edit/:categoryId/:textTitle" element={<CreateEditTextView />}/>;
                <Route path="/editTranslation/:categoryId/:textTitle/:language" element={<CreateTranslationView />}/>;
                <Route path="/ReviewTexts" element={<ReviewTextsView />}/>;
                <Route path="/Admin" element={<AdminView />}/>;
                <Route path="/TenantTexts" element={<TenantTextsView />}/>;
                <Route path="/TenantSettings" element={<TenantSettingView />}/>;
                <Route path="/TenantTextCategories" element={<TenantCategoriesView />}/>;
                <Route path="/tenant/:id" element={<SingleTenantView />} />;
                <Route path="User" element={<UserView />} />;
                <Route path="/ForgotPassword" element={<ForgotPasswordView />} />
                <Route path="/links" element={<LinksView />}/>
                <Route path="/accessDenied" element={<AccessDeniedView />}/>
            </Routes>
        </BrowserRouter>
    )
}