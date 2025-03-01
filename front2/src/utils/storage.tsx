import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
    signedIn: boolean;
    logIn: (token: string) => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [signedIn, setSignedIn] = useState<boolean>(!!localStorage.getItem("signedIn"));

    const logIn = (token: string) => {
        localStorage.setItem("signedIn", "true");
        localStorage.setItem("accessToken", token);
        setSignedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem("signedIn");
        localStorage.removeItem("accessToken");
        setSignedIn(false);
    };

    return (
        <AuthContext.Provider value={{ signedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};