// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductListsProvider } from './context/ProductListsContext';
import { OrderProvider } from './context/OrderContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- ADDED: Import the Theme Provider

// Layout and Util Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './utils/ScrollToTop';

// Route Components
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Page Components
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './dashboard/AdminDashboard';
import PaymentStatus from './pages/PaymentStatus';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Orders from './components/profile/Orders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './components/profile/Wishlist';
import Compare from './components/profile/Compare';

// Layout for main pages (with Header and Footer)
const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

// Layout for auth pages (without Header and Footer)
const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
};

function App() {
    return (
        // ADDED: ThemeProvider wraps the entire application
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <CartProvider>
                        <ProductListsProvider>
                            <OrderProvider>
                                <ScrollToTop />
                                <ToastContainer
                                    position="top-right"
                                    autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    // You can make the toast theme-aware too if you like
                                    // theme="colored" 
                                />
                                <Routes>
                                    {/* Routes with Header and Footer */}
                                    <Route element={<MainLayout />}>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/product/:id" element={<ProductDetail />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        
                                        {/* Protected Routes inside Main Layout */}
                                        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                                        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                                        <Route path="/payment-status" element={<ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
                                        
                                        {/* Profile Routes */}
                                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
                                            <Route index element={<div>Account Overview</div>} />
                                            <Route path="orders" element={<Orders />} />
                                            <Route path="orders/:orderId" element={<OrderDetail />} />
                                            <Route path="wishlist" element={<Wishlist />} />
                                            <Route path="compare" element={<Compare />} />
                                        </Route>
                                    </Route>

                                    {/* Routes without Header and Footer */}
                                    <Route element={<AuthLayout />}>
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/register" element={<Register />} />
                                    </Route>

                                    {/* Not Found Route */}
                                    <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
                                </Routes>
                            </OrderProvider>
                        </ProductListsProvider>
                    </CartProvider>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;