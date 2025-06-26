import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PageTransition from '../components/shared/PageTransition';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/'); // Changed from '/shop' to '/'
            } else {
                setError('Failed to log in. Please check your credentials.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <PageTransition>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {successMessage && (
                            <p className="p-3 text-sm text-center text-green-800 bg-green-100 rounded-md">
                                {successMessage}
                            </p>
                        )}
                        {error && (
                            <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">
                                {error}
                            </p>
                        )}
                        <div>
                            <label className="text-sm font-bold text-gray-600">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-3 font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-red-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </PageTransition>
    );
};

export default Login;