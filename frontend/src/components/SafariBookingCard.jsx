import React from 'react'
import { Camera} from "lucide-react";

import SafariBooking from "../container/main/home/SafariBooking";
export const SafariBookingCard = () => {
    return (
        <div className="relative rounded-3xl overflow-hidden h-[200vh]  md:h-full pt-3 p-3 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 justify-center text-center sm:text-left">
                <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg mb-2 sm:mb-0 sm:mr-4">
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
                    Safari Booking
                </h4>
            </div>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium mb-4 sm:mb-8 text-center max-w-5xl mx-auto">
                Embark on an exhilarating jeep safari across Kanha, Bandhavgarh, and Pench National Parks. 
                Each park offers unique wildlife experiences with expert naturalists as your guides. 
                Morning safaris provide prime wildlife sightings. Book online easily, with 
                Indian nationals advised to reserve 30 days ahead and foreign 
                nationals 90 days in advance.
            </p>

            {/* Safari Booking Calendar */}
            <SafariBooking />
        </div>
    )
}
