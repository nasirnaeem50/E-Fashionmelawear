// src/components/home/Brands.jsx
import React from 'react';

const brands = [
    { 
        name: 'Khaadi', 
        logo: '/brands/Khaadi.png',
        bgColor: 'bg-[#f8f1e9]',
        hoverColor: 'group-hover:bg-[#e8d9c5]'
    },
    { 
        name: 'Gul Ahmed', 
        logo: '/brands/gul1.png',
        bgColor: 'bg-[#f5f0ff]',
        hoverColor: 'group-hover:bg-[#e3d8ff]'
    },
    { 
        name: 'Sapphire', 
        logo: '/brands/sapir.png',
        bgColor: 'bg-[#e6f2ff]',
        hoverColor: 'group-hover:bg-[#cce5ff]'
    },
    { 
        name: 'J.', 
        logo: '/brands/j.jpg',
        bgColor: 'bg-[#fff0f5]',
        hoverColor: 'group-hover:bg-[#ffd6e7]'
    },
    { 
        name: 'Alkaram Studio', 
        logo: '/brands/alkaram.png',
        bgColor: 'bg-[#f0f9f0]',
        hoverColor: 'group-hover:bg-[#d8f0d8]'
    },
    { 
        name: 'Nishat Linen', 
        logo: '/brands/nishat1.png',
        bgColor: 'bg-[#fff9e6]',
        hoverColor: 'group-hover:bg-[#ffeeb8]'
    },
    { 
        name: 'Bonanza Satrangi', 
        logo: '/brands/bonza.webp',
        bgColor: 'bg-[#ffecec]',
        hoverColor: 'group-hover:bg-[#ffd6d6]'
    },
    { 
        name: 'Sana Safinaz', 
        logo: '/brands/sana.png',
        bgColor: 'bg-[#f9f0ff]',
        hoverColor: 'group-hover:bg-[#ecdfff]'
    },
];

const Brands = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Top Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
                    {brands.map(brand => (
                        <div 
                            key={brand.name} 
                            className="flex flex-col items-center group"
                        >
                            <div className={`
                                relative
                                w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
                                rounded-full
                                ${brand.bgColor}
                                ${brand.hoverColor}
                                shadow-lg
                                flex items-center justify-center
                                transition-all duration-300 ease-in-out
                                transform group-hover:scale-110
                                border-2 border-gray-100 group-hover:border-gray-300
                                overflow-hidden
                                p-5
                            `}>
                                <img 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <span className="
                                mt-4
                                text-center text-sm font-medium text-gray-600
                                opacity-0 group-hover:opacity-100
                                transition-all duration-300
                                transform translate-y-2 group-hover:translate-y-0
                            ">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;