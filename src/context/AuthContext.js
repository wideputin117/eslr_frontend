import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useCallback, useEffect } from 'react';
import { apiClient } from '../api/client';
export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Load user on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await apiClient.getMe();
                    setUser(userData);
                }
                catch (err) {
                    localStorage.removeItem('token');
                    apiClient.clearToken();
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);
    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const { token, user: userData } = await apiClient.login(email, password);
            apiClient.setToken(token);
            setUser(userData);
        }
        catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const register = useCallback(async (email, password, name) => {
        setIsLoading(true);
        setError(null);
        try {
            const { token, user: userData } = await apiClient.register(email, password, name);
            apiClient.setToken(token);
            setUser(userData);
        }
        catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const logout = useCallback(() => {
        apiClient.clearToken();
        setUser(null);
        localStorage.removeItem('token');
    }, []);
    const refreshUser = useCallback(async () => {
        try {
            const userData = await apiClient.getMe();
            setUser(userData);
        }
        catch (err) {
            logout();
        }
    }, [logout]);
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isLoading,
            error,
            login,
            register,
            logout,
            refreshUser,
        }, children: children }));
};
