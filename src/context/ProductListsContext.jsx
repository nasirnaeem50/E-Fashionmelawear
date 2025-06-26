// src/context/ProductListsContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; // <-- ADDED

export const ProductListsContext = createContext();

export const useProductLists = () => {
    return useContext(ProductListsContext);
};

const getInitialState = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
};

export const ProductListsProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState(() => getInitialState('wishlistItems'));
    const [compareItems, setCompareItems] = useState(() => getInitialState('compareItems'));

    // Persist to localStorage whenever lists change
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    useEffect(() => {
        localStorage.setItem('compareItems', JSON.stringify(compareItems));
    }, [compareItems]);

    // --- Wishlist Logic ---
    const toggleWishlistItem = (product) => {
        const isItemInWishlist = wishlistItems.find(item => item.id === product.id);
        if (isItemInWishlist) {
            setWishlistItems(prevItems => prevItems.filter(item => item.id !== product.id));
            toast.info(`${product.name} removed from wishlist.`); // <-- ADDED
        } else {
            setWishlistItems(prevItems => [...prevItems, product]);
            toast.success(`${product.name} added to wishlist!`); // <-- ADDED
        }
    };

    // --- Compare Logic ---
    const toggleCompareItem = (product) => {
        const isItemInCompare = compareItems.find(item => item.id === product.id);
        if (isItemInCompare) {
            setCompareItems(prevItems => prevItems.filter(item => item.id !== product.id));
            toast.info(`${product.name} removed from compare list.`); // <-- ADDED
        } else {
            if (compareItems.length >= 4) {
                toast.warn("You can only compare up to 4 items."); // <-- UPDATED from alert
                return;
            }
            setCompareItems(prevItems => [...prevItems, product]);
            toast.success(`${product.name} added to compare list!`); // <-- ADDED
        }
    };
    
    // NEW: Clear all compare items function
    const clearCompareList = () => {
        setCompareItems([]); // This will empty the compare list
        toast.warn("Compare list has been cleared."); // <-- ADDED
    };

    const getWishlistCount = () => wishlistItems.length;
    const getCompareCount = () => compareItems.length;

    const value = {
        wishlistItems,
        compareItems,
        toggleWishlistItem,
        toggleCompareItem,
        clearCompareList, 
        getWishlistCount,
        getCompareCount,
    };

    return (
        <ProductListsContext.Provider value={value}>
            {children}
        </ProductListsContext.Provider>
    );
};