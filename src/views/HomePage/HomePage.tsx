import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function HomePage(){
    const auth = useAuth();
    return(
        auth.isAuthenticated ? 
        <LayoutWrapper userType={auth.user.role}>
            <div></div>
        </LayoutWrapper>
        :
        <LayoutWrapper userType={null}>
            <div></div>
        </LayoutWrapper>
    );
}