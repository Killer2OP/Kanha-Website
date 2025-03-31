import React, { useState, useEffect } from "react";
import { Star, MapPin, Check, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allHotels } from "../data/hotels"; // Import allHotels from data file

function Hotels() {
  const [selectedStars, setSelectedStars] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [hotels, setHotels] = useState(allHotels); // Use imported allHotels
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, currentPage]);

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
        sortedHotels = [...allHotels];
    }
    setHotels(sortedHotels);
  };

  const handleStarFilter = (star) => {
    const newSelectedStars = selectedStars.includes(star)
      ? selectedStars.filter((s) => s !== star)
      : [...selectedStars, star];

    setSelectedStars(newSelectedStars);
    applyFilters(newSelectedStars, priceRange);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    applyFilters(selectedStars, value);
  };

  const applyFilters = (stars, price) => {
    let filteredHotels = allHotels;

    // Apply star filter
    if (stars.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        stars.includes(hotel.stars)
      );
    }

    // Apply price filter
    filteredHotels = filteredHotels.filter((hotel) => {
      const hotelPrice = parseInt(hotel.price.replace(/[^0-9]/g, ""));
      return hotelPrice >= price[0] && hotelPrice <= price[1];
    });

    setHotels(filteredHotels);
  };

  // Add this right after the star filter section
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
            Hotels in Kanha
          </h1>
          <p className="text-xl text-emerald-100 max-w-6xl">
            Here we are empowering the wildlife travellers with instant hotel
            and resort booking with comprehensive choices in Kanha National
            Park. We have tie-up with vast network of hotels in Kanha which
            include both luxury and budget hotels.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-lg rounded-3xl"></div>

          {/* Filter and Sort Section - unchanged */}
          <div className="relative mb-4 space-y-4 px-4 md:px-6 py-6 ">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-900/20 py-4 px-4 rounded-xl">
              {/* Star Filter */}
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-emerald-400" />
                <div className="flex gap-3">
                  {[3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarFilter(star)}
                      className={`flex items-center gap-1 px-2 py-2 rounded-lg transition-colors duration-200
                        ${
                          selectedStars.includes(star)
                            ? "bg-emerald-500 text-white"
                            : "bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800/50"
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
                <ArrowUpDown className="h-5 w-5 text-emerald-400" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-emerald-800/70 text-emerald-100 px-4 py-2 rounded-lg border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
                >
                  <option value="" className="bg-emerald-800 text-emerald-100">
                    Sort By
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

          {/* Hotels List - modified to use currentHotels instead of hotels */}
          <div className="relative space-y-4 px-4 md:px-6 pb-6 md:pb-6">
            {currentHotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-emerald-950/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-500/20"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Hotel Image */}
                  <Link to={`/hotel/${hotel.id}`} className="relative h-64 md:h-full">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {hotel.featured && (
                      <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
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
            ))}
            
            {/* Pagination Component */}
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
