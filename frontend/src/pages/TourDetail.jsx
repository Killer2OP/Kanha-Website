import React, { useState } from 'react';
import { MapPin, Star, Coffee, Wifi, Tv, Bell } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from './SearchBar';
import TourPolicies from './TourPolicies';
import ResortCard from './ResortCard';

function App() {

    const resortData = [
        {
            id: 1,
            name: "Krishna Jungle Resort Kanha",
            stars: 4,
            location: "Chiraidongri - Kanha Rd, Mocha, Madhya Pradesh 481768",
            rating: 4.5,
            reviews: 100,
            finalReview: "Very Good",
            price: 13400,
            featured: true,
            breakfastIncluded: true,
            image: "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Safari.jpg",
            amenities: {
                tv: true,
                wifi: true,
                coffee: true,
                alarm: true,
                ac: true,
                gym: true,
                parking: true,
                security: true,
            }
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <div className="relative md:h-[100vh] lg:h-[65vh] p-5" >
                <Header />
                <SearchBar />
                <div className="h-ful md:pt-[410px] lg:pt-[350px] p-4 absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Kanha National Park</h1>
                        <p className="hidden md:block lg:block text-xl mb-8">Kanha National Park, one of Madhya Pradesh’s largest tiger reserves, spans 940 sq. km of core area and 1,071 sq. km of buffer zone in Mandla district. A visit offers a chance to explore India’s rich wildlife and lush green forests. The Jeep Safari Tour provides an up-close experience with majestic creatures, including white tigers. This tour is ideal for travelers with limited time who want to enjoy nature over a weekend.</p>
                    </div>
                </div>
            </div>

            <div className="w-19/20 mx-auto mt-3">

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Kanha Fun Tour with 1 Jeep Safari</h1>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">Kanha National Park, Madhya Pradesh</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        
                        {/* Resort Cards */}

                        {
                            [1,1,1,1].map( (_, index) => (
                                <ResortCard key={index} resort={resortData[0]}/>
                            ))

                        }

                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Package Highlights */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Package Highlights</h3>
                            <ul className="space-y-4">
                                {[
                                    { text: "1 Exciting Jeep Safari", desc: "Explore Kanha's wildlife with experienced guides" },
                                    { text: "Luxury Resort Stay", desc: "Comfortable rooms with modern amenities" },
                                    { text: "All Meals Included", desc: "Enjoy authentic local and continental cuisine" },
                                    { text: "Expert Naturalist Guide", desc: "Learn about flora and fauna from experts" }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <Star className="h-5 w-5 text-yellow-500 shrink-0 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-800">{item.text}</p>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Best Time to Visit */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Best Time to Visit</h3>
                            <div className="space-y-3 text-gray-700">
                                <p>The park is open from <span className="font-medium">October to June</span>.</p>
                                <p><span className="font-medium">March to May</span> offers the best wildlife sightings as animals gather around water sources.</p>
                                <p>The park remains closed during monsoon (July to September).</p>
                            </div>
                        </div>

                        {/* Need Help? */}
                        <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 mb-2">
                            <h3 className="text-lg font-bold mb-2 text-emerald-800">Need Help?</h3>
                            <p className="text-emerald-700 mb-4">Our travel experts are available 24/7 to assist you.</p>
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg w-full transition shadow-sm">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <TourPolicies/>

            <Footer />
        </div>
    );
}

export default App;