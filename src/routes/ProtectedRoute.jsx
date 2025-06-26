// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSpinner } from 'react-icons/fa'; // For a loading indicator

const ProtectedRoute = ({ children }) => {
    // MODIFIED: Destructure user AND loading state
    const { user, loading } = useAuth();
    const location = useLocation();

    // NEW: While the auth state is being checked, show a loading screen
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="text-red-500 text-5xl animate-spin" />
            </div>
        );
    }

    // After loading is false, if there's no user, then redirect
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If loading is false and there IS a user, show the protected content
    return children;
};

export default ProtectedRoute;