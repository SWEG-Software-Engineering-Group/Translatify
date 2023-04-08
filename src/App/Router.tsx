import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminReviewTextsView from '../views/AdminReviewTextsView/AdminReviewTextsView';
import CreateEditTextView from '../views/CreateEditTextView/CreateEditTextView';
import CreateTenantView from '../views/CreateTenantView/CreateTenantView';
import LoginView from '../views/LoginView/LoginView';
import SuperAdminView from '../views/SuperAdminView/SuperAdminView';
import SingleTenantView from '../views/SingleTenantView/SingleTenantView';
import AdminMainPageView from '../views/AdminMainPageView/AdminMainPageView';
import CreateTranslationView from '../views/CreateTranslationView/CreateTranslationView';
import CreateUserView from '../views/CreateUserView/CreateUserView';
import TenantTextsView from '../views/TenantTextsView/TenantTextsView';
import UserView from '../views/UserView/UserView';
import LinksView from '../views/LinksView';
import TenantSettingView from '../views/TenantSettingView/TenantSettingView';
import ForgotPasswordView from '../views/LoginView/ForgotPasswordView';
import TenantCategoriesView from '../views/TenantTextCategoriesView/TenantTextCategoriesView';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginView />}/>;
                <Route path="/CreateTenant" element={<CreateTenantView />}/>;
                <Route path="/CreateUser" element={<CreateUserView />}/>;
                <Route path="/SuperAdmin" element={<SuperAdminView />}/>;
                <Route path="/write" element={<CreateEditTextView />}/>;
                <Route path="/edit/:categoryId/:textId" element={<CreateEditTextView />}/>;
                <Route path="/writeTranslation" element={<CreateTranslationView />}/>;
                <Route path="/editTranslation/:categoryId/:textId/:language" element={<CreateTranslationView />}/>;
                <Route path="/reviewTexts" element={<AdminReviewTextsView />}/>;
                <Route path="/Admin" element={<AdminMainPageView />}/>;
                <Route path="/TenantTexts" element={<TenantTextsView />}/>;
                <Route path="/TenantSettings" element={<TenantSettingView />}/>;
                <Route path="/TenantTextCategories" element={<TenantCategoriesView />}/>;
                <Route path="/tenant/:id" element={<SingleTenantView />} />;
                <Route path="User" element={<UserView />} />;
                <Route path="/forgotPassword" element={<ForgotPasswordView />} />
                <Route path="/links" element={<LinksView />}/>
            </Routes>
        </BrowserRouter>
    )
}