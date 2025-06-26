import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { 
  FaBox, 
  FaCheckCircle, 
  FaTruck, 
  FaTrash, 
  FaArrowLeft,
  FaTimesCircle,
  FaMoneyBillWave,
  FaWarehouse,
  FaShippingFast
} from 'react-icons/fa';

const Orders = () => {
    const { orders, loading, deleteOrder } = useOrders();
    const navigate = useNavigate();

    const getStatusDetails = (status) => {
        switch (status) {
            case 'Processing':
                return { 
                    icon: <FaBox className="text-yellow-500" />,
                    text: 'Processing',
                    description: 'Your order is being prepared',
                    color: 'bg-yellow-100 text-yellow-800',
                    progress: 25
                };
            case 'Paid':
                return {
                    icon: <FaMoneyBillWave className="text-blue-500" />,
                    text: 'Payment Received',
                    description: 'Your payment was successful',
                    color: 'bg-blue-100 text-blue-800',
                    progress: 50
                };
            case 'Shipped':
                return {
                    icon: <FaShippingFast className="text-purple-500" />,
                    text: 'Shipped',
                    description: 'Your order is on the way',
                    color: 'bg-purple-100 text-purple-800',
                    progress: 75
                };
            case 'Delivered':
                return {
                    icon: <FaCheckCircle className="text-green-500" />,
                    text: 'Delivered',
                    description: 'Your order has arrived',
                    color: 'bg-green-100 text-green-800',
                    progress: 100
                };
            case 'Cancelled':
                return {
                    icon: <FaTimesCircle className="text-red-500" />,
                    text: 'Cancelled',
                    description: 'Order was cancelled',
                    color: 'bg-red-100 text-red-800',
                    progress: 0
                };
            default:
                return {
                    icon: <FaWarehouse className="text-gray-500" />,
                    text: 'Received',
                    description: 'Your order has been received',
                    color: 'bg-gray-100 text-gray-800',
                    progress: 10
                };
        }
    };

    const handleDeleteOrder = async (orderId, e) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteOrder(orderId);
    };

    if (loading) {
        return <div className="text-center py-8">Loading your orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-red-500 mb-4 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Home
                </button>
                <h3 className="text-lg font-medium mb-2">You haven't placed any orders yet</h3>
                <p className="text-gray-600 mb-4">When you do, they'll appear here</p>
                <Link 
                    to="/shop" 
                    className="inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Home
                </button>
                <h2 className="text-xl font-bold">My Orders</h2>
                <div className="w-8"></div>
            </div>
            <div className="divide-y">
                {orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => {
                    const status = getStatusDetails(order.status);
                    return (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors relative group">
                            <button
                                onClick={(e) => handleDeleteOrder(order.id, e)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete order"
                            >
                                <FaTrash />
                            </button>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div className="flex items-center gap-3 mb-2 md:mb-0">
                                    {status.icon}
                                    <div>
                                        <h3 className="font-medium">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm ${status.color}`}>
                                    {status.text}
                                </div>
                            </div>

                            {/* Status Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div 
                                    className="bg-red-500 h-2.5 rounded-full" 
                                    style={{ width: `${status.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{status.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-medium">Rs {order.total.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment</p>
                                    <p className="font-medium">
                                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                         order.paymentMethod === 'bank' ? 'Bank Transfer' : 'Easypaisa'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Items</p>
                                    <p className="font-medium">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between">
                                    <Link 
                                        to={`/profile/orders/${order.id}`}
                                        className="text-red-500 hover:text-red-600 text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                    {order.status === 'Shipped' && (
                                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                            Track Package
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orders;