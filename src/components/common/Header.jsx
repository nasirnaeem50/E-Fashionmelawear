import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ADDED
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaBalanceScale, FaBolt, FaTag } from "react-icons/fa";
import { toast } from 'react-toastify';
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useProductLists } from "../../context/ProductListsContext";
import { useTheme } from "../../context/ThemeContext";
import { categories } from "../../data/mockData";

const mobileMenuCategories = [
    { name: 'Lawn Collection', link: '/shop?category=Lawn+Collection' },
    { name: 'Stitched Suits', link: '/shop?category=Stitched+Suits' },
    { name: 'Kurtis', link: '/shop?category=Kurtis' },
    { name: "Men's Shalwar Kameez", link: "/shop?category=Men's+Shalwar+Kameez" },
    { name: 'Formal Wear', link: '/shop?category=Formal+Wear' },
    { name: 'Bridal Collection', link: '/shop?category=Bridal+Collection' },
    { name: "Men's Kurta", link: "/shop?category=Men's+Kurta" },
    { name: 'Waistcoats', link: '/shop?category=Waistcoats' },
    { name: 'Winter Collection', link: '/shop?category=Winter+Collection' },
    { name: 'Summer Collection', link: '/shop?category=Summer+Collection' },
];

const Header = () => {
  const { getCartItemCount, getCartTotal } = useContext(CartContext);
  const { user, logout, isAdmin } = useAuth();
  const { getWishlistCount, getCompareCount } = useProductLists();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderCategoryOpen, setIsHeaderCategoryOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('menu');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("all");
  const navigate = useNavigate();

  // --- ADDED: State for new mobile search UI ---
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const activeLinkStyle = { color: "#ef4444", fontWeight: "600" };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
      setIsMobileSearchOpen(false); // Close mobile search on submit
    } else {
        toast.warn("Please enter a search term.");
    }
  };

  const handleCategoryClick = (categoryLink) => {
    navigate(categoryLink);
    setIsMenuOpen(false);
    setIsHeaderCategoryOpen(false);
  };

  const handleNavLinkClick = (path) => {
      navigate(path);
      setIsMenuOpen(false);
  }

  const handleLogout = () => {
      logout();
      navigate('/'); 
      setIsMenuOpen(false);
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* ADDED: Framer Motion for smooth UI transitions */}
        <AnimatePresence mode="wait">
            {isMobileSearchOpen ? (
                // --- NEW: Mobile Search View ---
                <motion.div
                    key="mobile-search"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center h-[68px] lg:hidden"
                >
                    <form onSubmit={handleSearch} className="flex-grow flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full h-10 px-4 border-b-2 border-gray-300 focus:border-red-500 focus:outline-none bg-transparent"
                            autoFocus
                        />
                    </form>
                    <button onClick={() => setIsMobileSearchOpen(false)} className="ml-4 text-gray-600">
                        <FiX size={28} />
                    </button>
                </motion.div>
            ) : (
                // --- Original Header View ---
                <motion.div
                    key="main-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center py-3"
                >
                    <div className="flex items-center">
                        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden mr-3">
                            <FiMenu size={28} />
                        </button>
                        <Link to="/" className="flex items-center shrink-0">
                            <img src="/images/logop.png" alt="Zolmo" className="h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center px-8">
                        <form onSubmit={handleSearch} className="w-full max-w-xl flex items-center border-2 border-red-500 rounded-md">
                            <div className="relative">
                                <select
                                  className="h-full bg-transparent pl-4 pr-8 text-sm text-gray-600 focus:outline-none appearance-none border-r border-gray-300"
                                  value={selectedSearchCategory}
                                  onChange={(e) => setSelectedSearchCategory(e.target.value)}
                                >
                                  <option value="all">All Categories</option>
                                  {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                                </select>
                                <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search in..." className="w-full py-2.5 px-4 focus:outline-none text-sm"/>
                            <button type="submit" className="px-4 text-gray-500 hover:text-red-500"><FiSearch className="h-5 w-5" /></button>
                        </form>
                    </div>
          
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="flex items-center space-x-4 lg:hidden">
                            <button onClick={toggleTheme} className="text-gray-600" aria-label="Toggle theme">
                                {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
                            </button>
                            <button onClick={() => setIsMobileSearchOpen(true)} className="text-gray-600">
                                <FiSearch size={24} />
                            </button>
                        </div>
            
                        <div className="hidden lg:flex items-center space-x-4 md:space-x-6">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                            </button>

                            {user ? (
                              <div className="relative group">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                                  <FiUser size={24} />
                                  <span className="font-semibold">Hi, {user.name.split(" ")[0]}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border">
                                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                                  <Link to="/profile/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                  {isAdmin && (
                                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                                  )}
                                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                              </div>
                            ) : (
                              <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                                <FiUser size={22} />
                                <span>Login</span>
                              </Link>
                            )}
                            
                            <Link to="/profile/compare" className="flex items-center text-gray-600 hover:text-red-500 relative">
                                <FaBalanceScale size={22} />
                                 <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{getCompareCount()}</span>
                            </Link>
                             <Link to="/profile/wishlist" className="flex items-center text-gray-600 hover:text-red-500 relative">
                                <FiHeart size={22} />
                                 <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{getWishlistCount()}</span>
                            </Link>
                        </div>
            
                        <Link to="/cart" className="relative flex items-center text-gray-600 hover:text-gray-800 space-x-3">
                          <div className="relative">
                            <FiShoppingCart size={26} />
                            <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{getCartItemCount()}</span>
                          </div>
                          <div className="hidden md:block">
                              <span className="text-sm text-gray-500">Shopping Cart</span>
                              <p className="font-bold text-gray-800 text-sm">Rs{getCartTotal().toFixed(2)}</p>
                          </div>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <nav className="bg-[#2d2d2d] text-white hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center h-12">
           <div className="flex items-center space-x-6">
                <div className="relative" onMouseLeave={() => setIsHeaderCategoryOpen(false)}>
                    <button onClick={() => setIsHeaderCategoryOpen(prev => !prev)} onMouseEnter={() => setIsHeaderCategoryOpen(true)} className="bg-red-600 h-12 flex items-center px-4 lg:px-6 -ml-4 space-x-3">
                        <FiMenu size={20} />
                        <span className="font-semibold uppercase text-sm">All Categories</span>
                    </button>
                    {isHeaderCategoryOpen && (
                        <div className="absolute top-full left-0 w-64 bg-white text-black shadow-lg rounded-b-md z-50 border border-t-0">
                           <nav className="flex flex-col divide-y divide-gray-200">
                                {mobileMenuCategories.map((category) => (
                                    <button key={category.name} onClick={() => handleCategoryClick(category.link)} className="text-left py-3 px-4 hover:bg-gray-100 text-sm">{category.name}</button>
                                ))}
                                <button onClick={() => handleNavLinkClick('/shop')} className="text-left py-3 px-4 font-semibold hover:bg-gray-100 text-sm">View All Categories</button>
                           </nav>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-6 font-medium text-sm">
                    <NavLink to="/" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="hover:text-red-500">Home</NavLink>
                    <NavLink to="/about" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="hover:text-red-500">About Us</NavLink>
                    <NavLink to="/shop" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="hover:text-red-500">Shop</NavLink>
                    <NavLink to="/contact" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="hover:text-red-500">Contact Us</NavLink>
                </div>
           </div>
          <div className="flex items-center space-x-6">
            <Link to="/#special-offers" className="flex items-center space-x-2 hover:text-red-500 text-sm font-medium"><FaBolt className="text-yellow-400" /><span>Flash Sale</span></Link>
            <Link to="/shop?filter=special-offers" className="flex items-center space-x-2 hover:text-red-500 text-sm font-medium"><FaTag className="text-red-500" /><span>Special Offers</span></Link>
          </div>
        </div>
      </nav>

     <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`relative h-full w-full max-w-xs bg-[#2d2d2d] text-gray-300 p-5 shadow-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FiX size={24} /></button>
            
            <form onSubmit={handleSearch} className="relative mb-6">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pr-10 pl-4 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"/>
                <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-400"><FiSearch className="h-5 w-5" /></button>
            </form>

            <div className="flex border-b border-gray-700 mb-4">
                <button onClick={() => setActiveMobileTab('menu')} className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider ${activeMobileTab === 'menu' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}>Main Menu</button>
                <button onClick={() => setActiveMobileTab('categories')} className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider ${activeMobileTab === 'categories' ? 'text-white border-b-2 border-red-500' : 'text-gray-400'}`}>Categories</button>
            </div>
            <div className="overflow-y-auto" style={{ height: 'calc(100vh - 150px)' }}>
                {activeMobileTab === 'menu' && (
                    <nav className="flex flex-col space-y-1">
                        <button onClick={() => handleNavLinkClick('/')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Home</button>
                        <button onClick={() => handleNavLinkClick('/about')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">About Us</button>
                        <button onClick={() => handleNavLinkClick('/shop')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Shop</button>
                        <button onClick={() => handleNavLinkClick('/contact')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Contact Us</button>
                        
                        <div className="border-t border-gray-700 my-2"></div>

                        <button onClick={() => handleNavLinkClick('/profile/wishlist')} className="flex justify-between items-center text-left py-2.5 px-2 rounded hover:bg-gray-700">
                            <span>Wishlist</span>
                            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">{getWishlistCount()}</span>
                        </button>
                        <button onClick={() => handleNavLinkClick('/profile/compare')} className="flex justify-between items-center text-left py-2.5 px-2 rounded hover:bg-gray-700">
                            <span>Compare</span>
                            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">{getCompareCount()}</span>
                        </button>
                        
                        <div className="border-t border-gray-700 my-2"></div>

                        {user ? (
                             <>
                                <button onClick={() => handleNavLinkClick('/profile')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">My Profile</button>
                                {isAdmin && (
                                    <button onClick={() => handleNavLinkClick('/admin')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Admin Dashboard</button>
                                )}
                                <button onClick={handleLogout} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleNavLinkClick('/login')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Login</button>
                                <button onClick={() => handleNavLinkClick('/register')} className="text-left py-2.5 px-2 rounded hover:bg-gray-700">Register</button>
                            </>
                        )}
                    </nav>
                )}
                {activeMobileTab === 'categories' && (
                    <nav className="flex flex-col divide-y divide-gray-700">
                        {mobileMenuCategories.map((c) => <button key={c.name} onClick={() => handleCategoryClick(c.link)} className="text-left py-3">{c.name}</button>)}
                        <button onClick={() => handleNavLinkClick('/shop')} className="text-left py-3 font-semibold">View All Categories</button>
                    </nav>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;