import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminReviewTextsView from '../views/AdminReviewTextsView/AdminReviewTextsView';
import CreateEditTextView from '../views/CreateEditTextView/CreateEditTextView';
import CreateTenantView from '../views/CreateTenantView/CreateTenantView';
import LoginView from '../views/LoginView/LoginView';
import SuperAdminView from '../views/SuperAdminView/SuperAdminView';
import SingleTenantView from '../views/SingleTenantView/SingleTenantView';

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginView />}/>;
                <Route path="/CreateTenant" element={<CreateTenantView />}/>;
                <Route path="/SuperAdmin" element={<SuperAdminView />}/>;
                <Route path="/write" element={<CreateEditTextView />}/>;
                <Route path="/edit/:textId" element={<CreateEditTextView />}/>;
                <Route path="/reviewTexts" element={<AdminReviewTextsView />}/>;
                <Route path="/tenant/:id" element={<SingleTenantView tenantId={1} />} />
                
                {/* <Route path="/login" element={<LoginView />}/>;
                <Route path="/todo/:parametro" element={<PaginaContenutaNellaCartellaViews/>}/>; */}

            </Routes>
        </BrowserRouter>
    )
}