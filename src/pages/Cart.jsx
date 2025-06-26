import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PageTransition from '../components/shared/PageTransition';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { specialOffers } from '../data/mockData';
import { useState } from 'react';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
    const [isRemoving, setIsRemoving] = useState(false);

    // Check if product is a special offer
    const isSpecialOffer = (productId) => {
        return specialOffers.some(offer => offer.id === productId);
    };

    // Get discount information
    const getDiscountInfo = (productId) => {
        const offer = specialOffers.find(offer => offer.id === productId);
        if (offer) {
            return {
                percentage: Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100),
                originalPrice: offer.originalPrice
            };
        }
        return null;
    };

    // Calculate pricing information
    const pricingInfo = cartItems.reduce((acc, item) => {
        const discountInfo = isSpecialOffer(item.id) ? getDiscountInfo(item.id) : null;
        const originalPrice = discountInfo?.originalPrice || item.price;
        
        return {
            originalSubtotal: acc.originalSubtotal + (originalPrice * item.quantity),
            discountAmount: acc.discountAmount + (discountInfo ? (originalPrice - item.price) * item.quantity : 0),
            itemCount: acc.itemCount + item.quantity
        };
    }, { originalSubtotal: 0, discountAmount: 0, itemCount: 0 });

    const handleRemoveItem = (item) => {
        setIsRemoving(true);
        setTimeout(() => {
            removeFromCart({ ...item, quantity: item.quantity });
            setIsRemoving(false);
        }, 300);
    };

    if (cartItems.length === 0) {
        return (
            <PageTransition>
                <div className="container mx-auto px-4 py-32 text-center">
                    <div className="max-w-md mx-auto">
                        <svg className="w-20 h-20 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
                        <Link 
                            to="/shop" 
                            className="inline-flex items-center justify-center bg-red-500 text-white font-bold py-3 px-8 rounded-md hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
                        >
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
                <div className="flex items-center mb-8">
                    <Link 
                        to="/shop" 
                        className="flex items-center text-gray-600 hover:text-red-500 transition-colors mr-6"
                    >
                        <FaArrowLeft className="mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => {
                            const discountInfo = isSpecialOffer(item.id) ? getDiscountInfo(item.id) : null;
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className={`flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ${isRemoving ? 'opacity-75' : 'hover:shadow-md'}`}
                                >
                                    <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="max-w-full max-h-full object-contain p-2"
                                            />
                                            {discountInfo && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                                                    {discountInfo.percentage}% OFF
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 sm:flex-none">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-gray-600">Rs {item.price.toLocaleString()}</p>
                                                {discountInfo && (
                                                    <p className="text-xs text-gray-400 line-through">
                                                        Rs {discountInfo.originalPrice.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button 
                                                onClick={() => removeFromCart(item)} 
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <FaMinus size={14}/>
                                            </button>
                                            <span className="px-4 font-medium text-gray-700 min-w-[40px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => addToCart(item)} 
                                                className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <FaPlus size={14}/>
                                            </button>
                                        </div>
                                        <p className="font-bold text-gray-800 min-w-[80px] text-right">
                                            Rs {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                        <button 
                                            onClick={() => handleRemoveItem(item)} 
                                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <FaTrash size={16}/>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-between mt-6">
                            <button 
                                onClick={clearCart} 
                                className="text-gray-500 hover:text-red-500 font-medium flex items-center gap-2 transition-colors"
                            >
                                <FaTrash size={14}/>
                                Clear Entire Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({pricingInfo.itemCount} items)</span>
                                    <span>Rs {pricingInfo.originalSubtotal.toLocaleString()}</span>
                                </div>
                                
                                {pricingInfo.discountAmount > 0 && (
                                    <div className="flex justify-between text-red-500">
                                        <span>Discounts Applied</span>
                                        <span>- Rs {pricingInfo.discountAmount.toLocaleString()}</span>
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
                                
                                {pricingInfo.discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium pt-2">
                                        <span>You Saved</span>
                                        <span>Rs {pricingInfo.discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                            
                            <Link to="/checkout">
                                <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
                                    PROCEED TO CHECKOUT
                                </button>
                            </Link>
                            <p className="text-center text-xs text-gray-500 mt-3">
                                Secure SSL encrypted checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Cart;