// src/pages/AdminDashboard.jsx
import React from 'react';
import PageTransition from '../components/shared/PageTransition';

const AdminDashboard = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="mt-4 text-lg">Welcome, Administrator!</p>
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold">Site Management</h2>
                    <p className="mt-2">Here you can manage products, view orders, and update site settings.</p>
                    {/* Add admin-specific components here */}
                </div>
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;