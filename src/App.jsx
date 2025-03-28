import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MapViewPage from './pages/MapView'
import OnlineSafariBooking from './pages/OnlineSafariBooking'
import Tours from './pages/Tours'
import Hotels from './pages/Hotels'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapViewPage />} />
        <Route path="/safari-booking" element={<OnlineSafariBooking />} />
        <Route path="/tour-packages" element={<Tours />} />
        <Route path="/hotel-in-kanha" element={<Hotels />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App