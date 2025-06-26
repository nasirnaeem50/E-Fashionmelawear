// src/components/home/ShopByCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const ShopByCategories = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Shop by Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {categories.slice(0, 10).map((category, index) => (
                    <Link 
                        key={index} 
                        to={`/shop?category=${encodeURIComponent(category.name)}`} 
                        className="group text-center"
                    >
                        <div className="
                            bg-white p-6 rounded-xl shadow-md 
                            hover:shadow-xl transition-all duration-300 
                            flex flex-col items-center justify-center h-80
                        ">
                            <div className="
                                w-48 h-48 mb-6 overflow-hidden 
                                flex items-center justify-center
                            ">
                                <img 
                                    src={category.image} 
                                    alt={category.name} 
                                    className="
                                        w-full h-full object-contain 
                                        transition-transform duration-300 
                                        group-hover:scale-105
                                    "
                                />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                                {category.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ShopByCategories;