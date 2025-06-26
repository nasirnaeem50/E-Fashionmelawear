import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products, categories, specialOffers } from '../data/mockData';
import ProductCard from '../components/shared/ProductCard';
import PageTransition from '../components/shared/PageTransition';
import { FiFilter } from 'react-icons/fi';

const Shop = () => {
    const location = useLocation();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [gender, setGender] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlCategory = queryParams.get('category');
        const urlSearch = queryParams.get('search');
        const urlFilter = queryParams.get('filter');

        if (urlCategory) {
            setSelectedCategories([urlCategory]);
        } else {
            setSelectedCategories([]);
        }

        if (urlSearch) {
            setSearchQuery(urlSearch);
        } else {
            setSearchQuery('');
        }

        if (urlFilter) {
            setActiveFilter(urlFilter);
        } else {
            setActiveFilter(null);
        }
    }, [location.search]);

    useEffect(() => {
        let tempProducts = [...products];

        // Apply filter from URL
        if (activeFilter === 'special-offers') {
            const specialOfferIds = specialOffers.map(offer => offer.id);
            tempProducts = tempProducts.filter(p => 
                specialOfferIds.includes(p.id)
            );
        } else if (activeFilter === 'flash-sale') {
            // For flash sale, show products with 30% or more discount
            tempProducts = tempProducts.filter(p => 
                p.originalPrice && 
                ((p.originalPrice - p.price) / p.originalPrice) >= 0.3
            );
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            tempProducts = tempProducts.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Apply gender filter
        if (gender !== 'all') {
            tempProducts = tempProducts.filter(p => p.gender.toLowerCase() === gender);
        }

        // Apply category filter
        if (selectedCategories.length > 0) {
            tempProducts = tempProducts.filter(p => selectedCategories.includes(p.category));
        }
        
        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                tempProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                tempProducts.sort((a, b) => b.price - a.price);
                break;
            case 'latest':
                tempProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        setFilteredProducts(tempProducts);
    }, [gender, selectedCategories, sortBy, searchQuery, activeFilter]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        }
    };

    return (
        <PageTransition>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat.name} className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            value={cat.name} 
                                            onChange={handleCategoryChange}
                                            checked={selectedCategories.includes(cat.name)}
                                            className="form-checkbox text-red-500"
                                        />
                                        <span className="ml-2 text-gray-600">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                            
                            <h3 className="font-bold text-lg mt-6 mb-4">Gender</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="all" checked={gender === 'all'} onChange={e => setGender(e.target.value)} className="form-radio text-red-500"/>
                                    <span className="ml-2 text-gray-600">All</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="women" checked={gender === 'women'} onChange={e => setGender(e.target.value)} className="form-radio text-red-500"/>
                                    <span className="ml-2 text-gray-600">Women</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="men" checked={gender === 'men'} onChange={e => setGender(e.target.value)} className="form-radio text-red-500"/>
                                    <span className="ml-2 text-gray-600">Men</span>
                                </label>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="lg:hidden flex items-center gap-2 p-2 border rounded-md">
                                <FiFilter/> Filters
                            </button>
                            <p className="text-gray-600 hidden sm:block">{filteredProducts.length} products found</p>
                            <div>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50">
                                    <option value="default">Default Sorting</option>
                                    <option value="latest">Sort by Latest</option>
                                    <option value="price-asc">Sort by Price: Low to High</option>
                                    <option value="price-desc">Sort by Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PageTransition>
    );
};

export default Shop;