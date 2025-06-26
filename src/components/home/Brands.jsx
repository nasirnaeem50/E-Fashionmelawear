import React from 'react';

const brands = [
    { 
        name: 'Khaadi', 
        logo: '/brands/Khaadi.png'
    },
    { 
        name: 'Gul Ahmed', 
        logo: '/brands/gul1.png'
    },
    { 
        name: 'Sapphire', 
        logo: '/brands/sapir.png'
    },
    { 
        name: 'J.', 
        logo: '/brands/j.jpg'
    },
    { 
        name: 'Alkaram Studio', 
        logo: '/brands/alkaram.png'
    },
    { 
        name: 'Nishat Linen', 
        logo: '/brands/nishat1.png'
    },
    { 
        name: 'Bonanza Satrangi', 
        logo: '/brands/bonza.webp'
    },
    { 
        name: 'Sana Safinaz', 
        logo: '/brands/sana.png'
    },
];

const Brands = () => {
    return (
        <div className="bg-white py-16 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Top Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
                    {brands.map(brand => (
                        <div 
                            key={brand.name} 
                            className="flex flex-col items-center group"
                        >
                            <div className="
                                relative
                                w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
                                rounded-full
                                bg-white
                                shadow-md
                                flex items-center justify-center
                                transition-all duration-300 ease-in-out
                                transform group-hover:scale-105
                                border border-gray-200 group-hover:border-gray-300
                                overflow-hidden
                                p-5
                                hover:shadow-lg
                            ">
                                <img 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/placeholder-brand.png';
                                    }}
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