import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // <-- ADDED

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Initialize auth state
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

    const login = async (email, password) => {
        // Your authentication logic (simplified example)
        const userData = {
            email,
            name: email.split('@')[0],
            role: email === 'admin@example.com' ? 'admin' : 'user'
        };

        setUser(userData);
        localStorage.setItem('fashionMelaUser', JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name}!`); // <-- ADDED
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fashionMelaUser');
        toast.info("You have been logged out."); // <-- ADDED
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAdmin: user?.role === 'admin'
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};