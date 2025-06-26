import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import PageTransition from "../components/shared/PageTransition";
// --- UPDATED: Added new icons ---
import {
  FaSpinner,
  FaLock,
  FaMoneyBillWave,
  FaUniversity,
} from "react-icons/fa";
import { FiCheckCircle, FiTruck, FiCreditCard } from "react-icons/fi";
import { specialOffers } from "../data/mockData";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [easypaisaNumber, setEasypaisaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const isSpecialOffer = (productId) => {
    return specialOffers.some((offer) => offer.id === productId);
  };

  const getDiscountInfo = (productId) => {
    const offer = specialOffers.find((offer) => offer.id === productId);
    if (offer) {
      return {
        percentage: Math.round(
          ((offer.originalPrice - offer.price) / offer.originalPrice) * 100
        ),
        originalPrice: offer.originalPrice,
      };
    }
    return null;
  };

  const pricingInfo = cartItems.reduce(
    (acc, item) => {
      const discountInfo = isSpecialOffer(item.id)
        ? getDiscountInfo(item.id)
        : null;
      const originalPrice = discountInfo?.originalPrice || item.price;

      return {
        originalSubtotal: acc.originalSubtotal + originalPrice * item.quantity,
        discountAmount:
          acc.discountAmount +
          (discountInfo ? (originalPrice - item.price) * item.quantity : 0),
        itemCount: acc.itemCount + item.quantity,
      };
    },
    { originalSubtotal: 0, discountAmount: 0, itemCount: 0 }
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.name.value || !form.address.value || !form.phone.value) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setIsProcessing(true);

    const order = {
      shippingInfo: {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value || "",
        address: form.address.value,
      },
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      items: cartItems.map((item) => {
        const discountInfo = isSpecialOffer(item.id)
          ? getDiscountInfo(item.id)
          : null;
        return {
          ...item,
          originalPrice: discountInfo?.originalPrice || item.price,
          discountPercentage: discountInfo?.percentage || 0,
        };
      }),
      subtotal: pricingInfo.originalSubtotal,
      discount: pricingInfo.discountAmount,
      total: getCartTotal(),
      status: "Processing",
      date: new Date().toISOString(),
    };

    try {
      const newOrder = await addOrder(order);
      setOrderDetails(newOrder);

      if (paymentMethod === "easypaisa") {
        if (!/^(03)\d{9}$/.test(easypaisaNumber)) {
          alert(
            "Please enter a valid 11-digit Easypaisa number (e.g., 03xxxxxxxxx)."
          );
          setIsProcessing(false);
          return;
        }

        setTimeout(() => {
          const isSuccess = Math.random() > 0.5;
          if (isSuccess) {
            setOrderPlaced(true);
            setTimeout(() => {
              clearCart();
              navigate("/payment-status", {
                state: {
                  status: "success",
                  orderId: newOrder.id,
                  orderTotal: order.total,
                },
              });
            }, 2000);
          } else {
            navigate("/payment-status", {
              state: {
                status: "failure",
                orderId: newOrder.id,
                orderTotal: order.total,
              },
            });
          }
          setIsProcessing(false);
        }, 2000);
      } else {
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          navigate("/profile/orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error processing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  const getLabelClass = (method) => {
    return `flex items-center p-4 border rounded-md cursor-pointer transition-all duration-200 ${
      paymentMethod === method
        ? "bg-red-50 border-red-500 ring-2 ring-red-200"
        : "bg-white border-gray-200 hover:border-red-300"
    }`;
  };

  if (orderPlaced) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order #{orderDetails.id} has
              been confirmed.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="font-medium">
                Order Total: Rs {orderDetails.total.toLocaleString()}
              </p>
              {orderDetails.discount > 0 && (
                <p className="text-green-600">
                  You saved Rs {orderDetails.discount.toLocaleString()}
                </p>
              )}
            </div>
            <Link
              to="/profile/orders"
              className="inline-block bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/cart"
            className="flex items-center text-gray-600 hover:text-red-500 transition-colors mr-6"
          >
            <FiTruck className="mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Shipping and Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={user?.name || ""}
                    required
                    className="w-full p-2 border rounded-md focus:ring-red-300 focus:border-red-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full p-2 border rounded-md focus:ring-red-300 focus:border-red-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full p-2 border rounded-md focus:ring-red-300 focus:border-red-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    className="w-full p-2 border rounded-md focus:ring-red-300 focus:border-red-300"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {/* --- UPDATED: Cash on Delivery with Icon --- */}
                <label className={getLabelClass("cod")}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="form-radio text-red-500 focus:ring-red-500"
                  />
                  <div className="flex items-center w-full ml-4">
                    <div className="flex-shrink-0 w-8 text-center">
                      <FaMoneyBillWave className="w-6 h-6 text-green-600 inline-block" />
                    </div>
                    <div className="ml-3">
                      <span className="font-semibold">
                        Cash on Delivery (COD)
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Pay with cash upon receiving your order.
                      </p>
                    </div>
                  </div>
                </label>

                {/* --- UPDATED: Bank Transfer with Icon --- */}
                <label className={getLabelClass("bank")}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                    className="form-radio text-red-500 focus:ring-red-500"
                  />
                  <div className="flex items-center w-full ml-4">
                    <div className="flex-shrink-0 w-8 text-center">
                      <FaUniversity className="w-6 h-6 text-blue-700 inline-block" />
                    </div>
                    <div className="ml-3">
                      <span className="font-semibold">Bank Transfer</span>
                      <p className="text-sm text-gray-500 mt-1">
                        Transfer the amount to our bank account.
                      </p>
                    </div>
                  </div>
                </label>

                {/* --- UPDATED: Easypaisa with Icon --- */}
                <label className={getLabelClass("easypaisa")}>
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa"
                    checked={paymentMethod === "easypaisa"}
                    onChange={() => setPaymentMethod("easypaisa")}
                    className="form-radio text-red-500 focus:ring-red-500"
                  />
                  <div className="flex items-center w-full ml-4">
                    <div className="flex-shrink-0 w-8 text-center">
                      <img
                        src="/images/easy.webp"
                        alt="Easypaisa"
                        className="h-6 inline-block"
                      />
                    </div>
                    <div className="ml-3">
                      <span className="font-semibold">Easypaisa</span>
                      <p className="text-sm text-gray-500 mt-1">
                        Pay securely with your mobile account.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {paymentMethod === "bank" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-gray-100 rounded-md text-sm"
                >
                  <p className="font-bold mb-2">Our Bank Details:</p>
                  <p>Bank: HBL</p>
                  <p>Account Name: Fashion Mela Wear</p>
                  <p>Account Number: 1234-5678-9012-3456</p>
                  <p className="mt-2 text-xs">
                    Please send a screenshot of the transaction to our WhatsApp
                    number after placing the order.
                  </p>
                </motion.div>
              )}

              {paymentMethod === "easypaisa" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-gray-100 rounded-md text-sm"
                >
                  <p className="font-bold mb-2">
                    Enter your Easypaisa account details:
                  </p>
                  <input
                    type="tel"
                    value={easypaisaNumber}
                    onChange={(e) => setEasypaisaNumber(e.target.value)}
                    placeholder="Easypaisa Account Number (03xxxxxxxxx)"
                    className="w-full p-2 border rounded-md focus:ring-red-300 focus:border-red-300"
                    required
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => {
                  const discountInfo = isSpecialOffer(item.id)
                    ? getDiscountInfo(item.id)
                    : null;
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm border-b pb-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          {discountInfo && (
                            <span className="text-xs bg-red-100 text-red-700 px-1 rounded">
                              {discountInfo.percentage}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                        {discountInfo && (
                          <p className="text-xs text-gray-400 line-through">
                            Rs{" "}
                            {(
                              discountInfo.originalPrice * item.quantity
                            ).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal ({pricingInfo.itemCount} items)</span>
                  <span>
                    Rs {pricingInfo.originalSubtotal.toLocaleString()}
                  </span>
                </div>
                {pricingInfo.discountAmount > 0 && (
                  <div className="flex justify-between text-red-500 mb-2">
                    <span>Discounts Applied</span>
                    <span>
                      - Rs {pricingInfo.discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>Rs {getCartTotal().toLocaleString()}</span>
                </div>
                {pricingInfo.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium pt-2">
                    <span>You Saved</span>
                    <span>
                      Rs {pricingInfo.discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md transition duration-300 flex items-center justify-center disabled:bg-red-300"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    {paymentMethod === "easypaisa" ? "PAY NOW" : "PLACE ORDER"}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <FiCheckCircle className="text-green-500 mr-1" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default Checkout;