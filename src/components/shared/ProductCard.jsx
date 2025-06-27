import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaBalanceScale } from 'react-icons/fa';
import { FiHeart, FiSearch, FiShoppingBag, FiMoreVertical } from 'react-icons/fi';
import { useProductLists } from '../../context/ProductListsContext';
import { CartContext } from '../../context/CartContext';
import QuickViewModal from './QuickViewModal';
import { specialOffers } from '../../data/mockData';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlistItem, toggleCompareItem, wishlistItems, compareItems } = useProductLists();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        e.stopPropagation();
        setIsMenuOpen(false);
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
    
    const formatPrice = (price) => {
        const integerPart = Math.floor(price);
        return integerPart.toLocaleString();
    };

    return (
        <>
            <div className="group relative h-full flex flex-col">
                <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                        <div className="aspect-[4/5] w-full bg-gray-100">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105" 
                                onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.jpg'; }}
                            />
                        </div>
                    </Link>

                    {isSpecialOffer && (
                        <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            {discountPercentage}% OFF
                        </div>
                    )}

                    {/* Desktop Hover Icons */}
                    <div className="hidden lg:flex absolute top-3 right-3 z-20 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={(e) => handleIconClick(e, 'Search')} className="bg-white rounded-full h-9 w-9 flex items-center justify-center shadow-md hover:bg-gray-800 hover:text-white transition-colors">
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <button onClick={(e) => handleIconClick(e, 'Compare')} className={`bg-white rounded-full h-9 w-9 flex items-center justify-center shadow-md hover:bg-gray-800 hover:text-white transition-colors ${isInCompare ? 'bg-gray-800 text-white' : ''}`}>
                            <FaBalanceScale className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Desktop "Add to Cart" Button */}
                    <div className="hidden lg:block absolute bottom-0 inset-x-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        <button onClick={handleAddToCart} className="w-full bg-black text-white font-bold py-2.5 px-4 rounded-md text-sm hover:bg-red-600 transition-colors duration-200">
                            ADD TO CART
                        </button>
                    </div>
                </div>

                {/* --- TEXT CONTAINER (FIXED) --- */}
                <div className="pt-3 px-1 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="flex-1 text-sm font-bold text-gray-900 uppercase pr-2 line-clamp-2">
                            <Link to={`/product/${product.id}`} className="hover:text-gray-600 transition-colors">{product.name}</Link>
                        </h3>
                        {/* Mobile Icons */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <button onClick={(e) => handleIconClick(e, 'Wishlist')} className="flex-shrink-0 text-gray-800"><FiHeart size={20} className={`${isInWishlist ? 'text-red-500 fill-current' : ''}`} /></button>
                            <button onClick={handleAddToCart} className="flex-shrink-0 text-gray-800"><FiShoppingBag size={20} /></button>
                            <button onClick={(e) => {e.preventDefault(); setIsMenuOpen(!isMenuOpen);}} className="flex-shrink-0 text-gray-800 relative z-30"><FiMoreVertical size={20} /></button>
                        </div>
                        {/* Desktop Wishlist Icon */}
                        <button onClick={(e) => handleIconClick(e, 'Wishlist')} className="hidden lg:block flex-shrink-0 text-gray-800">
                            {isInWishlist ? <FaHeart size={20} className="text-red-500" /> : <FiHeart size={20} />}
                        </button>
                    </div>

                    {/* Category and Price Info Block */}
                    <div className="mt-1">
                        <p className="text-xs text-gray-500">{product.category}</p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <div className="flex items-baseline">
                                <span className="text-xs font-medium text-gray-800 mr-0.5">Rs</span>
                                <span className="text-md font-medium text-gray-800">{formatPrice(product.price)}</span>
                            </div>
                            {product.originalPrice && isSpecialOffer && (
                                <div className="flex items-baseline">
                                    <span className="text-xs text-gray-500 line-through mr-0.5">Rs</span>
                                    <span className="text-xs text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                                </div>
                            )}
                            {isSpecialOffer && (
                                <div className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-sm">
                                    SALE
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Options Dropdown */}
                {isMenuOpen && (
                    <>
                        <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-20 lg:hidden"></div>
                        <div className="absolute top-12 right-2 bg-white rounded-md shadow-lg border border-gray-100 w-40 z-30 lg:hidden">
                            <button onClick={(e) => handleIconClick(e, 'Search')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                                <FiSearch size={16} /> Quick View
                            </button>
                            <button onClick={(e) => handleIconClick(e, 'Compare')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                                <FaBalanceScale size={16} /> Compare
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && <QuickViewModal product={product} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default ProductCard;