// SpecialOffersColumn.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SpecialOfferItem = ({ offer, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-white p-3 sm:p-4 shadow-sm rounded-lg hover:shadow-md transition-all duration-300 mb-3"
    style={{ height: '5rem' }} // Fixed height for each item
  >
    <Link to={`/product/${offer.id}`} className="flex items-center space-x-3 sm:space-x-4 h-full">
      <motion.img 
        src={offer.image} 
        alt={offer.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{offer.name}</h4>
        <div className="flex items-center my-1">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-xs ${i < Math.round(offer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="flex items-baseline">
          <span className="text-red-500 font-bold text-sm sm:text-base">Rs {offer.price.toLocaleString()}</span>
          <span className="ml-2 text-xs text-gray-400 line-through">Rs {offer.originalPrice.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export const SpecialOffersColumn = ({ offers, columnIndex }) => (
  <div 
    className="flex flex-col space-y-3 w-full px-2"
    // --- THIS IS THE FIX ---
    // Recalculated height for 8 items (8 * 5rem item + 7 * 0.75rem gap = 45.25rem)
    style={{ height: '45.25rem' }}
  >
    {/* Changed slice from 7 to 8 to show eight items per column */}
    {offers.slice(0, 8).map((offer, index) => (
      <SpecialOfferItem 
        key={`${offer.id}-${columnIndex}-${index}`} 
        offer={offer} 
        index={index}
      />
    ))}
  </div>
);