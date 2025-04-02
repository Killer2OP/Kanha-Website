import { useState, useMemo } from "react";
import {
    Tv2, Wifi, Coffee, AlarmClockCheck, MapPin, Star,
    CheckCircle, UtensilsCrossed, Snowflake, Dumbbell,
    ParkingSquare, ShieldCheck
} from "lucide-react";

const iconMap = {
    tv: { icon: Tv2, label: "Flat TV" },
    wifi: { icon: Wifi, label: "Free WiFi" },
    coffee: { icon: Coffee, label: "Coffee and Tea" },
    alarm: { icon: AlarmClockCheck, label: "Wake-up Call" },
    ac: { icon: Snowflake, label: "Air Conditioning" },
    gym: { icon: Dumbbell, label: "Gym" },
    parking: { icon: ParkingSquare, label: "Free Parking" },
    security: { icon: ShieldCheck, label: "24/7 Security" },
};

const ResortCard = ({ resort }) => {
    const [showAll, setShowAll] = useState(false);
    const amenitiesKeys = useMemo(() => 
        Object.keys(iconMap).filter(key => resort.amenities?.[key]), 
        [resort.amenities]
    );

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full border mb-6">
            {/* Left Side - Image Section */}
            <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                <img src={resort.image ?? "/default-image.jpg"} alt={resort.name ?? "Resort"} className="w-full h-full object-cover" />
                {resort.featured && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                    </div>
                )}
            </div>
            
            {/* Right Side - Details Section */}
            <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-1">
                        {resort.name} 
                        <span className="text-yellow-500 flex items-center">
                            {new Array(resort.stars || 0).fill(0).map((_, i) => (
                                <Star key={i} size={14} fill="currentColor" stroke="none" />
                            ))}
                        </span>
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm flex items-center mt-1">
                        <MapPin size={12} className="mr-1" /> {resort.location}
                    </p>
                    {resort.breakfastIncluded && (
                        <p className="text-green-600 text-xs md:text-sm font-medium mt-2 flex items-center">
                            <UtensilsCrossed size={12} className="mr-1" /> Breakfast Included
                        </p>
                    )}
                    
                    {/* Facilities */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-2 text-gray-600 text-xs">
                        {amenitiesKeys.slice(0, showAll ? amenitiesKeys.length : 3).map(key => {
                            const IconComponent = iconMap[key].icon;
                            return (
                                <div key={key} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                                    <IconComponent size={14} /> {iconMap[key].label}
                                </div>
                            );
                        })}
                        {amenitiesKeys.length > 3 && (
                            <button 
                                onClick={() => setShowAll(prev => !prev)}
                                className="bg-gray-200 px-2 py-1 rounded text-gray-700 cursor-pointer"
                            >
                                {showAll ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Pricing and Booking */}
                <div className="flex md:flex-row items-center justify-between mt-4 border-t pt-3 text-center md:text-left">
                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                        <p className="text-gray-600 text-xs md:text-sm">{resort.finalReview}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs md:text-sm font-medium">
                                {resort.rating}
                            </div>
                            <span className="text-xs text-gray-600">({resort.reviews} reviews)</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 mb-2 md:mb-0">
                        <p className="text-lg md:text-2xl font-bold text-blue-700">₹{resort.price}</p>
                        <p className="text-xs text-gray-600">+ ₹0 taxes & fees</p>
                    </div>
                    <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium shadow-sm">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResortCard;