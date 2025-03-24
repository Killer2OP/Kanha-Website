import React from 'react';
import { Camera, ChevronRight, Compass, Hotel, Moon, Sunrise } from "lucide-react"
import { Link } from 'react-router-dom'; // Add this import for React Router


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
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 2,
            name: "Eco-Lodges",
            description: "Sustainable stays blending with nature. Environmentally friendly accommodations with authentic local experiences.",
            price: "From ₹8,000 per night",
            image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            id: 3,
            name: "Forest Rest Houses",
            description: "Authentic, close-to-nature experience. Historic accommodations within the forest for the true wilderness experience.",
            price: "From ₹5,000 per night",
            image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (

        <div
            className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-fixed bg-no-repeat bg-cover"
            style={{
                backgroundImage: "url('https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/4f/7f/89/aa/89/v1_E10/E108KNPH.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=daec7800c365e0b1de71accbe90650a1391881360fdeb1c357d00db906e0ec6d')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 lg:p-12 backdrop-blur-3xl bg-green-900/40 border border-white/10 shadow-xl">

                    {/* Content Container */}
                    {/* Text Content */}
                    <div className="space-y-8">
                        <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
                            Welcome to Kanha National Park
                        </h3>

                        <div className="space-y-6">
                            <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                Nestled in the enchanting landscapes of Madhya Pradesh, <span className="text-emerald-300">Kanha National Park</span>—also known as Kanha-Kisli—is India’s premier tiger reserve. Spanning Mandla and Balaghat districts, it features two sanctuaries, Hallon (250 sq km) and Banjar (300 sq km), established as a national park in 1955 and a tiger reserve in 1973. Covering 940 sq km today, Kanha is renowned for its thriving Barasingha population and frequent tiger sightings.
                            </p>
                            <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                Crowned as one of India’s best-managed parks, Kanha is a jewel of <span className="text-emerald-300">Project Tiger</span>. Visit Bamni Dadar—Sunset Point—for breathtaking views of grazing Sambhars and Gaurs against a stunning sunset. With over 1,000 flowering plant species, diverse forests of sal, bamboo, and meadows, Kanha promises an unforgettable wildlife adventure.
                            </p>
                        </div>

                        {/* Tour Packages */}
                        <div className="relative">
                            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full"></div>
                            <div className="pl-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-emerald-600 p-2 rounded-lg mr-4">
                                        <Compass className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-md">Tour Packages</h4>
                                </div>
                                <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                    Discover Kanha with our affordable, customizable tour packages—ranging from budget weekend escapes
                                    to luxurious week-long adventures. Enjoy accommodation, safari bookings, meals, and
                                    transportation, with special options for photographers and families.
                                </p>

                                {/* Package Cards */}
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                    {
                                        packages.map((pkg, index) => (
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
                                                <Link
                                                    href="#"
                                                    className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 group-hover:bg-emerald-500"
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Safari Booking */}
                        <div className="relative">
                            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full"></div>
                            <div className="pl-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-emerald-600 p-2 rounded-lg mr-4">
                                        <Camera className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-md">Safari Booking</h4>
                                </div>
                                <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                    Embark on an exhilarating jeep safari across Kanha's zones—Kanha, Kisli, Mukki, and Sarhi. Morning
                                    safaris offer prime wildlife sightings, guided by expert naturalists. Book online easily, with
                                    Indian nationals advised to reserve 30 days ahead and foreign nationals 90 days in advance.
                                </p>

                                {/* Safari Timings */}
                                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                                        <div className="flex items-center mb-4">
                                            <Sunrise className="h-6 w-6 text-amber-400 mr-3" />
                                            <h5 className="text-xl font-bold text-white">Morning Safari</h5>
                                        </div>
                                        <p className="text-gray-300 mb-3">Best for wildlife activity and photography</p>
                                        <p className="text-amber-300 font-semibold">5:30 AM - 11:00 AM</p>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-gray-300 text-sm">₹2,500 per person (Indian Nationals)</p>
                                            <p className="text-gray-300 text-sm">₹5,000 per person (Foreign Nationals)</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                                        <div className="flex items-center mb-4">
                                            <Moon className="h-6 w-6 text-indigo-400 mr-3" />
                                            <h5 className="text-xl font-bold text-white">Evening Safari</h5>
                                        </div>
                                        <p className="text-gray-300 mb-3">Perfect for sunset views and predator sightings</p>
                                        <p className="text-indigo-300 font-semibold">3:00 PM - 6:30 PM</p>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-gray-300 text-sm">₹2,000 per person (Indian Nationals)</p>
                                            <p className="text-gray-300 text-sm">₹4,000 per person (Foreign Nationals)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hotel Booking */}
                        <div className="relative">
                            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full"></div>
                            <div className="pl-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-emerald-600 p-2 rounded-lg mr-4">
                                        <Hotel className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-md">Hotel Booking</h4>
                                </div>
                                <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                    From luxury resorts with spas to eco-friendly lodges and forest rest houses, Kanha offers diverse stays. Enjoy wildlife-themed décor, local cuisine, and campfire nights. Book early for peak season (October-March).
                                </p>
                                <div className="grid md:grid-cols-3 gap-6 mt-8">
                                    {
                                        hotels.map( (hotel) => (
                                            <div key={hotel.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                                    <div className="absolute bottom-0 left-0 p-4">
                                                        <h5 className="text-xl font-bold text-white">{hotel.name}</h5>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-gray-300 text-sm">{hotel.description}</p>
                                                    <p className="text-emerald-300 font-semibold mt-3">{hotel.price}</p>
                                                    <Link href="#" className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 mt-4">
                                                        View Options
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;