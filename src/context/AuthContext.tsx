'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import { IUserSession } from "@/types";

interface IContext {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void;
}

const AuthContext = createContext<IContext>({
    userData: null,
    setUserData: () => {}
});

interface IProvider {
    children: React.ReactElement
}

export const AuthProvider: React.FC<IProvider> = ({ children }) => {
    const [userData, setUserData] = useState<IUserSession | null>(null);

    useEffect(() => {
        if (userData) {
            localStorage.setItem("userSession", JSON.stringify({ token: userData.token, userData: userData }));
        }
    }, [userData]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession");
            if (userData) {
                setUserData(JSON.parse(userData));
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);