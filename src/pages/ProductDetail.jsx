import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/mockData";
import { CartContext } from "../context/CartContext";
import PageTransition from "../components/shared/PageTransition";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Product not found
          </h2>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-md hover:bg-red-600 transition duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </PageTransition>
    );
  }

  const handleAddToCart = () => {
    const itemToAdd = { ...product, quantity };
    addToCart(itemToAdd);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-gray-50 rounded-lg overflow-hidden p-4 shadow-sm border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={18}
                    className={
                      i < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                ({product.reviewCount} Reviews)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-bold text-red-500">
                Rs {product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FaMinus size={14} />
                </button>
                <span className="px-4 py-2 font-semibold text-gray-800 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FaPlus size={14} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 shadow-sm hover:shadow-md"
              >
                ADD TO CART
              </button>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium text-gray-800">Category:</span>{" "}
                  <Link
                    to={`/shop?category=${product.category}`}
                    className="text-red-500 hover:underline ml-1"
                  >
                    {product.category}
                  </Link>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Gender:</span>{" "}
                  <span className="ml-1 capitalize">{product.gender}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    Availability:
                  </span>{" "}
                  <span className="ml-1 text-green-600">In Stock</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
