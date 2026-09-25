import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken] = useState( // token in fetched from the browser
        localStorage.getItem("token")
    );

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
