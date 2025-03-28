import React from "react";

import IntroductionCard from "../../../components/IntroductionCard";
import HotelBooking from "../../../components/HotelBookingCard";
import { SafariBookingCard } from "../../../components/SafariBookingCard";
import { TourPackages } from "../../../components/TourPackagesCard";

function App() {

    return (
        <div
            className="min-h-screen py-12 mx-auto px-2 sm:px-4 relative bg-fixed bg-no-repeat bg-cover"
            style={{
                backgroundImage:
                    "url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Plants.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* Introduction Card */}
                <IntroductionCard/>
                
                {/* Hotel Booking Card */}
                <HotelBooking/>

                {/* Safari Booking Card */}
                <SafariBookingCard/>

                {/* Tour Packages Card */}
                <TourPackages/>
            </div>
        </div>
    );
}
export default App;
