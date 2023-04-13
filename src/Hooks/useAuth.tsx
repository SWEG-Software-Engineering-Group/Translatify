import { Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import User from "../types/User";
import Tenant from "../types/Tenant";

  // Implement your particular AWS Amplify configuration
  const amplifyConfigurationOptions = {
    userPoolRegion: "eu-west-2",
    userPoolId: "eu-west-2_tleAXoqbb",
    userPoolWebClientId: "4aftvoo24j5sudsk0mjqcqcpeh",
  };

Auth.configure(amplifyConfigurationOptions);

interface UseAuth {
    isLoading: boolean;
    isAuthenticated: boolean;
    idTokenAPI: string;
    user : User;
    tenant: Tenant;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => void;
}

interface Result {
    success: boolean;
    message: string;
}

type Props = {
    children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>({} as User);
    const [tenant, setTenant] = useState<Tenant>({} as Tenant);
    const [idTokenAPI, setIdTokenAPI] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUser({username : result.username, ...result.attributes, role: result.signInUserSession.idToken.payload['cognito:groups'][0]});
                //setTenant(something) 
                setIdTokenAPI(result.signInUserSession.idToken.jwtToken);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUser({} as User);
                //setTenant(something) 
                setIdTokenAPI("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            setUser({username : result.username, ...result.attributes, role: result.signInUserSession.idToken.payload['cognito:groups'][0]});
            //setTenant(something) 
            setIdTokenAPI(result.signInUserSession.idToken.jwtToken);
            setIsAuthenticated(true);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGIN FAIL",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUser({} as User);
            //setTenant(something) 
            setIdTokenAPI("");
            setIsAuthenticated(false);
            return { success: true, message: "Logout done" };
        } catch (error) {
            return {
                success: false,
                message: "LOGOUT FAIL",
            };
        }
    };


    console.log(user, "USER")
    return {
        isLoading,
        isAuthenticated,
        idTokenAPI,
        user,
        tenant,
        signIn,
        signOut,
    };
};