import React, { useState, useEffect } from "react";
import { Star, MapPin, Check, Filter, ArrowUpDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allHotels = [
  {
    name: "Krishna Jungle Resort Kanha",
    rating: 3.9,
    stars: 3,
    reviews: 180,
    location: "Mandla , Khatia Gate",
    address: "Chawdiganj - Kanha Rd, Mandla, Madhya Pradesh 481758",
    price: "₹5,500",
    image:
      "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&q=80&w=800",
    amenities: [
      "Cancellation Policy",
      "Breakfast Included",
      "Free Wifi",
      "Swimming Pool",
    ],
    featured: true,
  },
  {
    name: "Tuli Tiger Resort Kanha",
    rating: 4.3,
    stars: 4,
    reviews: 400,
    location: "Mocha , Khatia Gate",
    address: "Kanha National Park, Village: Mocha, Madhya Pradesh 481111",
    price: "₹12,500",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800",
    amenities: [
      "Cancellation Policy",
      "Breakfast Included",
      "Spa",
      "Restaurant",
    ],
    featured: true,
  },
  {
    name: "Kanha Earth Lodge",
    rating: 4.5,
    stars: 5,
    reviews: 320,
    location: "Near Mukki Gate",
    address: "Village Kuchwahi, Near Mukki Gate, Madhya Pradesh 481768",
    price: "₹15,500",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    amenities: ["Luxury Rooms", "All Meals", "Safari Booking", "Pool"],
    featured: true,
  },
  {
    name: "Chitvan Jungle Lodge",
    rating: 4.2,
    stars: 4,
    reviews: 250,
    location: "Near Khatia Gate",
    address: "Khatia Village, Kanha National Park, MP 481768",
    price: "₹9,500",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    amenities: ["Free Breakfast", "Wifi", "Garden", "Restaurant"],
  },
];

function Hotels() {
  const [selectedStars, setSelectedStars] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [hotels, setHotels] = useState(allHotels);
  const [sortBy, setSortBy] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

      {/* Hero Section */}
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
          <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur-lg rounded-3xl"></div>

          {/* Filter and Sort Section */}
          <div className="relative mb-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-900/50 py-4 px-4 rounded-xl">
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

          {/* Hotels List */}
          <div className="relative space-y-6 px-2">
            {hotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-emerald-900/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-500/20"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Hotel Image */}
                  <div className="relative h-64 md:h-full">
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
                  </div>

                  {/* Hotel Details */}
                  <div className="p-6 md:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center gap-2 text-emerald-300 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{hotel.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-bold">
                            {hotel.rating}
                          </span>
                          <span className="text-emerald-300">
                            ({hotel.reviews} reviews)
                          </span>
                        </div>
                        <div className="text-emerald-300 text-2xl font-bold">
                          {hotel.price}
                          <span className="text-sm font-normal"> / night</span>
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

                    <button className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 font-semibold text-sm">
                      Book Now
                    </button>
                  </div>
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

export default Hotels;
