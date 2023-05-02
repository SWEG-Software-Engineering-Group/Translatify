import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PrivateRouteProps = {
    allowedUsers? : string[];  //list of user types that grant access to the page
    children?: React.ReactNode;
};

function PrivateRoute ({allowedUsers = [], children } : PrivateRouteProps){
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated)
        return <Navigate to="/login" />;
    else if (allowedUsers.includes(user.group))
        return <>{children}</>;    
    else{
        console.log("You don't have permission to access this page, you have been redirected to the home page (/)");
        return <Navigate to="/accessDenied" />;
    }
};

export default PrivateRoute;