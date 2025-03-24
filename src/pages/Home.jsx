import React from 'react'

import Hero from '../container/main/home/Hero'
import Introduction from '../container/main/home/Introduction'
import Footer from '../components/Footer'


function home() {
    return (
        <>
            <Hero />
            <Introduction />
            <Footer/>
        </>
    )
}

export default home