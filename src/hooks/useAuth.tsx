import { Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import User from "../types/User";
import Tenant from "../types/Tenant";
import { getData } from "../services/axios/axiosFunctions";

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
                setUser({username : result.username, ...result.attributes, group: result.signInUserSession.idToken.payload['cognito:groups'][0]});                
                setIdTokenAPI(result.signInUserSession.idToken.jwtToken);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUser({} as User);
                setIdTokenAPI("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
            if(localStorage['tenant'])
                setTenant(JSON.parse(localStorage['tenant']));            
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            setUser({username : result.username, ...result.attributes, group: result.signInUserSession.idToken.payload['cognito:groups'][0], surname : result.attributes['custom:surname']});
            setIdTokenAPI(result.signInUserSession.idToken.jwtToken);
            setIsAuthenticated(true);
            if(result.signInUserSession.idToken.payload['cognito:groups'][0] === 'superadmin'){
                setTenant({} as Tenant);
                localStorage.setItem('tenant', JSON.stringify({}));
            }
            else{
                try{
                    const userTenant = await getData(`${process.env.REACT_APP_API_KEY}/user/${result.username}/tenant`);                    
                    let tmpTenant = userTenant.data.tenants[0];
                    
                    tmpTenant = {id: tmpTenant.id, tenantName: tmpTenant.tenantName, defaultLanguage: tmpTenant.defaultLanguage, creationDate : tmpTenant.creationDate};
                    localStorage.setItem('tenant', JSON.stringify(tmpTenant));
                    setTenant(userTenant.data.tenants[0] as Tenant);
                } catch (error) {throw(error)};                
            }
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "Login has failed; please, try again later or contact technical support",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUser({} as User);
            setIdTokenAPI("");
            setIsAuthenticated(false);
            return { success: true, message: "Logout done" };
        } catch (error) {
            return {
                success: false,
                message: "Logout has failed; please, try again later or contact technical support",
            };
        }
    };

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