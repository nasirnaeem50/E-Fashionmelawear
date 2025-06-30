import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBolt } from "react-icons/fa";
import { specialOffers } from "../../data/mockData";

// --- FIX: Define the target date ONCE outside the component ---
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);

function calculateTimeLeft() {
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

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

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
  
  const textShadow = { textShadow: '0 2px 8px rgba(0,0,0,0.7)' };

  return (
    <div id="special-offers" className="antialiased py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl min-h-[700px] lg:min-h-[600px] flex items-center p-6 sm:p-8 lg:p-12">
          
          <AnimatePresence>
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: -2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img
                src={banners[currentBanner]}
                alt={`Special Offer Banner ${currentBanner + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
 
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-10 items-center">
            
            <div className="flex flex-col text-center lg:text-left order-2 lg:order-1 lg:col-span-3">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-2">
                <FaBolt className="text-amber-400" />
                <h2 className="text-lg md:text-xl font-bold text-amber-400 uppercase tracking-widest" style={textShadow}>
                  Flash Sale
                </h2>
              </div>
              <h1 className="font-black text-5xl md:text-7xl text-white mb-4" style={textShadow}>
                <motion.span 
                  animate={{ opacity: [1, 0.6, 1] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-red-500"
                >
                  Up to {maxDiscount}% OFF
                </motion.span>
              </h1>
              <p className="text-md md:text-lg text-neutral-300 max-w-lg mx-auto lg:mx-0" style={textShadow}>
                Explore electrifying deals on our best-selling collections before time runs out!
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5 mt-8">
                {featuredOffers.map((offer) => {
                  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
                  return (
                    <Link
                      key={offer.id}
                      to={`/product/${offer.id}`}
                      className="group block overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 hover:-translate-y-1"
                    >
                      <div className="relative w-full overflow-hidden aspect-square">
                        <img
                          src={offer.image}
                          alt={offer.name}
                          className="h-full w-full object-contain p-2 lg:object-cover lg:object-top lg:p-0 transition-transform duration-300 group-hover:scale-105"
                        />
                         <span className="absolute top-2 right-2 inline-block bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                           -{discount}%
                         </span>
                      </div>
                      
                      <div className="p-2 md:p-3">
                        <p className="font-bold text-xs md:text-sm leading-tight truncate text-white">
                          {offer.name}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1.5">
                           {/* --- CHANGE: Removed background and set text color to amber for readability --- */}
                          <span className="text-sm md:text-base font-bold text-amber-400">
                            Rs {offer.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] md:text-xs text-neutral-400 line-through">
                            Rs {offer.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8 order-1 lg:order-2 lg:col-span-2">
              <p className="font-semibold text-xl text-white tracking-wide" style={textShadow}>
                Offer Ends In
              </p>
              
              {Object.keys(timeLeft).length > 0 ? (
                <div className="flex items-start justify-center space-x-3 sm:space-x-4 text-center">
                  {Object.entries(timeLeft).map(([interval, value]) => (
                    <div key={interval} className="flex flex-col items-center w-16 sm:w-20">
                      <span className="text-4xl sm:text-6xl font-bold text-white tabular-nums" style={textShadow}>{String(value).padStart(2, '0')}</span>
                      <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1">{interval}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-28 flex items-center justify-center">
                  <p className="text-2xl text-red-500 font-bold">Offer has expired!</p>
                </div>
              )}
              
              <Link
                to="/shop?filter=special-offers"
                className="w-full max-w-xs text-center bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-3.5 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-red-500/40 text-base md:text-lg"
              >
                Shop All Offers
              </Link>

              <div className="flex justify-center pt-4 space-x-2.5">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`h-2.5 rounded-full transition-all duration-400 ease-out ${index === currentBanner ? 'bg-white w-8' : 'bg-white/40 w-2.5 hover:bg-white/70'}`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;