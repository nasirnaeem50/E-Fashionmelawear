// src/pages/Contact.jsx
import React from 'react';
import PageTransition from '../components/shared/PageTransition';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
    return (
        <PageTransition>
            <div className="bg-gray-100">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                         <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                         <p className="text-lg text-gray-600 mt-2">We'd love to hear from you. Get in touch with us.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300" />
                                <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300" />
                                <input type="text" placeholder="Subject" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300" />
                                <textarea placeholder="Your Message" rows="5" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"></textarea>
                                <button type="submit" className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition duration-300">SEND MESSAGE</button>
                            </form>
                        </div>
                        {/* Contact Info */}
                        <div className="space-y-6">
                             <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                             <div className="flex items-start gap-4">
                                <FiMapPin className="text-red-500 mt-1" size={24}/>
                                <div>
                                    <h3 className="font-semibold text-lg">Our Address</h3>
                                    <p className="text-gray-600">KP IT Park, Training Centre Board<br/>Bazar Peshawar, Pakistan</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <FiPhone className="text-red-500 mt-1" size={24}/>
                                <div>
                                    <h3 className="font-semibold text-lg">Call Us</h3>
                                    <p className="text-gray-600">0341 9169022 (24/7 Support)</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                <FiMail className="text-red-500 mt-1" size={24}/>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    <p className="text-gray-600">info@fashionmelawear.com</p>
                                </div>
                             </div>
                             <div className="mt-6">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.747971033069!2d71.56840561521366!3d34.00223798062086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91737e2be1a3b%3A0x6a2d216f2d2b5e2d!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1678886543210!5m2!1sen!2s" 
                                    width="100%" 
                                    height="200" 
                                    style={{border:0}} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-md"
                                ></iframe>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;