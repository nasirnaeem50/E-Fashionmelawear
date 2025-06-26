// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Helper to get all registered users from localStorage
    const getUsersFromStorage = () => {
        return JSON.parse(localStorage.getItem('fashionMelaUsersList') || '[]');
    };

    // Helper to save the updated list of users
    const saveUsersToStorage = (users) => {
        localStorage.setItem('fashionMelaUsersList', JSON.stringify(users));
    };

    // Initialize auth state (no change here)
    useEffect(() => {
        const storedUser = localStorage.getItem('fashionMelaUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('fashionMelaUser');
            }
        }
        setLoading(false);
    }, []);

    // --- NEW REGISTER FUNCTION ---
    const register = async (name, email, password) => {
        const users = getUsersFromStorage();
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            // Throw an error if the user is already registered
            throw new Error('An account with this email already exists.');
        }

        const newUser = {
            name,
            email,
            password, // In a real app, this should be hashed!
            role: 'user'
        };

        const updatedUsers = [...users, newUser];
        saveUsersToStorage(updatedUsers);

        return true; // Indicate success
    };

    // --- UPDATED LOGIN FUNCTION ---
    const login = async (email, password) => {
        const users = getUsersFromStorage();
        const foundUser = users.find(u => u.email === email);

        if (!foundUser) {
            // Throw an error if no account is found
            throw new Error('No account found. Please register first.');
        }

        if (foundUser.password !== password) {
            // Throw an error for incorrect password
            throw new Error('Invalid email or password.');
        }

        // If login is successful, proceed as before
        const userData = {
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role
        };

        setUser(userData);
        localStorage.setItem('fashionMelaUser', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`);
        return true;
    };

    // Logout function (no change here)
    const logout = () => {
        setUser(null);
        localStorage.removeItem('fashionMelaUser');
        toast.info("You have been logged out.");
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register, // <-- Add register to the context
                login,
                logout,
                isAdmin: user?.role === 'admin'
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};