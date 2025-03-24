import React from 'react'

import Hero from '../container/main/home/Hero'
import Introduction from '../container/main/home/Introduction'
import TopThings from '../container/main/home/TopThings'
import Footer from '../components/Footer'


function home() {
  return (
  <>
  <Hero/>
  <Introduction/>
  <TopThings/>
  {/* <Footer/> */}
  </>
  )
}

export default home