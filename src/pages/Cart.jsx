import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PageTransition from '../components/shared/PageTransition';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft } from 'react-icons/fa';
// Note: I removed unused icons from this import list for cleanliness
import { specialOffers } from '../data/mockData';

const Cart = () => {
    // No changes needed to this section
    const { cartItems, addToCart, decreaseQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    const [isRemoving, setIsRemoving] = useState(null);

    const getDiscountInfo = (productId) => {
        const offer = specialOffers.find(offer => offer.id === productId);
        return offer ? {
            percentage: Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100),
            originalPrice: offer.originalPrice
        } : null;
    };

    const summary = cartItems.reduce((acc, item) => {
        const discountInfo = getDiscountInfo(item.id);
        const originalItemPrice = discountInfo?.originalPrice || item.price;
        acc.originalSubtotal += originalItemPrice * item.quantity;
        return acc;
    }, { originalSubtotal: 0 });

    const totalDiscount = summary.originalSubtotal - getCartTotal();

    const handleRemoveItem = (item) => {
        setIsRemoving(item.id);
        setTimeout(() => {
            removeFromCart(item);
            setIsRemoving(null);
        }, 300);
    };

    if (cartItems.length === 0) {
        // Your empty cart component is perfect, no changes here.
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-32 text-center">
                    <div className="max-w-md mx-auto">
                        <svg className="w-20 h-20 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
                        <Link to="/shop" className="inline-flex items-center justify-center bg-red-500 text-white font-bold py-3 px-8 rounded-md hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg">
                            <FaArrowLeft className="mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-8">
                {/* Header and Cart Items list are fine, no changes needed */}
                <div className="flex items-center mb-8">
                    <Link to="/shop" className="flex items-center text-gray-600 hover:text-red-500 transition-colors mr-6">
                        <FaArrowLeft className="mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {/* This section is exactly as you provided */}
                        {cartItems.map(item => {
                            const discountInfo = getDiscountInfo(item.id);
                            return (
                                <div key={item.id} className={`group relative bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ${isRemoving === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} hover:shadow-md`}>
                                   <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                            {discountInfo && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                    {discountInfo.percentage}% OFF
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 uppercase">{item.name}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                                                <div className="flex items-baseline">
                                                    <span className="text-xs font-medium text-gray-800 mr-0.5">Rs</span>
                                                    <span className="text-md font-medium text-gray-800">{item.price.toLocaleString()}</span>
                                                </div>
                                                {discountInfo && (
                                                    <div className="flex items-baseline">
                                                        <span className="text-xs text-gray-500 line-through mr-0.5">Rs</span>
                                                        <span className="text-xs text-gray-500 line-through">{discountInfo.originalPrice.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-auto pt-4 flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 rounded-md">
                                                    <button onClick={() => decreaseQuantity(item)} className="p-2 text-gray-600 hover:bg-gray-50 transition-colors"><FaMinus size={14}/></button>
                                                    <span className="px-4 py-1 font-semibold text-gray-800 w-12 text-center">{item.quantity}</span>
                                                    <button onClick={() => addToCart(item)} className="p-2 text-gray-600 hover:bg-gray-50 transition-colors"><FaPlus size={14}/></button>
                                                </div>
                                                <button onClick={() => handleRemoveItem(item)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><FaTrash size={16}/></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex justify-between mt-6">
                            <button onClick={clearCart} className="text-gray-500 hover:text-red-500 font-medium flex items-center gap-2 transition-colors">
                                <FaTrash size={14}/> Clear Entire Cart
                            </button>
                        </div>
                    </div>

                    {/* --- ONLY THIS SECTION WAS MODIFIED --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

                            <div className="space-y-1 border-b pb-4 mb-4">
                                {cartItems.map(item => {
                                    // Calculate prices and discount for this specific item
                                    const discountInfo = getDiscountInfo(item.id);
                                    const originalPrice = discountInfo?.originalPrice || item.price;
                                    const salePrice = item.price;
                                    const lineItemTotalOriginal = originalPrice * item.quantity;
                                    const lineItemDiscount = (originalPrice - salePrice) * item.quantity;

                                    // Render the item line and its specific discount if it exists
                                    return (
                                        <React.Fragment key={`summary-${item.id}`}>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span className="truncate pr-2">{item.name} (x{item.quantity})</span>
                                                <span className="font-medium">Rs {lineItemTotalOriginal.toLocaleString()}</span>
                                            </div>
                                            {lineItemDiscount > 0 && (
                                                <div className="flex justify-between text-sm text-red-500 pl-4">
                                                    <span>Sale Discount</span>
                                                    <span>- Rs {lineItemDiscount.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            
                            {/* --- This section is exactly as you provided --- */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs {summary.originalSubtotal.toLocaleString()}</span>
                                </div>
                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-red-500">
                                        <span>Discounts Applied</span>
                                        <span>- Rs {totalDiscount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t font-bold text-lg mt-2">
                                    <span className="text-gray-800">Total</span>
                                    <span className="text-gray-800">Rs {getCartTotal().toLocaleString()}</span>
                                </div>
                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium pt-2">
                                        <span>You Saved</span>
                                        <span>Rs {totalDiscount.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                            <Link to="/checkout">
                                <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                                    PROCEED TO CHECKOUT
                                </button>
                            </Link>
                            <p className="text-center text-xs text-gray-500 mt-3">Secure SSL encrypted checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Cart;