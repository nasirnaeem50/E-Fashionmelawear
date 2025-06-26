// src/routes/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSpinner } from 'react-icons/fa'; // For a loading indicator

const AdminRoute = ({ children }) => {
    // MODIFIED: Destructure user, isAdmin, AND loading state
    const { user, isAdmin, loading } = useAuth();

    // NEW: While the auth state is being checked, show a loading screen
    if (loading) {
        return (
             <div className="flex justify-center items-center h-screen">
                <FaSpinner className="text-red-500 text-5xl animate-spin" />
            </div>
        );
    }

    // After loading is false, check for user and admin status
    if (!user || !isAdmin) {
        // Redirect to home page if not a logged-in admin
        return <Navigate to="/" replace />;
    }
    
    // If loading is false and user is an admin, show the protected content
    return children;
};

export default AdminRoute;