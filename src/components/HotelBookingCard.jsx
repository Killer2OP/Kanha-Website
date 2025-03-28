import { Hotel } from "lucide-react";
import { hotels, fourStarHotels, threeStarHotels } from "../container/main/home/IntroductionData";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HotelBooking = () => {

    const useSlideshow = (images) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);
            return () => clearInterval(interval);
        }, [images.length]);

        return currentIndex;
    };
    
    return (
        <div className="relative rounded-3xl overflow-hidden p-4 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
            <div className="flex items-center justify-center mb-6">
                <div className="bg-emerald-600 p-3 rounded-lg mr-3">
                    <Hotel className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-4xl sm:text-5xl font-semibold text-white drop-shadow-md">
                    Hotel Booking
                </h4>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed font-medium text-center mb-4">
                Experience the wild in style at Kanha National Park! From luxury
                resorts to budget stays, find your perfect getaway.
            </p>
            <p className="text-[24px] font-semibold text-emerald-300 mb-8">
                {" "}
                <span className="text-amber-400"> 5-Star </span> Luxury
                Accommodations
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {hotels.map((hotel) => {
                    const currentImageIndex = useSlideshow(hotel.images);

                    return (
                        <div
                            key={hotel.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                {hotel.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${hotel.name} - View ${index + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h5 className="text-xl font-bold text-white">
                                        {hotel.name}
                                    </h5>
                                </div>
                                {/* Image counter */}
                                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs text-white">
                                    {currentImageIndex + 1}/{hotel.images.length}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-300 text-sm mb-3">
                                    {hotel.description}
                                </p>
                                {/* Features - Modified to display in grid */}
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                    {hotel.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-gray-300 text-sm"
                                        >
                                            <span className="text-emerald-400 mr-2">
                                                {feature.icon}
                                            </span>
                                            {feature.text}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-emerald-300 font-semibold mt-2">
                                    {hotel.price}
                                </p>
                                <Link
                                    to="/hotel-in-kanha"
                                    className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3"
                                >
                                    View Options
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 4-Star Hotels Section */}
            <div className="mt-10">
                <p className="text-[24px] font-semibold text-emerald-300 mb-6">
                    {" "}
                    <span className="text-amber-400"> 4-Star </span> Comfortable Stays
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {fourStarHotels.map((hotel) => {
                        const currentImageIndex = useSlideshow(hotel.images);

                        return (
                            <div
                                key={hotel.id}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    {hotel.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${hotel.name} - View ${index + 1}`}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                        />
                                    ))}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">
                                            {hotel.name}
                                        </h5>
                                    </div>
                                    {/* Image counter */}
                                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs text-white">
                                        {currentImageIndex + 1}/{hotel.images.length}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">
                                        {hotel.description}
                                    </p>
                                    {/* Features - Modified to display in grid */}
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        {hotel.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-gray-300 text-sm"
                                            >
                                                <span className="text-emerald-400 mr-2">
                                                    {feature.icon}
                                                </span>
                                                {feature.text}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">
                                        {hotel.price}
                                    </p>
                                    <Link
                                        to="/hotel-in-kanha"
                                        className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3"
                                    >
                                        View Options
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 3-Star Hotels Section */}
            <div className="mt-10">
                <p className="text-[24px] font-semibold text-emerald-300 mb-6">
                    <span className="text-amber-400"> 3-Star </span> Budget-Friendly
                    Options
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {threeStarHotels.map((hotel) => {
                        const currentImageIndex = useSlideshow(hotel.images);

                        return (
                            <div
                                key={hotel.id}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    {hotel.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${hotel.name} - View ${index + 1}`}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                        />
                                    ))}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">
                                            {hotel.name}
                                        </h5>
                                    </div>
                                    {/* Image counter */}
                                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs text-white">
                                        {currentImageIndex + 1}/{hotel.images.length}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">
                                        {hotel.description}
                                    </p>
                                    {/* Features - Modified to display in grid */}
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        {hotel.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-gray-300 text-sm"
                                            >
                                                <span className="text-emerald-400 mr-2">
                                                    {feature.icon}
                                                </span>
                                                {feature.text}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">
                                        {hotel.price}
                                    </p>
                                    <Link
                                        to="/hotel-in-kanha"
                                        className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3"
                                    >
                                        View Options
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default HotelBooking