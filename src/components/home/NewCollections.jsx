import React from 'react';
import { Link } from 'react-router-dom';
import { products, specialOffers } from '../../data/mockData';
import ProductCard from '../shared/ProductCard';
import { SpecialOffersScroller } from './SpecialOffersScroller';

const NewCollections = () => {
  const newProducts = products.slice(0, 8);

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        {/* The parent grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Main Products Column (takes up 3 of 4 columns on large screens) */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">New Collections</h2>
              <Link 
                to="/shop" 
                className="text-red-500 font-semibold text-sm sm:text-base hover:underline transition-colors duration-200"
              >
                More Products →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Special Offers Sidebar (takes up 1 of 4 columns on large screens) */}
          <div className="lg:col-span-1">
            {/* --- THIS IS THE FIX --- */}
            {/* 
              By adding 'h-full', this div will stretch to match the height of its parent grid cell.
              Since the grid cells in a row have the same height, this container will now be as tall
              as the product grid next to it.
            */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Specials</h2>
              </div>
              <SpecialOffersScroller specialOffers={specialOffers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollections;