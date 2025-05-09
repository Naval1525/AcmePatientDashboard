import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../lib/api';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile();
        }
        else {
            setIsLoading(false);
        }
    }, []);
    const fetchUserProfile = async () => {
        try {
            const userData = await authAPI.getProfile();
            setUser(userData);
        }
        catch (error) {
            console.error('Failed to fetch user profile:', error);
            localStorage.removeItem('token');
        }
        finally {
            setIsLoading(false);
        }
    };
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const { token, user } = await authAPI.login(email, password);
            localStorage.setItem('token', token);
            setUser(user);
        }
        catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const signup = async (email, password, name) => {
        setIsLoading(true);
        try {
            const { token, user } = await authAPI.signup(email, password, name);
            localStorage.setItem('token', token);
            setUser(user);
        }
        catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
