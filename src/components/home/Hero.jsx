// src/components/home/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"; // Import an icon for the hover effect

const heroCategories = [
  { name: "Lawn Collection", link: "/shop?category=Lawn+Collection" },
  { name: "Stitched Suits", link: "/shop?category=Stitched+Suits" },
  { name: "Kurtis", link: "/shop?category=Kurtis" },
  { name: "Men's Shalwar Kameez", link: "/shop?category=Men's+Shalwar+Kameez" },
  { name: "Formal Wear", link: "/shop?category=Formal+Wear" },
  { name: "Bridal Collection", link: "/shop?category=Bridal+Collection" },
  { name: "Men's Kurta", link: "/shop?category=Men's+Kurta" },
  { name: "Waistcoats", link: "/shop?category=Waistcoats" },
  { name: "Winter Collection", link: "/shop?category=Winter+Collection" },
  { name: "Summer Collection", link: "/shop?category=Summer+Collection" },
];

// Data for the sliding banners
const sideBanners = [
  {
    image: "/images/w1.webp",
    alt: "Women's fashion banner",
    title: "Trending Now",
    subtitle: "Women's Summer Edit",
    link: "/shop?category=Summer+Collection",
    linkLabel: "Discover More",
  },
  {
    image: "/images/m1.webp",
    alt: "Men's fashion banner",
    title: "For Him",
    subtitle: "Men's Formal Collection",
    link: "/shop?category=Men's+Shalwar+Kameez",
    linkLabel: "Shop The Look",
  },
  {
    image: "/images/w2.webp",
    alt: "Special offer on women's wear",
    title: "Special Offer",
    subtitle: "Get 30% Off Formal Wear",
    link: "/shop?category=Formal+Wear",
    linkLabel: "Shop The Sale",
  },
];

const Hero = () => {
  // State to track the current active slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect to handle the automatic sliding
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sideBanners.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 pt-2 pb-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Sidebar - Categories */}
          <div className="w-full lg:w-[250px] bg-white shrink-0 border border-gray-200 hidden lg:block">
            <ul className="divide-y divide-gray-200">
              {heroCategories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.link}
                    className="group flex items-center justify-between px-4 py-3 text-gray-800 transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white hover:pl-6"
                  >
                    <span className="text-sm font-bold">{category.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiChevronRight size={16} />
                    </span>
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
          <div className="flex-1" style={{ minHeight: "458px" }}>
            <div className="h-full flex flex-col md:flex-row gap-5">
              {/* Main Banner (Left) */}
              <div className="flex-grow h-80 md:h-full relative overflow-hidden group">
                <img
                  src="/images/banner3.jpg"
                  alt="Promotional banner for women's wear"
                  // === UPDATED: Added object-top ===
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-start justify-end p-6 md:p-8">
                  <div className="text-white">
                    <h2 className="text-xl md:text-2xl font-light uppercase tracking-wider">
                      New Collection
                    </h2>
                    <p className="text-3xl md:text-4xl font-bold mt-1">
                      Satin Elegance
                    </p>
                    <Link
                      to="/shop"
                      className="mt-4 inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors text-sm uppercase"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sliding Banner (Right) */}
              <div className="w-full md:w-[320px] shrink-0 h-80 md:h-full relative overflow-hidden rounded-md">
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {sideBanners.map((banner, index) => (
                    <div
                      key={index}
                      className="w-full h-full shrink-0 relative group"
                    >
                      <img
                        src={banner.image}
                        alt={banner.alt}
                        // === UPDATED: Added object-top ===
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative z-10 h-full flex flex-col justify-center items-start p-6 text-white">
                        <h3 className="text-xl font-light uppercase">
                          {banner.title}
                        </h3>
                        <p className="mt-1 font-semibold">{banner.subtitle}</p>
                        <Link
                          to={banner.link}
                          className="mt-3 inline-block font-bold py-1 text-xs uppercase tracking-wider border-b-2 border-white/70 hover:border-white transition-all"
                        >
                          {banner.linkLabel}
                        </Link>
                      </div>
                    </div>
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

export default Hero;