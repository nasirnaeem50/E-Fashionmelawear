import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import PageTransition from '../components/shared/PageTransition';
import { 
  FaBox, 
  FaCheckCircle, 
  FaTruck, 
  FaHome, 
  FaArrowLeft, 
  FaTrash,
  FaTimesCircle,
  FaMoneyBillWave,
  FaWarehouse,
  FaShippingFast
} from 'react-icons/fa';

const OrderDetail = () => {
    const { orderId } = useParams();
    const { getOrderById, deleteOrder } = useOrders();
    const navigate = useNavigate();
    const order = getOrderById(orderId);

    const getStatusDetails = (status) => {
        switch (status) {
            case 'Processing':
                return { 
                    icon: <FaBox className="text-yellow-500 text-2xl" />,
                    text: 'Processing',
                    description: 'Your order is being prepared for shipment',
                    color: 'bg-yellow-100 text-yellow-800',
                    steps: [
                        { status: 'Processing', active: true },
                        { status: 'Shipped', active: false },
                        { status: 'Delivered', active: false }
                    ]
                };
            case 'Paid':
                return {
                    icon: <FaMoneyBillWave className="text-blue-500 text-2xl" />,
                    text: 'Payment Received',
                    description: 'Your payment has been processed successfully',
                    color: 'bg-blue-100 text-blue-800',
                    steps: [
                        { status: 'Paid', active: true },
                        { status: 'Processing', active: false },
                        { status: 'Shipped', active: false },
                        { status: 'Delivered', active: false }
                    ]
                };
            case 'Shipped':
                return {
                    icon: <FaShippingFast className="text-purple-500 text-2xl" />,
                    text: 'Shipped',
                    description: 'Your order is on its way to you',
                    color: 'bg-purple-100 text-purple-800',
                    steps: [
                        { status: 'Paid', active: true },
                        { status: 'Processing', active: true },
                        { status: 'Shipped', active: true },
                        { status: 'Delivered', active: false }
                    ]
                };
            case 'Delivered':
                return {
                    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
                    text: 'Delivered',
                    description: 'Your order has been successfully delivered',
                    color: 'bg-green-100 text-green-800',
                    steps: [
                        { status: 'Paid', active: true },
                        { status: 'Processing', active: true },
                        { status: 'Shipped', active: true },
                        { status: 'Delivered', active: true }
                    ]
                };
            case 'Cancelled':
                return {
                    icon: <FaTimesCircle className="text-red-500 text-2xl" />,
                    text: 'Cancelled',
                    description: 'This order has been cancelled',
                    color: 'bg-red-100 text-red-800',
                    steps: []
                };
            default:
                return {
                    icon: <FaWarehouse className="text-gray-500 text-2xl" />,
                    text: 'Order Received',
                    description: 'We have received your order',
                    color: 'bg-gray-100 text-gray-800',
                    steps: [
                        { status: 'Received', active: true },
                        { status: 'Processing', active: false },
                        { status: 'Shipped', active: false },
                        { status: 'Delivered', active: false }
                    ]
                };
        }
    };

    const handleDeleteOrder = async () => {
        await deleteOrder(orderId);
        navigate('/profile/orders');
    };

    if (!order) {
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-12 text-center">
                    <button 
                        onClick={() => navigate('/profile/orders')}
                        className="flex items-center text-gray-600 hover:text-red-500 mb-4 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Orders
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
                    <p>The order you're looking for doesn't exist.</p>
                </div>
            </PageTransition>
        );
    }

    const status = getStatusDetails(order.status);

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <button 
                        onClick={() => navigate('/profile/orders')}
                        className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Orders
                    </button>
                    <button
                        onClick={handleDeleteOrder}
                        className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                        <FaTrash className="mr-2" />
                        Delete Order
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-2xl font-bold mb-4 md:mb-0">Order #{order.id}</h1>
                        <div className={`px-4 py-2 rounded-full ${status.color} flex items-center gap-2`}>
                            {status.icon}
                            <span className="font-medium">{status.text}</span>
                        </div>
                    </div>

                    {/* Order Status Timeline */}
                    {status.steps.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">Order Progress</h2>
                            <div className="relative">
                                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                                {status.steps.map((step, index) => (
                                    <div key={index} className="relative pl-10 pb-6">
                                        <div className={`absolute left-4 top-0 rounded-full w-4 h-4 ${step.active ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                        <p className={`font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {step.status}
                                        </p>
                                        {index === status.steps.length - 1 && (
                                            <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-transparent"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 mt-2">{status.description}</p>
                        </div>
                    )}

                    {/* Rest of your existing order detail content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium">Name:</span> {order.shippingInfo.name}</p>
                                <p><span className="font-medium">Phone:</span> {order.shippingInfo.phone}</p>
                                <p><span className="font-medium">Email:</span> {order.shippingInfo.email || 'N/A'}</p>
                                <p><span className="font-medium">Address:</span> {order.shippingInfo.address}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                            <div className="space-y-2">
                                <p><span className="font-medium">Method:</span> 
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                     order.paymentMethod === 'bank' ? 'Bank Transfer' : 'Easypaisa'}
                                </p>
                                <p><span className="font-medium">Status:</span> {order.paymentStatus}</p>
                                <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Rest of your existing order items and total sections */}
                    <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                    <div className="space-y-4">
                        {order.items.map(item => {
                            const discount = item.originalPrice ? (item.originalPrice - item.price) : 0;
                            return (
                                <div key={item.id} className="flex border-b pb-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                        {discount > 0 && (
                                            <p className="text-xs text-gray-400 line-through">
                                                Rs {(item.originalPrice * item.quantity).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                        {discount > 0 && (
                                            <p className="text-xs text-green-600">
                                                Saved Rs {(discount * item.quantity).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal ({order.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                            <span>Rs {order.subtotal.toLocaleString()}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-red-500 mb-2">
                                <span>Discounts Applied</span>
                                <span>- Rs {order.discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>Total</span>
                            <span>Rs {order.total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="mt-6 pt-4 border-t flex justify-end gap-4">
                        {order.status === 'Shipped' && (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Track Package
                            </button>
                        )}
                        {order.status === 'Delivered' && (
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Leave Review
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default OrderDetail;