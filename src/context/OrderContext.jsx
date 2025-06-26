import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify'; // <-- ADDED

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load orders from localStorage
    useEffect(() => {
        const loadOrders = () => {
            try {
                const storedOrders = JSON.parse(localStorage.getItem('eFashionOrders')) || [];
                if (user) {
                    const userOrders = storedOrders.filter(order => order.userId === user.id);
                    setOrders(userOrders);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Failed to load orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user]);

    const addOrder = (orderData) => {
        const newOrder = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            userId: user?.id,
            status: orderData.paymentMethod === 'cod' ? 'Processing' : 'Paid'
        };

        setOrders(prev => {
            const updatedOrders = [...prev, newOrder];
            
            // Update localStorage
            const allOrders = JSON.parse(localStorage.getItem('eFashionOrders')) || [];
            localStorage.setItem('eFashionOrders', JSON.stringify([...allOrders, newOrder]));
            
            return updatedOrders;
        });

        toast.success("Order placed successfully!"); // <-- ADDED
        return newOrder;
    };

    const deleteOrder = async (orderId) => {
        try {
            setOrders(prev => {
                const updatedOrders = prev.filter(order => order.id !== orderId);
                
                // Update localStorage
                const allOrders = JSON.parse(localStorage.getItem('eFashionOrders')) || [];
                const updatedAllOrders = allOrders.filter(order => order.id !== orderId);
                localStorage.setItem('eFashionOrders', JSON.stringify(updatedAllOrders));
                
                return updatedOrders;
            });
            toast.success("Order deleted successfully."); // <-- ADDED
            return true;
        } catch (error) {
            console.error("Failed to delete order:", error);
            toast.error("Failed to delete order."); // <-- ADDED
            return false;
        }
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    return (
        <OrderContext.Provider value={{ 
            orders, 
            addOrder, 
            getOrderById, 
            deleteOrder,
            loading 
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};