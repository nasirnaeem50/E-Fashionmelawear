// src/pages/Home.jsx
import React from 'react';
import PageTransition from '../components/shared/PageTransition';
import Hero from '../components/home/Hero';
import NewCollections from '../components/home/NewCollections';
import ShopByCategories from '../components/home/ShopByCategories';
import SpecialOfferBanner from '../components/home/SpecialOfferBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Brands from '../components/home/Brands';
import DownloadApp from '../components/home/DownloadApp';
import Reviews from '../components/home/Reviews';

const Home = () => {
    return (
        <PageTransition>
            <Hero />
            <NewCollections />
            <ShopByCategories />
            <SpecialOfferBanner />
            <FeaturedProducts />
            <Brands />
            <DownloadApp />
            <Reviews />
        </PageTransition>
    );
};

export default Home;