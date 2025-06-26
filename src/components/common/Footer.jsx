// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#212121] text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <Link to="/">
                            <img src="/images/logo-white.png" alt="Zolmo" className="h-10 w-auto" />
                        </Link>
                        <p>Got Question? Call us 24/7</p>
                        <p className="text-2xl font-bold text-white">0341 9169022</p>
                        <p>KP IT Park, Peshawar</p>
                        <p>info@fashionmela.com</p>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">COMPANY</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-red-400">About Us</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Team Member</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Career</Link></li>
                            <li><Link to="/contact" className="hover:text-red-400">Contact Us</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Affiliate</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Order History</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">CUSTOMER SERVICE</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-red-400">Payment Methods</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Money-back Guarantee!</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Products Returns</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Support Center</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Shipping</Link></li>
                            <li><Link to="#" className="hover:text-red-400">Term and Conditions</Link></li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">OUR NEWSLETTER</h3>
                        <p className="mb-4">To stay up-to-date on our promotions, discounts, sales, special offers and more.</p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Your E-mail Address" 
                                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none border border-gray-600 focus:border-red-500 placeholder-gray-400" 
                            />
                            <button 
                                type="submit" 
                                className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-6 py-1.5 rounded-r-md font-semibold transition-colors duration-300"
                            >
                                SIGN UP
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaPinterestP /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>Copyright © 2025 Fashion Mela Wear. All Rights Reserved.</p>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <span>We're using safe payment for:</span>
                        <img src="/images/payment-methods.png" alt="Payment Methods" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;