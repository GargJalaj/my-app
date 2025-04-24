import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation(); // Get current location

    if (isLoading) {
        // Show a loading indicator while checking auth status
        return <div>Checking authentication...</div>; // Or a spinner
    }

    if (!user) {
        // User not logged in, redirect them to the /login page
        // Pass the current location in state so we can redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is logged in, render the child components
    return children;
};

export default PrivateRoute;