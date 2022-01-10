import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider(props) {

    const [login, setLogin] = useState(false)
    const [token, setToken] = useState('')
    
    function logout() {
        try {
            window.FB.logout();
            console.log("user has been disconnected");
            setLogin(null)
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <AuthContext.Provider value={{
            login, 
            logout, 
            setLogin, 
            token, 
            setToken
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}