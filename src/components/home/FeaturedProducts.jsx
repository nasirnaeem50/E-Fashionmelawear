import React, { useState } from "react";

import { products } from '../../data/mockData';
import ProductCard from "../shared/ProductCard";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("sale");

  const getProducts = () => {
    switch (activeTab) {
      case "sale":
        return products.filter((p) => p.originalPrice).slice(0, 4);
      case "bestseller":
        return [...products]
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 4);
      case "toprated":
        return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
      default:
        return products.slice(0, 4);
    }
  };

  const tabClass = (tabName) =>
    `px-4 py-2 font-semibold border rounded-full cursor-pointer transition-colors duration-300 ${
      activeTab === tabName
        ? "bg-red-500 text-white border-red-500"
        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Featured Products
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("sale")}
            className={tabClass("sale")}
          >
            Sale Products
          </button>
          <button
            onClick={() => setActiveTab("bestseller")}
            className={tabClass("bestseller")}
          >
            Bestseller
          </button>
          <button
            onClick={() => setActiveTab("toprated")}
            className={tabClass("toprated")}
          >
            Top Rated
          </button>
        </div>
      </div>
      {/* --- THIS IS THE FIX --- */}
      {/* Changed 'grid-cols-1' to 'grid-cols-2' to start with a two-column layout */}
      {/* Also adjusted the gap for a better mobile look */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {getProducts().map((product) => (
          <ProductCard key={`${activeTab}-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;