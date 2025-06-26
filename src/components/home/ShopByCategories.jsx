import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const ShopByCategories = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Shop by Categories
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
        {categories.map((category, index) => {
          const imagePath = `/images/categories/${category.image.split('/').pop()}`;
          
          return (
            <div key={index} className="group">
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="block h-full"
              >
                {/* Card container with enhanced white background */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-[260px] sm:h-[360px] md:h-[400px] flex flex-col">
                  {/* Image container */}
                  <div className="w-full h-[160px] sm:h-[240px] md:h-[300px] mb-2 sm:mb-4 overflow-hidden flex items-center justify-center bg-white rounded-lg">
                    <img
                      src={imagePath}
                      alt={category.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg text-center mt-auto">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByCategories;