import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import PageTransition from '../components/shared/PageTransition';
import { FaArrowLeft } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const { orders, loading } = useOrders();
    const location = useLocation();
    const navigate = useNavigate();

    const activeLinkStyle = {
        color: '#ef4444',
        fontWeight: '600',
        borderBottom: '2px solid #ef4444'
    };

    // Check if current route is wishlist or compare
    const isSpecialPage = ['/profile/wishlist', '/profile/compare'].includes(location.pathname);

    if (!user) {
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-12 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-red-500 mb-4 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Home
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-red-500 mb-6 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Home
                </button>
                
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar - Conditionally rendered */}
                    {!isSpecialPage && (
                        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-24">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <NavLink 
                                    to="/profile" 
                                    end 
                                    style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                    className="block py-2 hover:text-red-500 transition-colors"
                                >
                                    Account Overview
                                </NavLink>
                                <NavLink 
                                    to="/profile/orders" 
                                    style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                    className="block py-2 hover:text-red-500 transition-colors"
                                >
                                    My Orders
                                </NavLink>
                            </nav>
                        </div>
                    )}

                    {/* Main Content - Full width for special pages */}
                    <div className={isSpecialPage ? "w-full" : "flex-1"}>
                        {location.pathname === '/profile' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-6">Account Overview</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">Personal Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-600">Full Name</p>
                                                <p className="font-medium">{user.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Email</p>
                                                <p className="font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold mb-2">Order Summary</h3>
                                        {loading ? (
                                            <p>Loading orders...</p>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-md">
                                                    <p className="text-gray-600">Total Orders</p>
                                                    <p className="text-2xl font-bold">{orders.length}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-md">
                                                    <p className="text-gray-600">Processing</p>
                                                    <p className="text-2xl font-bold">
                                                        {orders.filter(o => o.status === 'Processing').length}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-md">
                                                    <p className="text-gray-600">Completed</p>
                                                    <p className="text-2xl font-bold">
                                                        {orders.filter(o => o.status === 'Completed' || o.status === 'Delivered').length}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <Outlet />
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Profile;