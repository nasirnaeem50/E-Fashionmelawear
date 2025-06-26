import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify'; // <-- ADDED

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();

    // Get or create user-specific cart
    const getCartFromStorage = () => {
        const userId = user?.email || 'guest';
        try {
            const allCarts = JSON.parse(localStorage.getItem('allCarts') || '{}');
            return allCarts[userId] || [];
        } catch (error) {
            console.error('Cart loading error:', error);
            return [];
        }
    };

    const [cartItems, setCartItems] = useState(getCartFromStorage());

    // Save cart to storage whenever it changes
    useEffect(() => {
        const userId = user?.email || 'guest';
        try {
            const allCarts = JSON.parse(localStorage.getItem('allCarts') || '{}');
            localStorage.setItem(
                'allCarts',
                JSON.stringify({
                    ...allCarts,
                    [userId]: cartItems
                })
            );
        } catch (error) {
            console.error('Cart saving error:', error);
        }
    }, [cartItems, user]);

    // Update cart when user changes
    useEffect(() => {
        setCartItems(getCartFromStorage());
    }, [user]);

    // Cart operations
    const addToCart = (item) => {
        const existingItem = cartItems.find(i => i.id === item.id);
        if (existingItem) {
            setCartItems(cartItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        toast.success(`${item.name} added to cart!`); // <-- ADDED
    };

    const removeFromCart = (item) => {
        setCartItems(cartItems.filter(i => i.id !== item.id));
        toast.error(`${item.name} removed from cart.`); // <-- ADDED
    };

    const clearCart = () => {
        setCartItems([]);
        toast.warn("Cart has been cleared."); // <-- ADDED
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal: () => cartItems.reduce((t, i) => t + (i.price * i.quantity), 0),
        getCartItemCount: () => cartItems.reduce((c, i) => c + i.quantity, 0)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};