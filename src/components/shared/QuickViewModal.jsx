import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, onClose }) => {
    const { addToCart } = useContext(CartContext);

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                style={{ pointerEvents: 'none' }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto relative flex flex-col"
                    style={{ pointerEvents: 'auto' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
                    >
                        <FiX size={24} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
                        <div className="p-4 bg-gray-100 flex items-center justify-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full max-h-[60vh] object-contain"
                            />
                        </div>
                        <div className="p-6 flex flex-col">
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                                <div className="flex items-center my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                                    ))}
                                    <span className="text-gray-400 ml-2">({product.reviewCount})</span>
                                </div>
                                <p className="text-xl font-bold text-red-500 my-2">Rs {product.price.toLocaleString()}</p>
                                <p className="text-gray-600 text-sm">{product.description}</p>
                            </div>
                            
                            <div className="mt-auto pt-4">
                                <button 
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }} 
                                    className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    ADD TO CART
                                </button>
                                <Link 
                                    to={`/product/${product.id}`} 
                                    className="block text-center mt-2 text-red-500 hover:underline text-sm"
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