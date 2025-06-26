// src/pages/Register.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/shared/PageTransition';
import { FaArrowLeft } from 'react-icons/fa'; // <-- Import the icon

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        try {
            const success = await register(name, email, password);
            if (success) {
                navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <PageTransition>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

                    {/* --- ADDED THIS "BACK TO HOME" LINK FOR CONSISTENCY --- */}
                    <Link to="/" className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors mb-8">
                        <FaArrowLeft className="mr-2" />
                        Back to Home
                    </Link>
                    {/* --- END OF ADDED LINK --- */}

                    <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">{error}</p>}
                         <div>
                            <label className="text-sm font-bold text-gray-600">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"/>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"/>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-600">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"/>
                        </div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-red-500 rounded-md hover:bg-red-600">
                            Register
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-red-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </PageTransition>
    );
};

export default Register;