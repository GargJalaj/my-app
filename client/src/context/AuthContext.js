import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api'; // Import auth service

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user object { _id, name, email, token }
    const [isLoading, setIsLoading] = useState(true); // Loading state to check auth status initially

    // Function to load user from local storage or verify token on mount
    const loadUser = useCallback(async () => {
        setIsLoading(true);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Optional but recommended: Verify token with backend 'getMe' endpoint
            try {
                // Use the stored token to make the request via interceptor
                const response = await authService.getMe(); // Assuming api.js interceptor adds token
                 if (response.success) {
                     // Update user state with fresh data from backend, keeping the token
                     setUser({ ...response.data, token: parsedUser.token });
                 } else {
                      // Token invalid or expired, log out
                      logout();
                 }
            } catch (error) {
                console.error("Token verification failed:", error);
                 // Token verification failed (e.g., network error, 401 from backend), log out
                logout();
            }
        } else {
            setUser(null); // No stored user
        }
        setIsLoading(false);
    }, []); // Empty dependency array means this runs once on mount

     useEffect(() => {
        loadUser();
    }, [loadUser]);


    // Login function
    const login = async (email, password) => {
        try {
            const userData = await authService.login({ email, password });
            if (userData.success) {
                setUser(userData); // Set user state on successful login
                // User data including token is already saved to localStorage by authService.login
                return true; // Indicate success
            } else {
                 throw new Error(userData.msg || 'Login failed');
            }
        } catch (error) {
            console.error("Login context error:", error);
            setUser(null); // Clear user on failed login
            localStorage.removeItem('user'); // Ensure local storage is cleared
            throw error; // Re-throw error to be caught by the component
        }
    };

    // Register function
    const register = async (name, email, password) => {
         try {
            const userData = await authService.register({ name, email, password });
            if (userData.success) {
                setUser(userData); // Set user state on successful registration
                 // User data including token is already saved to localStorage by authService.register
                return true; // Indicate success
            } else {
                 throw new Error(userData.msg || 'Registration failed');
            }
        } catch (error) {
            console.error("Register context error:", error);
            setUser(null);
            localStorage.removeItem('user');
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        authService.logout(); // Removes user from local storage
        setUser(null); // Clear user state
        // Optionally navigate user to login page (can be done in component or here)
    };

    const deleteAccount = async () => {
        try {
            const response = await authService.deleteAccount(); // Calls the backend to delete the user
            if (response.success) {
                logout(); // Clean up local storage and state
                return true;
            } else {
                throw new Error(response.msg || 'Account deletion failed');
            }
        } catch (error) {
            console.error("Delete account error:", error);
            throw error; // Allow the calling component to handle UI feedback
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );

    
};



export default AuthContext;