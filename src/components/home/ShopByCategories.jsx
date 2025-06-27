import React from 'react';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper core and required modules
import { Navigation } from 'swiper/modules';
// Import navigation icons
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Import mock data
import { categories } from '../../data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// --- CategoryCard Component ---
const CategoryCard = ({ category }) => {
  const imagePath = `/images/categories/${category.image.split('/').pop()}`;

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="block text-center group/slide"
    >
      {/* CHANGE: Added 'relative' to the container so the lighting effect can be positioned inside it. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
        <img
          src={imagePath}
          alt={category.name}
          className="w-full h-full object-cover object-top transition-transform duration-300 ease-in-out group-hover/slide:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder.jpg';
          }}
        />

        {/* --- NEW: The Lighting Sheen Effect --- */}
        {/* This div is an overlay that starts off-screen and sweeps across on hover. */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent
                     transform -translate-x-full transition-transform duration-700 ease-in-out
                     group-hover/slide:translate-x-full"
        ></div>
      </div>
      
      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mt-4 uppercase tracking-wider">
        {category.name}
      </h3>
    </Link>
  );
};


// --- Main ShopByCategories Component ---
const ShopByCategories = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Shop by Categories
      </h2>
      
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id || category.name}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-2 lg:-left-4 z-10 cursor-pointer bg-white/80 rounded-full shadow-lg w-10 h-10 flex items-center justify-center backdrop-blur-sm opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <FiChevronLeft className="h-6 w-6 text-gray-800" />
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-2 lg:-right-4 z-10 cursor-pointer bg-white/80 rounded-full shadow-lg w-10 h-10 flex items-center justify-center backdrop-blur-sm opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <FiChevronRight className="h-6 w-6 text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;