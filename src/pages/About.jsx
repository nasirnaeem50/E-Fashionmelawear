import React from 'react';
import PageTransition from '../components/shared/PageTransition';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGem, FaHeart, FaTshirt } from 'react-icons/fa';

// A reusable card component for our core values
const FeatureCard = ({ icon, title, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
    className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="flex justify-center mb-4">
      <div className="bg-red-100 p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </motion.div>
);

const About = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white text-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1598895698885-cce7d115e81e?q=80&w=1973&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 p-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold" style={{textShadow: '0 2px 5px rgba(0,0,0,0.5)'}}>
            About Fashion Mela
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            Weaving the Threads of Pakistani Heritage into Modern Wardrobes
          </p>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-gray-700"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded in 2025, Fashion Mela was born from a desire to bring the vibrant, intricate, and timeless beauty of Pakistani attire to a global audience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We started as a small boutique in Peshawar, passionate about preserving traditional craftsmanship while embracing contemporary styles. Today, we are a leading online destination for authentic Pakistani fashion, offering a curated collection that celebrates our rich cultural heritage.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* --- THIS IS THE ADDED IMAGE FOR "OUR STORY" --- */}
              <img 
                src="/images/banner.avif" 
                alt="Intricate fabric and artisanal fashion work" 
                className="rounded-lg shadow-2xl object-cover w-full h-full" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          >
            What We Stand For
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaTshirt className="w-10 h-10 text-red-600"/>}
              title="Authentic Craftsmanship"
              text="We partner with local artisans to bring you genuine, handcrafted pieces that tell a story of tradition and skill."
              delay={0.1}
            />
            <FeatureCard 
              icon={<FaGem className="w-10 h-10 text-red-600"/>}
              title="Uncompromising Quality"
              text="From the finest fabrics to the most intricate details, every item in our collection is vetted for superior quality."
              delay={0.2}
            />
            <FeatureCard 
              icon={<FaHeart className="w-10 h-10 text-red-600"/>}
              title="Customer Delight"
              text="Your satisfaction is our priority. We are dedicated to providing exceptional service and a seamless shopping experience."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* Meet The Team Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Ayesha Khan', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
              { name: 'Bilal Ahmed', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
              { name: 'Fatima Ali', role: 'Marketing Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' },
              { name: 'Usman Sharif', role: 'Operations Manager', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop' },
            ].map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full shadow-md object-cover mb-4" />
                <h4 className="font-bold text-gray-800">{member.name}</h4>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Discover Our Collection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-xl mx-auto"
          >
            Ready to experience the beauty of Pakistani fashion? Explore our latest arrivals and find your perfect outfit today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/shop" className="bg-white text-red-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;