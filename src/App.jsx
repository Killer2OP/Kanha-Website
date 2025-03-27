import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MapViewPage from './pages/MapView'
import OnlineSafariBooking from './pages/OnlineSafariBooking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapViewPage />} />
        <Route path="/safari-booking" element={<OnlineSafariBooking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App