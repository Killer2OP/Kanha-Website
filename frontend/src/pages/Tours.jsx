import React, { useEffect, useState } from "react";
import { Compass, ChevronRight, MapPin, Calendar, Car } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import tourPackages from "../data/tourPackages";

function Tours() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Kanha"); // Add this line
  const [filteredPackages, setFilteredPackages] = useState([]); // Add this line

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Filter packages based on active tab
    const filtered = tourPackages.filter(pkg => pkg.park === activeTab);
    setFilteredPackages(filtered);
  }, [activeTab]);

  const handleBookTour = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    };

  return (
    <div
      className="bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jungle.jpg')`,
      }}
    >
      <Header />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16">
        <div className="relative flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 transform translate-y-0 transition-transform duration-500">
            Tour and Packages Booking
          </h1>
          <p className="text-xl text-emerald-100 max-w-5xl transform translate-y-0 transition-transform duration-700 delay-100">
            Wildlife tour packages offered by us are meant for a memorable
            vacation in Kanha National Park. For every wildlife lover, we have
            recommendations based on their interest and preference.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
        {/* Add Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          {["Kanha", "Bandhavgarh", "Pench"].map((park) => (
            <button
              key={park}
              onClick={() => setActiveTab(park)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                activeTab === park
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-800/30 text-emerald-100 hover:bg-emerald-700/40"
              }`}
            >
              {park}
            </button>
          ))}
        </div>

        {/* Tour Packages Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b bg-green-900/20 backdrop-blur-lg rounded-3xl"></div>
          <div className="relative mb-6 text-center pt-8 p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-emerald-500 p-3 rounded-lg mr-2">
                <Compass className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-white">
                Available Tour Packages
              </h2>
            </div>
            <p className="text-emerald-100 text-lg max-w-5xl mx-auto">
              Wildlife tour packages offered by us are meant for a memorable
              vacation in Kanha National Park. For every wildlife lover, we have
              recommendations based on their interest and preference. So don't
              just sit back and take a look at some of the best travel packages
              listed below
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {filteredPackages.map((pkg, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-emerald-800/30 border border-emerald-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                {/* Number Label */}
                <div className="absolute top-4 left-4 z-10 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                <div className="aspect-[16/8] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {pkg.title}
                    </h3>
                    <p className="text-emerald-300 text-sm">{pkg.subtitle}</p>
                  </div>

                  <div className="flex gap-4 mb-3">
                    <div className="flex items-center text-emerald-100 text-sm">
                      <Calendar className="h-4 w-4 text-emerald-400 mr-1" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center text-emerald-100 text-sm">
                      <Car className="h-4 w-4 text-emerald-400 mr-1" />
                      <span>{pkg.safaris}</span>
                    </div>
                  </div>

                  <p className="text-emerald-100 text-sm mb-3 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="mb-3">
                    <p className="text-emerald-300 text-2xl font-bold">
                      {pkg.price}
                      <span className="text-emerald-400 text-sm font-normal">
                        {" "}
                        / person
                      </span>
                    </p>
                  </div>

                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-4 text-sm">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-emerald-100"
                      >
                        <ChevronRight className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleBookTour(pkg.id)}
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 font-semibold flex items-center justify-center gap-2 text-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Book This Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tours;
