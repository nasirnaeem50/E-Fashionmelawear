import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FiHeart, FiSearch } from 'react-icons/fi';
import { FaBalanceScale } from "react-icons/fa";
import { useProductLists } from '../../context/ProductListsContext';
import { CartContext } from '../../context/CartContext';
import QuickViewModal from './QuickViewModal';
import { specialOffers } from '../../data/mockData';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlistItem, toggleCompareItem, wishlistItems, compareItems } = useProductLists();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    const isInCompare = compareItems.some(item => item.id === product.id);
    const isSpecialOffer = specialOffers.some(offer => offer.id === product.id);
    const discountPercentage = isSpecialOffer 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        addToCart(product);
    };

    const handleIconClick = (e, action) => {
        e.preventDefault();
        switch (action) {
            case 'Search':
                setIsModalOpen(true);
                break;
            case 'Wishlist':
                toggleWishlistItem(product);
                break;
            case 'Compare':
                toggleCompareItem(product);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="group bg-white rounded-lg shadow-sm overflow-hidden relative hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                {/* Discount Badge */}
                {isSpecialOffer && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                        {discountPercentage}% OFF
                    </div>
                )}

                {/* Image Container */}
                <div className="relative overflow-hidden bg-white flex-grow">
                    <Link to={`/product/${product.id}`}>
                        <div className="relative h-0 pt-[100%] sm:pt-[125%]">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105" 
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>
                    </Link>
                    
                    <button 
                        onClick={(e) => handleIconClick(e, 'Search')} 
                        className="absolute top-3 right-3 bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                        <FiSearch className="h-5 w-5" />
                    </button>
                </div>

                {/* Text Content */}
                <div className="p-4 text-left border-t border-gray-100">
                    <h3 className="text-md font-semibold text-gray-800 truncate mb-1">
                        <Link to={`/product/${product.id}`} className="hover:text-red-500 transition-colors">{product.name}</Link>
                    </h3>
                    <div className="flex items-center text-sm mb-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                                key={i} 
                                size={14}
                                className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                            />
                        ))}
                        <span className="text-gray-400 ml-2 text-xs">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-gray-900">
                            Rs {product.price.toLocaleString()}
                        </p>
                        {isSpecialOffer && (
                            <p className="text-sm text-gray-500 line-through">
                                Rs {product.originalPrice.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 p-3 bg-white lg:transform lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleAddToCart} 
                            className="flex-grow bg-gray-800 text-white font-medium py-2 px-3 rounded-md hover:bg-red-500 transition-colors text-sm whitespace-nowrap"
                        >
                            ADD TO CART
                        </button>
                        <button 
                            onClick={(e) => handleIconClick(e, 'Wishlist')} 
                            className={`p-2 border rounded-md transition-colors ${isInWishlist ? 'bg-red-500 text-white border-red-500' : 'text-gray-600 hover:bg-gray-100 border-gray-200'}`}
                        >
                            <FiHeart size={16} />
                        </button>
                        <button 
                            onClick={(e) => handleIconClick(e, 'Compare')} 
                            className={`p-2 border rounded-md transition-colors ${isInCompare ? 'bg-red-500 text-white border-red-500' : 'text-gray-600 hover:bg-gray-100 border-gray-200'}`}
                        >
                            <FaBalanceScale size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && <QuickViewModal product={product} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default ProductCard;