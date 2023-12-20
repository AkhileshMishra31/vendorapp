import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero.js'
import Categories from '../components/Route/Categories/Categories.js'
import BestDeals from '../components/Route/BestDeals/BestDeals.js'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct.js'
import Events from '../components/Route/Events/Events.js'
import Sponsered from '../components/Route/Sponsered/Sponsered.js';
import Footer from '../components/Route/Footer/Footer.js'

const HomePage = () => {
    return (
        <>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <Events/>
            <FeaturedProduct />
            <Sponsered/>
            <Footer/>
        </>
    )
}

export default HomePage