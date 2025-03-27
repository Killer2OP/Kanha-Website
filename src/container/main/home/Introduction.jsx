import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, Compass, Hotel, Moon, Sunrise, Wifi, Coffee, Car, Bath, Utensils } from "lucide-react"
import { Link as RouterLink } from 'react-router-dom';
import SafariBooking from '../home/SafariBooking'

function App() {
    const packages = [
        {
            title: "Weekend Escape",
            price: "₹12,999",
            features: ["2 Nights Stay", "3 Safari Rides", "All Meals", "Transport"],
        },
        {
            title: "Photography Special",
            price: "₹24,999",
            features: ["4 Nights Stay", "6 Safari Rides", "Photography Guide", "All Inclusive"],
        },
        {
            title: "Luxury Experience",
            price: "₹39,999",
            features: ["5 Nights Luxury Stay", "Private Safaris", "Spa Treatment", "Gourmet Dining"],
        },
    ];

    const hotels = [
        {
            id: 1,
            name: "Luxury Resorts",
            description: "Premium comfort with pools and gourmet dining. Experience the wild in style with spacious rooms and modern amenities.",
            price: "From ₹12,000 per night",
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            ],
            features: [
                { icon: <Wifi className="h-4 w-4" />, text: "High-speed WiFi" },
                { icon: <Coffee className="h-4 w-4" />, text: "24/7 Room Service" },
                { icon: <Car className="h-4 w-4" />, text: "Airport Transfer" },
                { icon: <Bath className="h-4 w-4" />, text: "Luxury Spa" },
                { icon: <Utensils className="h-4 w-4" />, text: "Fine Dining" }
            ]
        },
        {
            id: 2,
            name: "Eco-Lodges",
            description: "Sustainable stays blending with nature. Environmentally friendly accommodations with authentic local experiences.",
            price: "From ₹8,000 per night",
            images: [
                "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            ],
            features: [
                { icon: <Wifi className="h-4 w-4" />, text: "Free WiFi" },
                { icon: <Coffee className="h-4 w-4" />, text: "Organic Breakfast" },
                { icon: <Car className="h-4 w-4" />, text: "Safari Transport" },
                { icon: <Bath className="h-4 w-4" />, text: "Private Bath" },
                { icon: <Utensils className="h-4 w-4" />, text: "Local Cuisine" }
            ]
        },
        {
            id: 3,
            name: "Forest Rest Houses",
            description: "Authentic, close-to-nature experience. Historic accommodations within the forest for the true wilderness experience.",
            price: "From ₹5,000 per night",
            images: [
                "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            ],
            features: [
                { icon: <Wifi className="h-4 w-4" />, text: "Basic WiFi" },
                { icon: <Coffee className="h-4 w-4" />, text: "Tea Service" },
                { icon: <Car className="h-4 w-4" />, text: "Forest Guide" },
                { icon: <Bath className="h-4 w-4" />, text: "Attached Bath" },
                { icon: <Utensils className="h-4 w-4" />, text: "Home-style Meals" }
            ]
        }
    ];

    // Custom hook for managing slideshows
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
        <div
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-fixed bg-no-repeat bg-cover"
            style={{
                backgroundImage: "url('../assets/Plants.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                {/* Introduction Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
                    <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
                        Welcome to Kanha National Park
                    </h3>

                    <div className="space-y-6">
                        <p className="text-gray-200 text-lg leading-relaxed font-medium">
                            Nestled in the enchanting landscapes of Madhya Pradesh, <span className="text-emerald-300">Kanha National Park</span>—also known as Kanha-Kisli—is India's premier tiger reserve. Spanning Mandla and Balaghat districts, it features two sanctuaries, Hallon (250 sq km) and Banjar (300 sq km), established as a national park in 1955 and a tiger reserve in 1973. Covering 940 sq km today, Kanha is renowned for its thriving Barasingha population and frequent tiger sightings.
                        </p>
                        <p className="text-gray-200 text-lg leading-relaxed font-medium">
                            Crowned as one of India's best-managed parks, Kanha is a jewel of <span className="text-emerald-300">Project Tiger</span>. Visit Bamni Dadar—Sunset Point—for breathtaking views of grazing Sambhars and Gaurs against a stunning sunset. With over 1,000 flowering plant species, diverse forests of sal, bamboo, and meadows, Kanha promises an unforgettable wildlife adventure.
                        </p>
                    </div>
                </div>

                {/* Hotel Booking Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-emerald-600 p-3 rounded-lg mr-3">
                            <Hotel className="h-6 w-6 text-white" />
                        </div>
                            <h4 className="text-4xl sm:text-5xl font-semibold text-white drop-shadow-md">Hotel Booking</h4>
                    </div>
                    <p className="text-gray-200 text-lg leading-relaxed font-medium text-center mb-4">
                    Experience the wild in style at Kanha National Park! From luxury resorts to budget stays, find your perfect getaway.
                    </p>
                    <p className="text-[24px] font-semibold text-emerald-300 mb-8"> <span className='text-amber-400'> 5-Star </span> Luxury Accommodations</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {hotels.map((hotel) => {
                            const currentImageIndex = useSlideshow(hotel.images);
                            
                            return (
                                <div key={hotel.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        {hotel.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${hotel.name} - View ${index + 1}`}
                                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                                                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            />
                                        ))}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-4">
                                            <h5 className="text-xl font-bold text-white">{hotel.name}</h5>
                                        </div>
                                        {/* Image counter */}
                                        <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs text-white">
                                            {currentImageIndex + 1}/{hotel.images.length}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-300 text-sm mb-3">{hotel.description}</p>
                                        {/* Features - Modified to display in grid */}
                                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                            {hotel.features.map((feature, index) => (
                                                <div key={index} className="flex items-center text-gray-300 text-sm">
                                                    <span className="text-emerald-400 mr-2">{feature.icon}</span>
                                                    {feature.text}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-emerald-300 font-semibold mt-2">{hotel.price}</p>
                                        <RouterLink to={`/hotels/${hotel.id}`} className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                            View Options
                                        </RouterLink>
                                    </div>
                                </div>
                            );
                        })}                 
                    </div>
                    
                    {/* 4-Star Hotels Section */}
                    <div className="mt-10">
                        <p className="text-[24px] font-semibold text-emerald-300 mb-6"> <span className='text-amber-400'> 4-Star </span> Comfortable Stays</p>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Jungle Lodge" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Jungle Lodge</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">Comfortable rooms with jungle views, guided nature walks, and authentic regional cuisine.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            Free WiFi
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Buffet Meals
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Safari Booking
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Utensils className="h-4 w-4" /></span>
                                            Outdoor Dining
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹7,500 per night</p>
                                    <RouterLink to="/hotels/4" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Safari Lodge" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Safari Lodge</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">Spacious cottages with private balconies, swimming pool, and evening cultural programs.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            WiFi Zones
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Room Service
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Bath className="h-4 w-4" /></span>
                                            Swimming Pool
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Safari Transport
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹6,800 per night</p>
                                    <RouterLink to="/hotels/5" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Riverside Resort" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Riverside Resort</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">Riverside location with scenic views, comfortable rooms, and outdoor dining experiences.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            Limited WiFi
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Utensils className="h-4 w-4" /></span>
                                            Riverside Dining
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Safari Booking
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Breakfast Included
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹6,500 per night</p>
                                    <RouterLink to="/hotels/6" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 3-Star Hotels Section */}
                    <div className="mt-10">
                        <p className="text-[24px] font-semibold text-emerald-300 mb-6"><span className='text-amber-400'> 3-Star </span> Budget-Friendly Options</p>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Forest Lodge" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Forest Lodge</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">Simple, clean accommodations with basic amenities and helpful staff for safari arrangements.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            Common Area WiFi
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Breakfast
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Safari Assistance
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Utensils className="h-4 w-4" /></span>
                                            Basic Dining
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹3,500 per night</p>
                                    <RouterLink to="/hotels/7" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Safari Inn" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Safari Inn</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">Budget-friendly option with comfortable beds, clean rooms, and safari booking assistance.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            Limited WiFi
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Tea/Coffee
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Safari Booking
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Bath className="h-4 w-4" /></span>
                                            Private Bathroom
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹2,800 per night</p>
                                    <RouterLink to="/hotels/8" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                                        alt="Kanha Budget Stay" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h5 className="text-xl font-bold text-white">Kanha Budget Stay</h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-300 text-sm mb-3">No-frills accommodation with essential amenities and friendly service at an affordable price.</p>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-3">
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Wifi className="h-4 w-4" /></span>
                                            Basic WiFi
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Coffee className="h-4 w-4" /></span>
                                            Simple Breakfast
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Car className="h-4 w-4" /></span>
                                            Transport Assistance
                                        </div>
                                        <div className="flex items-center text-gray-300 text-sm">
                                            <span className="text-emerald-400 mr-2"><Utensils className="h-4 w-4" /></span>
                                            Local Food
                                        </div>
                                    </div>
                                    <p className="text-emerald-300 font-semibold mt-2">From ₹2,000 per night</p>
                                    <RouterLink to="/hotels/9" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-3">
                                        View Options
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safari Booking Card */}
                <div className="relative rounded-3xl overflow-hidden pt-4 p-4 sm:p-5 lg:p-6 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
                    <div className="flex items-center mb-6 justify-center">
                        <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                            <Camera className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">Safari Booking</h4>
                    </div>

                    <p className="text-gray-200 text-lg leading-relaxed font-medium mb-8">
                        Embark on an exhilarating jeep safari across Kanha's zones—Kanha, Kisli, Mukki, and Sarhi. Morning
                        safaris offer prime wildlife sightings, guided by expert naturalists. Book online easily, with
                        Indian nationals advised to reserve 30 days ahead and foreign nationals 90 days in advance.
                    </p>
                    
                    {/* Safari Booking Calendar */}
                        <SafariBooking/>
                </div>

                {/* Tour Packages Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
                    <div className="flex items-center mb-6 justify-center">
                        <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                            <Compass className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-3xl sm:text-4xl font-semibold text-white drop-shadow-md">Tour Packages</h4>
                    </div>

                    <p className="text-gray-200 text-lg leading-relaxed font-medium mb-8">
                        Discover Kanha with our affordable, customizable tour packages—ranging from budget weekend escapes
                        to luxurious week-long adventures. Enjoy accommodation, safari bookings, meals, and
                        transportation, with special options for photographers and families.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 group"
                            >
                                <h5 className="text-xl font-bold text-white mb-2">{pkg.title}</h5>
                                <p className="text-emerald-300 text-2xl font-bold mb-4">{pkg.price}</p>
                                <ul className="space-y-2 mb-6">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-gray-300">
                                            <ChevronRight className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <RouterLink
                                    to="/book"
                                    className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 group-hover:bg-emerald-500"
                                >
                                    Book Now
                                </RouterLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
