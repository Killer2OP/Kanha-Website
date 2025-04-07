import React from 'react'
import {ChevronRight, Compass} from "lucide-react";
import { Link } from "react-router-dom";
import {packages} from "../container/main/home/IntroductionData";

export const TourPackages = () => {
    return (
        <div className="relative rounded-3xl overflow-hidden p-4 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
            <div className="flex items-center mb-6 justify-center">
                <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                    <Compass className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">
                    Tour Packages
                </h4>
            </div>

            <p className="text-gray-200 text-lg leading-relaxed font-medium mb-8">
                Discover Kanha with our affordable, customizable tour
                packages—ranging from budget weekend escapes to luxurious week-long
                adventures. Enjoy accommodation, safari bookings, meals, and
                transportation, with special options for photographers and families.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 group"
                    >
                        <h5 className="text-xl font-bold text-white mb-2">
                            {pkg.title}
                        </h5>
                        <p className="text-emerald-300 text-2xl font-bold mb-4">
                            {pkg.price}
                        </p>
                        <ul className="space-y-2 mb-6">
                            {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <ChevronRight className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/tour-packages"
                            className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 group-hover:bg-emerald-500"
                        >
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}