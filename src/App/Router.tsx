import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./App";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>;
               
                {/* <Route path="/login" element={<LoginView />}/>;
                <Route path="/todo/:parametro" element={<PaginaContenutaNellaCartellaViews/>}/>; */}

            </Routes>
        </BrowserRouter>
    )
}