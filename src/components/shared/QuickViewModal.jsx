import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiHeart } from 'react-icons/fi';
import { FaStar, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { useProductLists } from '../../context/ProductListsContext';
import { specialOffers } from '../../data/mockData';

const QuickViewModal = ({ product, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlistItem, toggleCompareItem, wishlistItems, compareItems } = useProductLists();

    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    const isInCompare = compareItems.some(item => item.id === product.id);
    const isSpecialOffer = specialOffers.some(offer => offer.id === product.id);
    const discountPercentage = isSpecialOffer 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
                    >
                        <FiX size={24} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
                        <div className="p-4 bg-gray-100 flex items-center justify-center relative">
                            {/* Discount Badge - Added this element */}
                            {isSpecialOffer && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                                    {discountPercentage}% OFF
                                </div>
                            )}
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full max-h-[70vh] object-contain"
                            />
                        </div>
                        <div className="p-6 flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                                <div className="flex items-center my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                                    ))}
                                    <span className="text-gray-400 ml-2">({product.reviewCount} Reviews)</span>
                                </div>
                                <div className="flex items-baseline gap-3 my-2">
                                    <p className="text-xl font-bold text-red-500">
                                        Rs {product.price.toLocaleString()}
                                    </p>
                                    {isSpecialOffer && product.originalPrice && (
                                        <>
                                            <p className="text-gray-400 line-through text-lg">
                                                Rs {product.originalPrice.toLocaleString()}
                                            </p>
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                                                Save Rs {(product.originalPrice - product.price).toLocaleString()}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                            
                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }} 
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 transition-colors text-sm"
                                >
                                    ADD TO CART
                                </button>
                                
                                <div className="flex items-center justify-center space-x-6 mt-4">
                                    <button
                                        onClick={() => toggleWishlistItem(product)}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                                    >
                                        {isInWishlist ? <FaHeart /> : <FiHeart />}
                                        {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                    </button>
                                    <button
                                        onClick={() => toggleCompareItem(product)}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInCompare ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                                    >
                                        <FaBalanceScale />
                                        {isInCompare ? 'In Compare' : 'Add to Compare'}
                                    </button>
                                </div>
                                
                                <Link 
                                    to={`/product/${product.id}`} 
                                    className="block text-center mt-4 text-red-500 hover:underline text-sm font-semibold"
                                    onClick={onClose}
                                >
                                    View Full Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickViewModal;