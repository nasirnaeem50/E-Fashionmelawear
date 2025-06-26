// src/components/home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const heroCategories = [
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

const Hero = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 pt-2 pb-5">
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* Left Sidebar - Categories (HIDDEN on mobile, VISIBLE on desktop) */}
                    <div className="w-full lg:w-[250px] bg-white shrink-0 border border-gray-200 hidden lg:block">
                        <ul className="divide-y divide-gray-200">
                            {heroCategories.map((category, index) => (
                                <li key={index}>
                                    <Link 
                                        to={category.link} 
                                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <span className="text-sm">{category.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                         <div className="p-4 border-t border-gray-200 text-center">
                            <Link 
                                to="/shop" 
                                className="font-semibold text-gray-800 text-sm hover:text-red-600 uppercase"
                            >
                                View All Categories
                            </Link>
                        </div>
                    </div>

                    {/* Main Content - Banners */}
                    <div className="flex-1" style={{ minHeight: '458px' }}>
                        <div className="h-full flex flex-col md:flex-row gap-5">
                            
                            {/* Main Banner (Left) */}
                            <div className="flex-grow h-80 md:h-full relative overflow-hidden group">
                                <img 
                                    src="/images/banner3.jpg" 
                                    alt="Promotional banner for women's wear" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-start justify-end p-6 md:p-8">
                                    <div className="text-white">
                                        <h2 className="text-xl md:text-2xl font-light uppercase tracking-wider">New Collection</h2>
                                        <p className="text-3xl md:text-4xl font-bold mt-1">Satin Elegance</p>
                                        <Link
                                            to="/shop"
                                            className="mt-4 inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors text-sm uppercase"
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Side Banner (Right) */}
                            <div className="w-full md:w-[320px] shrink-0 h-80 md:h-full bg-cover bg-top md:bg-center relative flex flex-col justify-center items-start p-8" 
                                 style={{ backgroundImage: "url('/images/w1.webp')" }}
                            >
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="relative z-10 text-white">
                                    <h3 className="text-3xl font-light uppercase">Save 20%</h3>
                                    <p className="mt-1 text-lg font-semibold">on Art Dumping</p>
                                    <Link
                                        to="/shop"
                                        className="mt-4 inline-block font-bold py-2 text-xs uppercase tracking-wider border-b-2 border-white/70 hover:border-white transition-all"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;