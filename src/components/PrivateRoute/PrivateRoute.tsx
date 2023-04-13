import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
    allowedUsers? : string[];  //list of user types that grant access to the page
    children?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({allowedUsers = [], children }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated)
        return <Navigate to="/login" />;
    else if (allowedUsers.includes(user.role))
        return <>{children}</>;    
    else{
        console.log("You don't have permission to access this page, you have been redirected to the home page (/)");
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;