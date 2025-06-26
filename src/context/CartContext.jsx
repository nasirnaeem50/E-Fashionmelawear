// src/context/CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();

    // Initial state is loaded once from the correct user's storage
    const [cartItems, setCartItems] = useState(() => {
        const userId = user?.email || 'guest';
        try {
            const allCarts = JSON.parse(localStorage.getItem('allCarts') || '{}');
            return allCarts[userId] || [];
        } catch (error) {
            console.error('Failed to load cart on init:', error);
            return [];
        }
    });

    // EFFECT 1: LOAD the cart when the user changes. This is the only place we read from storage after init.
    useEffect(() => {
        const userId = user?.email || 'guest';
        try {
            const allCarts = JSON.parse(localStorage.getItem('allCarts') || '{}');
            // This directly sets the state to the new user's cart, or an empty guest cart.
            setCartItems(allCarts[userId] || []);
        } catch (error) {
            console.error('Failed to load cart on user change:', error);
            setCartItems([]); // Reset to empty on error
        }
    }, [user]); // <-- This hook ONLY depends on the user.

    // EFFECT 2: SAVE the cart when cartItems change.
    // By removing `user` from the dependency array, we prevent the race condition.
    // This effect will only run AFTER `setCartItems` has been called.
    useEffect(() => {
        // It doesn't matter if the user is logging out or not, we always save
        // to the CURRENT user's (or guest's) cart.
        const userId = user?.email || 'guest';
        try {
            // Read the latest full cart object to avoid overwriting other users' carts
            const allCarts = JSON.parse(localStorage.getItem('allCarts') || '{}');
            
            // Update only the current user's cart and save it back
            allCarts[userId] = cartItems;
            localStorage.setItem('allCarts', JSON.stringify(allCarts));

        } catch (error) {
            console.error('Failed to save cart:', error);
        }
    }, [cartItems]); // <-- This hook ONLY depends on the cartItems. THIS IS THE FIX.


    // --- Cart operations (no changes needed here) ---

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
        toast.success(`${item.name} added to cart!`);
    };

    const decreaseQuantity = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem.quantity === 1) {
                return prevItems.filter(i => i.id !== item.id);
            }
            return prevItems.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
            );
        });
        toast.info(`Removed one ${item.name} from cart.`);
    };

    const removeFromCart = (item) => {
        setCartItems(prevItems => prevItems.filter(i => i.id !== item.id));
        toast.error(`${item.name} removed from cart.`);
    };

    const clearCart = () => {
        setCartItems([]);
        toast.warn("Cart has been cleared.");
    };

    const value = {
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getCartTotal: () => cartItems.reduce((t, i) => t + (i.price * i.quantity), 0),
        getCartItemCount: () => cartItems.reduce((c, i) => c + i.quantity, 0)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};