import React from 'react';
import { Link } from 'react-router-dom';
import { products, specialOffers } from '../../data/mockData';
import ProductCard from '../shared/ProductCard';
import { SpecialOffersScroller } from './SpecialOffersScroller';

const NewCollections = () => {
  const newProducts = products.slice(0, 8);

  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Main Products Column */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">New Collections</h2>
              <Link to="/shop" className="text-red-500 font-semibold text-sm sm:text-base hover:underline">
                More Products →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Special Offers Sidebar */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Specials</h2>
            </div>
            <SpecialOffersScroller specialOffers={specialOffers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollections;