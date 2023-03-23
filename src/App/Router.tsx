import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminReviewTextsView from '../views/AdminReviewTextsView/AdminReviewTextsView';
import CreateEditTextView from '../views/CreateEditTextView/CreateEditTextView';
import CreateTenantView from '../views/CreateTenantView/CreateTenantView';
import LoginView from '../views/LoginView/LoginView';
import SuperAdminView from '../views/SuperAdminView/SuperAdminView';
import SingleTenantView from '../views/SingleTenantView/SingleTenantView';
import AdminMainPageView from '../views/AdminMainPageView/AdminMainPageView';
import CreateTranslationView from '../views/CreateTranslationView/CreateTranslationView';
import CreateUserView from '../views/CreateUserView/CreateUserView';

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
                <Route path="/createTranslation" element={<CreateTranslationView />}/>;
                <Route path="/reviewTexts" element={<AdminReviewTextsView />}/>;
                <Route path="/Admin" element={<AdminMainPageView />}/>;
                <Route path="/tenant/:id" element={<SingleTenantView tenantId={1} />} />
                
                {/* <Route path="/login" element={<LoginView />}/>;
                <Route path="/todo/:parametro" element={<PaginaContenutaNellaCartellaViews/>}/>; */}

            </Routes>
        </BrowserRouter>
    )
}