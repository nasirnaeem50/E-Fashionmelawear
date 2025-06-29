import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBolt } from "react-icons/fa";
import { specialOffers } from "../../data/mockData";

// --- FIX: Define the target date ONCE outside the component ---
// This creates a fixed target date 3 days in the future from the moment the component loads.
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);

// This function now calculates the difference from the fixed target date.
function calculateTimeLeft() {
  // The target date is now fixed and won't be recalculated every second.
  const difference = +targetDate - +new Date();
  
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Mins: Math.floor((difference / 1000 / 60) % 60),
      Secs: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

const SpecialOfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredOffers = specialOffers.slice(0, 3);

  const banners = [
    "/images/banner2.webp",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
  ];

  // Robust timer effect that updates every second
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Banner image rotation effect
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  const maxDiscount = Math.max(
    ...specialOffers.map((offer) =>
      Math.round(
        ((offer.originalPrice - offer.price) / offer.originalPrice) * 100
      )
    )
  );
  
  const textShadow = { textShadow: '0 2px 4px rgba(0,0,0,0.5)' };

  return (
    <div id="special-offers" className="py-8 md:py-12 antialiased">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl min-h-[600px] md:min-h-[500px] flex items-center p-6 md:p-8 lg:p-12">
          {/* Sliding Banners with Ken Burns Effect */}
          <AnimatePresence>
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-900/70 to-black/80 z-10"></div>
              <img
                src={banners[currentBanner]}
                alt={`Special Offer Banner ${currentBanner + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Content Grid */}
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            
            {/* Left Side: Text and Products */}
            <div className="lg:col-span-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <FaBolt className="text-yellow-400" />
                <h2 className="text-lg md:text-xl font-bold text-yellow-400 uppercase tracking-wider" style={textShadow}>
                  Flash Sale
                </h2>
              </div>
              <h1 className="font-black text-4xl md:text-6xl text-white mb-3" style={textShadow}>
                {/* --- THIS IS THE UPDATED ANIMATION --- */}
                <motion.span 
                  // Animate opacity from 1 (visible) to 0 (hidden) and back to 1
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ 
                    duration: 2.5, // The total time for one full cycle (show -> hide -> show)
                    repeat: Infinity, // Loop the animation forever
                    ease: "easeInOut", // Smooth transition
                    // This ensures the animation spends equal time fading out and fading in
                    times: [0, 0.5, 1] 
                  }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-500"
                >
                  Up to {maxDiscount}% OFF
                </motion.span>
              </h1>
              <p className="text-md md:text-lg text-gray-200 max-w-lg mx-auto lg:mx-0" style={textShadow}>
                Explore electrifying deals on our best-selling collections before time runs out!
              </p>

              {/* Featured Products Grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8">
                {featuredOffers.map((offer) => {
                  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
                  return (
                    <Link
                      key={offer.id}
                      to={`/product/${offer.id}`}
                      className="group block bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md p-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-500/10"
                    >
                      <div className="relative h-24 md:h-32 w-full mb-2 overflow-hidden rounded-md">
                        <img
                          src={offer.image}
                          alt={offer.name}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 p-1"
                        />
                         <span className="absolute top-1.5 right-1.5 inline-block bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                           {discount}%
                         </span>
                      </div>
                      <p className="text-white font-bold text-xs md:text-sm truncate px-1">
                        {offer.name}
                      </p>
                      <div className="flex items-baseline justify-start gap-2 mt-1 px-1">
                        <span className="text-red-400 font-bold text-sm md:text-base">
                          Rs {offer.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-400 line-through">
                          {offer.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Countdown Timer */}
            <div className="lg:col-span-2 w-full max-w-sm mx-auto">
              <div className="bg-black/20 backdrop-blur-lg p-5 md:p-6 rounded-xl border border-white/20 shadow-lg text-center">
                <p className="font-semibold text-lg mb-4 text-white" style={textShadow}>
                  Offer Ends In
                </p>
                
                {Object.keys(timeLeft).length > 0 ? (
                  <div className="flex justify-center space-x-2 md:space-x-4 mb-6">
                    {Object.entries(timeLeft).map(([interval, value]) => (
                      <div key={interval} className="flex flex-col items-center">
                        <div className="bg-white/10 border border-white/20 w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-3xl md:text-4xl">{String(value).padStart(2, '0')}</span>
                        </div>
                        <span className="text-xs text-white/70 uppercase mt-2">{interval}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6 h-28 flex items-center justify-center">
                    <p className="text-xl text-red-400 font-bold">Offer has expired!</p>
                  </div>
                )}
                
                <Link
                  to="/shop?filter=special-offers"
                  className="w-full inline-block bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg hover:shadow-red-500/40 text-sm md:text-base"
                >
                  Shop All Offers
                </Link>

                {/* Banner indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBanner(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentBanner ? 'bg-white w-6' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                      aria-label={`Go to banner ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;