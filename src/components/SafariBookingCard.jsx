import React from 'react'
import { Camera} from "lucide-react";

import SafariBooking from "../container/main/home/SafariBooking";
export const SafariBookingCard = () => {
    return (
        <div className="relative rounded-3xl overflow-hidden pt-4 p-4 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
            <div className="flex items-center mb-6 justify-center">
                <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                    <Camera className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">
                    Safari Booking
                </h4>
            </div>

            <p className="text-gray-200 text-lg leading-relaxed font-medium mb-8">
                Embark on an exhilarating jeep safari across Kanha's zones—Kanha,
                Kisli, Mukki, and Sarhi. Morning safaris offer prime wildlife
                sightings, guided by expert naturalists. Book online easily, with
                Indian nationals advised to reserve 30 days ahead and foreign
                nationals 90 days in advance.
            </p>

            {/* Safari Booking Calendar */}
            <SafariBooking />
        </div>

    )
}
