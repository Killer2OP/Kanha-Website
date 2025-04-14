import React, { Suspense, lazy } from "react";
import IntroductionCard from "../../../components/IntroductionCard";
import HotelBooking from "../../../components/HotelBookingCard";
import SafariBookingCard from "../../../components/SafariBookingCard";
import TourPackagesCard from "../../../components/TourPackagesCard";
import ServicesSection from "../../../components/ServicesSection";

function App() {
  const backgroundImage =
    "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Plants.jpg";

  return (
    <div
      className="min-h-screen py-12 mx-auto px-2 sm:px-4 relative bg-fixed bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Introduction Card */}
        <Suspense
          fallback={<div className="text-white">Loading Introduction...</div>}
        >
          <IntroductionCard />
        </Suspense>

        {/* Hotel Booking Card */}
        <Suspense
          fallback={<div className="text-white">Loading Hotel Booking...</div>}
        >
          <HotelBooking />
        </Suspense>

        {/* Safari Booking Card */}
        <Suspense
          fallback={<div className="text-white">Loading Safari Booking...</div>}
        >
          <SafariBookingCard />
        </Suspense>

        {/* Services Section */}
        <Suspense
          fallback={<div className="text-white">Loading Services...</div>}
        >
          <ServicesSection />
        </Suspense>

        {/* Tour Packages Card */}
        <Suspense
          fallback={<div className="text-white">Loading Tour Packages...</div>}
        >
          <TourPackagesCard />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
