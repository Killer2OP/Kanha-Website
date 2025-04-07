import React from 'react'

import Hero from '../container/main/home/Hero'
import Introduction from '../container/main/home/Introduction'
import TopThings from '../container/main/home/TopThings'
import GeoDetails from '../container/main/home/GeoDetails'
import Footer from '../components/Footer'
import History from '../container/main/home/History'


function home() {
    return (
        <>
            <Hero />
            <Introduction />
            <TopThings />
            <History />
            <GeoDetails />
            <Footer />
        </>
    )
}

export default home;
