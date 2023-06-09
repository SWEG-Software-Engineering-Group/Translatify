import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PrivateRouteProps = {
    allowedUsers? : string[];
    children?: React.ReactNode;
};

function PrivateRoute ({allowedUsers = [], children } : PrivateRouteProps){
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated)
        return <Navigate to="/login" />;
    else if (allowedUsers.includes(user.group))
        return <>{children}</>;    
    else{
        return <Navigate to="/accessDenied" />;
    }
};

export default PrivateRoute;