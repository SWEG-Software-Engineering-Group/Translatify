import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateTenantView from '../views/CreateTenantView/CreateTenantView';
import LoginView from '../views/LoginView/LoginView';
import SuperAdminView from '../views/SuperAdminView/SuperAdminView';
import App from "./App";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginView />}/>;
                <Route path="/" element={<CreateTenantView />}/>;
                <Route path="/SuperAdmin" element={<SuperAdminView />}/>;
                {/* <Route path="/login" element={<LoginView />}/>;
                <Route path="/todo/:parametro" element={<PaginaContenutaNellaCartellaViews/>}/>; */}

            </Routes>
        </BrowserRouter>
    )
}