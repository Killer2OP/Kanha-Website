import React from 'react';
import { ChevronRight, Compass, Clock, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import tourPackages from "../data/tourPackages";

const TourPackagesCard = () => {
    // Get 1 featured package from each park
    const featuredPackages = React.useMemo(() => {
        const parks = ["Kanha", "Bandhavgarh", "Pench"];
        const featured = [];
        
        parks.forEach(park => {
            const parkPackage = tourPackages
                .find(pkg => pkg.park === park || pkg.title.includes(park));
            if (parkPackage) {
                featured.push(parkPackage);
            }
        });
        
        return featured;
    }, []);

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

            <p className="text-gray-200 text-lg leading-relaxed font-medium mb-8 text-center max-w-4xl mx-auto">
                Discover the wilderness with our customizable tour packages across Kanha, Bandhavgarh, and Pench National Parks. 
                Each package includes accommodation, safari bookings, meals, and transportation.
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPackages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 group"
                    >
                        <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-emerald-400 mr-2" />
                            <span className="text-emerald-300 font-medium">{pkg.park || pkg.title.split(" ")[0]}</span>
                        </div>
                        
                        <h5 className="text-xl font-bold text-white mb-1">
                            {pkg.title}
                        </h5>
                        
                        <div className="flex items-center mb-3">
                            <Clock className="h-4 w-4 text-emerald-400 mr-2" />
                            <span className="text-gray-300 text-sm">{pkg.duration}</span>
                        </div>
                        
                        <p className="text-emerald-300 text-2xl font-bold mb-3">
                            {pkg.price}
                            <span className="text-sm text-emerald-200 font-normal ml-2">{pkg.safaris}</span>
                        </p>
                        
                        <ul className="space-y-2 mb-6">
                            {pkg.features.slice(0, 3).map((feature, i) => (
                                <li key={i} className="flex items-start text-gray-300">
                                    <ChevronRight className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-1" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <Link
                            to={`/tour/${pkg.id}`}
                            className="block text-center py-2 px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 group-hover:bg-emerald-500 font-medium"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
                <Link 
                    to="/tour-packages" 
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300"
                >
                    View All Packages
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </div>
    );
};

export default TourPackagesCard;