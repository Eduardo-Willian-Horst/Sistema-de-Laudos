import React, { createContext, useState, useEffect } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuth: boolean) => void
    token: string | null
    setToken: (token: any) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    token: null,
    setToken: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken')
        if (storedToken) {
            // @ts-ignore
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('jwtToken')
        setIsAuthenticated(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, token, setToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;