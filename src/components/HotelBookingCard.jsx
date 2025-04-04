import { Hotel, Filter } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allHotels } from "../data/hotels.js";

// Create a separate HotelCard component to handle slideshow consistently
const HotelCard = ({ hotel, defaultStars }) => {
    const getHotelImages = (hotel) => {
        if (!hotel.images || hotel.images.length === 0) {
            return [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            ];
        }
        return hotel.images;
    };
    
    const images = getHotelImages(hotel);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    useEffect(() => {
        if (!images || images.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);
    
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${hotel.name} - View ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            index === currentImageIndex ? "opacity-100" : "opacity-0"
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
                    {currentImageIndex + 1}/{images.length}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-300 text-sm mb-4">
                    {hotel.description || `${defaultStars}-star accommodation with great amenities`}
                </p>
                
                {/* Amenities section - Redesigned to match image */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    {hotel.amenities && hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                            key={index}
                            className="flex items-center text-gray-300 text-sm"
                        >
                            <span className="text-emerald-400 mr-2">•</span>
                            {amenity}
                        </div>
                    ))}
                    {(!hotel.amenities || hotel.amenities.length === 0) && (
                        <>
                            <div className="flex items-center text-gray-300 text-sm">
                                <span className="text-emerald-400 mr-2">•</span>
                                Cancellation Policy
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <span className="text-emerald-400 mr-2">•</span>
                                Breakfast Included
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <span className="text-emerald-400 mr-2">•</span>
                                Free Wifi
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <span className="text-emerald-400 mr-2">•</span>
                                Swimming Pool
                            </div>
                        </>
                    )}
                </div>
                
                {/* Star rating */}
                <div className="flex items-center mb-2 mt-auto">
                    <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < (hotel.stars || defaultStars) ? "text-amber-400" : "text-gray-400"}>★</span>
                        ))}
                    </div>
                    <span className="text-gray-300 text-sm ml-2">({hotel.reviews || 0} reviews)</span>
                </div>
                
                {/* Price */}
                <p className="text-emerald-300 font-semibold mb-3">
                    {hotel.price || "Price on request"} {hotel.price ? "per night" : ""}
                </p>
                
                {/* View Options button */}
                <Link
                    to={`/hotel-in-kanha`}
                    className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300"
                >
                    View Options
                </Link>
            </div>
        </div>
    );
};

const HotelBooking = () => {
    // Add state for park filter
    const [selectedPark, setSelectedPark] = useState("Kanha National Park"); // Default to Kanha instead of All Parks
    
    const parks = [
        "Kanha National Park",
        "Bandhavgarh National Park",
        "Pench National Park"
    ];
    
    // Group hotels by star rating
    const getHotelsByStarRating = () => {
        // Filter hotels based on selected park
        const filteredHotels = allHotels.filter(hotel => {
            if (selectedPark === "Bandhavgarh National Park") {
                // More inclusive check for Bandhavgarh
                const isMatch = (
                    (hotel.location && hotel.location.toLowerCase().includes("bandhavgarh")) ||
                    (hotel.slug && hotel.slug.toLowerCase().includes("bandhavgarh")) ||
                    (hotel.name && hotel.name.toLowerCase().includes("bandhavgarh")) ||
                    (hotel.description && hotel.description.toLowerCase().includes("bandhavgarh")) ||
                    (hotel.address && hotel.address.toLowerCase().includes("bandhavgarh"))
                );
                
                if (isMatch) {
                    console.log("Matched Bandhavgarh hotel:", hotel.name);
                }
                
                return isMatch;
            } else if (selectedPark === "Pench National Park") {
                // More inclusive check for Pench
                return (
                    (hotel.location && hotel.location.toLowerCase().includes("pench")) ||
                    (hotel.slug && hotel.slug.toLowerCase().includes("pench")) ||
                    (hotel.name && hotel.name.toLowerCase().includes("pench")) ||
                    (hotel.description && hotel.description.toLowerCase().includes("pench")) ||
                    (hotel.address && hotel.address.toLowerCase().includes("pench"))
                );
            } else {
                // Default to Kanha
                return (
                    (hotel.location && hotel.location.toLowerCase().includes("kanha")) ||
                    (hotel.slug && hotel.slug.toLowerCase().includes("kanha")) ||
                    (hotel.name && hotel.name.toLowerCase().includes("kanha")) ||
                    (hotel.description && hotel.description.toLowerCase().includes("kanha")) ||
                    (hotel.address && hotel.address.toLowerCase().includes("kanha"))
                );
            }
        });
        
        // If no hotels found for the selected park, show all hotels
        if (filteredHotels.length === 0) {
            console.log("No hotels found for", selectedPark, "showing all hotels");
            return {
                fiveStarHotels: allHotels.filter(hotel => hotel.stars === 5),
                fourStarHotels: allHotels.filter(hotel => hotel.stars === 4),
                threeStarHotels: allHotels.filter(hotel => hotel.stars === 3 || hotel.stars < 3)
            };
        }
        
        console.log("Selected Park:", selectedPark);
        console.log("Filtered Hotels Count:", filteredHotels.length);
        
        // Group by star rating
        const fiveStarHotels = filteredHotels.filter(hotel => hotel.stars === 5);
        const fourStarHotels = filteredHotels.filter(hotel => hotel.stars === 4);
        const threeStarHotels = filteredHotels.filter(hotel => hotel.stars === 3 || hotel.stars < 3);
        
        return { fiveStarHotels, fourStarHotels, threeStarHotels };
    };
    
    const { fiveStarHotels, fourStarHotels, threeStarHotels } = getHotelsByStarRating();
    
    // Debug output to console
    useEffect(() => {
        console.log("All Hotels:", allHotels);
        console.log("Filtered Hotels:", { fiveStarHotels, fourStarHotels, threeStarHotels });
    }, [selectedPark, fiveStarHotels, fourStarHotels, threeStarHotels]);
    
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
                Experience the wild in style! From luxury resorts to budget stays, 
                find your perfect getaway at our national parks.
            </p>
            
            {/* Park Filter Section - Removed All Parks option */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center">
                    <Filter className="h-5 w-5 text-emerald-400 mr-2" />
                    <span className="text-white font-medium">Filter by Park:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {parks.map(park => (
                        <button 
                            key={park}
                            onClick={() => setSelectedPark(park)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                selectedPark === park 
                                    ? "bg-emerald-600 text-white" 
                                    : "bg-white/10 text-gray-200 hover:bg-white/20"
                            }`}
                        >
                            {park}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* 5-Star Hotels Section */}
            <p className="text-[24px] font-semibold text-emerald-300 mb-8">
                {" "}
                <span className="text-amber-400"> 5-Star </span> Luxury
                Accommodations
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {fiveStarHotels.length > 0 ? (
                    fiveStarHotels.slice(0, 3).map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} defaultStars={5} />
                    ))
                ) : (
                    <div className="col-span-3 text-center py-8 text-gray-300">
                        No luxury accommodations found for {selectedPark}
                    </div>
                )}
            </div>

            {/* 4-Star Hotels Section */}
            <div className="mt-10">
                <p className="text-[24px] font-semibold text-emerald-300 mb-6">
                    {" "}
                    <span className="text-amber-400"> 4-Star </span> Comfortable Stays
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {fourStarHotels.length > 0 ? (
                        fourStarHotels.slice(0, 3).map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} defaultStars={4} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-8 text-gray-300">
                            No 4-star accommodations found for {selectedPark}
                        </div>
                    )}
                </div>
            </div>

            {/* 3-Star Hotels Section */}
            <div className="mt-10">
                <p className="text-[24px] font-semibold text-emerald-300 mb-6">
                    <span className="text-amber-400"> 3-Star </span> Budget-Friendly
                    Options
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {threeStarHotels.length > 0 ? (
                        threeStarHotels.slice(0, 3).map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} defaultStars={3} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-8 text-gray-300">
                            No budget-friendly options found for {selectedPark}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelBooking;
