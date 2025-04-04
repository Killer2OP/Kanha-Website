import React, { useState, useEffect } from "react";
import { Star, MapPin, Check, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allHotels } from "../data/hotels"; // Import allHotels from data file

function Hotels() {
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedParks, setSelectedParks] = useState([]); // New state for park filter
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [hotels, setHotels] = useState(allHotels); // Use imported allHotels
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);

  // Define the available parks
  const availableParks = ["Kanha National Park", "Bandhavgarh National Park", "Pench National Park"];

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, currentPage]);

  // Initial load - assign parks to hotels if not already assigned
  useEffect(() => {
    // Assign default parks to hotels that don't have a park property
    const hotelsWithParks = allHotels.map(hotel => {
      if (!hotel.park) {
        // Assign default park based on hotel name or location
        if (hotel.name.toLowerCase().includes('kanha') || 
            hotel.location.toLowerCase().includes('kanha') ||
            hotel.address.toLowerCase().includes('kanha')) {
          return { ...hotel, park: "Kanha National Park" };
        } else if (hotel.name.toLowerCase().includes('bandhavgarh') || 
                  hotel.location.toLowerCase().includes('bandhavgarh') ||
                  hotel.address.toLowerCase().includes('bandhavgarh')) {
          return { ...hotel, park: "Bandhavgarh National Park" };
        } else if (hotel.name.toLowerCase().includes('pench') || 
                  hotel.location.toLowerCase().includes('pench') ||
                  hotel.address.toLowerCase().includes('pench')) {
          return { ...hotel, park: "Pench National Park" };
        } else {
          // Default to Kanha if no specific park is identified
          return { ...hotel, park: "Kanha National Park" };
        }
      }
      return hotel;
    });
    
    setHotels(hotelsWithParks);
  }, []);

  // Calculate current hotels to display
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSort = (criteria) => {
    setSortBy(criteria);
    let sortedHotels = [...hotels];

    switch (criteria) {
      case "price-low":
        sortedHotels.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "price-high":
        sortedHotels.sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "rating":
        sortedHotels.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Reset to all hotels with parks assigned
        sortedHotels = allHotels.map(hotel => {
          if (!hotel.park) {
            if (hotel.name.toLowerCase().includes('kanha') || 
                hotel.location.toLowerCase().includes('kanha') ||
                hotel.address.toLowerCase().includes('kanha')) {
              return { ...hotel, park: "Kanha National Park" };
            } else if (hotel.name.toLowerCase().includes('bandhavgarh') || 
                      hotel.location.toLowerCase().includes('bandhavgarh') ||
                      hotel.address.toLowerCase().includes('bandhavgarh')) {
              return { ...hotel, park: "Bandhavgarh National Park" };
            } else if (hotel.name.toLowerCase().includes('pench') || 
                      hotel.location.toLowerCase().includes('pench') ||
                      hotel.address.toLowerCase().includes('pench')) {
              return { ...hotel, park: "Pench National Park" };
            } else {
              return { ...hotel, park: "Kanha National Park" };
            }
          }
          return hotel;
        });
    }
    setHotels(sortedHotels);
  };

  const handleStarFilter = (star) => {
    const newSelectedStars = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star];

    setSelectedStars(newSelectedStars);
    applyFilters(newSelectedStars, selectedParks, priceRange);
  };

  // New handler for park filter
  const handleParkFilter = (park) => {
    const newSelectedParks = selectedParks.includes(park)
      ? selectedParks.filter((p) => p !== park)
      : [...selectedParks, park];

    setSelectedParks(newSelectedParks);
    applyFilters(selectedStars, newSelectedParks, priceRange);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    applyFilters(selectedStars, selectedParks, value);
  };

  // Updated applyFilters function to include park filter
  const applyFilters = (stars, parks, price) => {
    // Start with all hotels, ensuring they have park properties
    let filteredHotels = allHotels.map(hotel => {
      if (!hotel.park) {
        if (hotel.name.toLowerCase().includes('kanha') || 
            hotel.location.toLowerCase().includes('kanha') ||
            hotel.address.toLowerCase().includes('kanha')) {
          return { ...hotel, park: "Kanha National Park" };
        } else if (hotel.name.toLowerCase().includes('bandhavgarh') || 
                  hotel.location.toLowerCase().includes('bandhavgarh') ||
                  hotel.address.toLowerCase().includes('bandhavgarh')) {
          return { ...hotel, park: "Bandhavgarh National Park" };
        } else if (hotel.name.toLowerCase().includes('pench') || 
                  hotel.location.toLowerCase().includes('pench') ||
                  hotel.address.toLowerCase().includes('pench')) {
          return { ...hotel, park: "Pench National Park" };
        } else {
          return { ...hotel, park: "Kanha National Park" };
        }
      }
      return hotel;
    });

    // Apply star filter
    if (stars.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        stars.includes(hotel.stars)
      );
    }

    // Apply park filter
    if (parks.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        parks.includes(hotel.park)
      );
    }

    // Apply price filter
    filteredHotels = filteredHotels.filter((hotel) => {
      const hotelPrice = parseInt(hotel.price.replace(/[^0-9]/g, ""));
      return hotelPrice >= price[0] && hotelPrice <= price[1];
    });

    setHotels(filteredHotels);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Update page title based on selected park
  useEffect(() => {
    let title = "Hotels";
    if (selectedParks.length === 1) {
      const parkName = selectedParks[0].replace(" National Park", "");
      title = `Hotels in ${parkName}`;
    } else if (selectedParks.length > 1) {
      title = "Hotels in Multiple Parks";
    } else {
      title = "Hotels in Wildlife Parks";
    }
    
    document.title = title;
  }, [selectedParks]);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Resort.jpg')`,
      }}
    >
      <Header />

      {/* Hero Section - unchanged */}
      <div className="relative pt-32 pb-16">
        <div className="relative flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Hotel Booking
          </h1>
          <p className="text-xl text-emerald-100 max-w-6xl">
            Here we are empowering wildlife travelers with instant hotel
            and resort booking with comprehensive choices in Kanha, Bandhavgarh,
            and Pench National Parks. We have tie-ups with a vast network of hotels
            across these parks which include both luxury and budget accommodations
            to suit every traveler's needs.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-lg rounded-3xl"></div>

          {/* Filter and Sort Section - updated with park filter */}
          <div className="relative mb-6 space-y-6 px-4 md:px-6 py-6">
            {/* Park Filter - Enhanced Component */}
            <div className="w-full bg-emerald-900/40 p-5 rounded-xl shadow-lg border border-emerald-500/20">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-emerald-400 mr-2" />
                Select National Park
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Kanha National Park", "Bandhavgarh National Park", "Pench National Park"].map((park) => (
                  <button
                    key={park}
                    onClick={() => handleParkFilter(park)}
                    className={`flex items-center gap-1 px-5 py-3 rounded-lg transition-colors duration-200 shadow-md
                      ${
                        selectedParks.includes(park)
                          ? "bg-emerald-500 text-white font-medium border-2 border-emerald-400"
                          : "bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800/70 border border-emerald-700/30"
                      }`}
                  >
                    <span className="text-base">{park}</span>
                  </button>
                ))}
                {selectedParks.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedParks([]);
                      applyFilters(selectedStars, [], priceRange);
                    }}
                    className="flex items-center gap-1 px-5 py-3 rounded-lg bg-red-500/70 text-white hover:bg-red-600 transition-colors duration-200 shadow-md border border-red-400/30"
                  >
                    <span>Clear Selection</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-emerald-900/30 p-5 rounded-xl shadow-lg border border-emerald-500/20">
              {/* Star Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h3 className="text-white text-lg font-semibold flex items-center">
                  <Filter className="h-5 w-5 text-emerald-400 mr-2" />
                  Hotel Rating
                </h3>
                <div className="flex gap-3">
                  {[3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarFilter(star)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 shadow-sm
                        ${
                          selectedStars.includes(star)
                            ? "bg-emerald-500 text-white border border-emerald-400"
                            : "bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800/50 border border-emerald-700/30"
                        }`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          selectedStars.includes(star)
                            ? "fill-white"
                            : "fill-emerald-400"
                        }`}
                      />
                      <span>{star} Star</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-3">
                <h3 className="text-white text-lg font-semibold flex items-center">
                  <ArrowUpDown className="h-5 w-5 text-emerald-400 mr-2" />
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-emerald-800/70 text-emerald-100 px-4 py-2 rounded-lg border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer shadow-sm"
                >
                  <option value="" className="bg-emerald-800 text-emerald-100">
                    Default
                  </option>
                  <option
                    value="price-low"
                    className="bg-emerald-800 text-emerald-100"
                  >
                    Price: Low to High
                  </option>
                  <option
                    value="price-high"
                    className="bg-emerald-800 text-emerald-100"
                  >
                    Price: High to Low
                  </option>
                  <option
                    value="rating"
                    className="bg-emerald-800 text-emerald-100"
                  >
                    Rating
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Hotels List */}
          <div className="relative space-y-6 px-4 md:px-6 pb-8 md:pb-8">
            {currentHotels.length > 0 ? (
              currentHotels.map((hotel, index) => (
                <div
                  key={index}
                  className="bg-emerald-950/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-500/20 shadow-xl transition-transform duration-300 hover:scale-[1.01]"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Hotel Image */}
                    <Link to={`/hotel/${hotel.id}`} className="relative h-72 md:h-full">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {hotel.featured && (
                        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                          Featured
                        </div>
                      )}
                      {hotel.park && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
                          {hotel.park}
                        </div>
                      )}
                    </Link>

                    {/* Hotel Details */}
                    <div className="p-6 md:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Link to={`/hotel-in-kanha/${hotel.slug}`} className="hover:text-emerald-300 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {hotel.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 text-emerald-300 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{hotel.location}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-2">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-bold">
                              {hotel.rating}
                            </span>
                            <span className="text-emerald-300 whitespace-nowrap">
                              ({hotel.reviews} Reviews)
                            </span>
                          </div>
                          <div className="text-emerald-300 text-xl md:text-2xl font-bold">
                            {hotel.price}
                            <span className="text-xs md:text-[18px] font-normal">
                              {" "}
                              / Night
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-emerald-100 text-sm mb-4">
                        {hotel.address}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {hotel.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-emerald-100"
                          >
                            <Check className="h-4 w-4 text-emerald-400" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>

                      <Link to={`/hotel-in-kanha/${hotel.slug}`} className="inline-block w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 font-semibold text-sm text-center">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            
) : (
  <div className="text-center py-8">
    <p className="text-white text-xl">No hotels found matching your criteria.</p>
  </div>
)}
            {hotels.length > hotelsPerPage && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === 1 
                      ? 'bg-emerald-800/50 text-emerald-300/50 cursor-not-allowed' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } transition-colors duration-200`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        currentPage === i + 1
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === totalPages 
                      ? 'bg-emerald-800/50 text-emerald-300/50 cursor-not-allowed' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } transition-colors duration-200`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Hotels;
