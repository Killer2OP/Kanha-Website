import React, { useState, useEffect, useRef } from "react";
import { Star, MapPin, Check, Share, Calendar, Users, X } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allHotels } from "../data/hotels";

function HotelDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(
    `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  );
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOutDate, setCheckOutDate] = useState(
    `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`
  );
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("standard");
  const [showRoomTypeDropdown, setShowRoomTypeDropdown] = useState(false);

  // Add refs to handle outside clicks
  const guestDropdownRef = useRef(null);
  const datePickerRef = useRef(null);
  const roomTypeDropdownRef = useRef(null);

  const hotel = allHotels.find((h) => h.slug === slug);

  // Room types with their details
  // Remove the static roomTypes object and use hotel.rooms instead
  const roomTypes = hotel?.rooms || {
    standard: {
      name: "Standard Room",
      description: "Comfortable room with all basic amenities",
      priceMultiplier: 1.0,
      img: [hotel?.images?.[3]], // Fallback to hotel images if rooms not defined
    },
    deluxe: {
      name: "Deluxe Room",
      description: "Spacious room with premium furnishings and forest view",
      priceMultiplier: 1.3,
      img: [hotel?.images?.[3]],
    },
    suite: {
      name: "Luxury Suite",
      description:
        "Luxurious suite with separate living area and panoramic views",
      priceMultiplier: 1.8,
      img: [hotel?.images?.[4]],
    },
  };

  // Handle clicks outside the dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target)
      ) {
        setShowGuestDropdown(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        roomTypeDropdownRef.current &&
        !roomTypeDropdownRef.current.contains(event.target)
      ) {
        setShowRoomTypeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
        <div className="text-white text-2xl">Hotel not found</div>
      </div>
    );
  }

  // Generate date options for the next 6 months
  const generateDateOptions = (startFromDate) => {
    const dates = [];
    const today = startFromDate || new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 6); // 6 months from today or start date

    const currentDate = new Date(today);
    while (currentDate <= endDate) {
      const formattedDate = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Calculate total price
  const calculateNights = () => {
    const checkin = new Date(checkInDate);
    const checkout = new Date(checkOutDate);
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nightCount > 0 ? nightCount : 5; // Default to 5 nights if dates are invalid
  };

  const nights = calculateNights();
  const pricePerNight = parseInt(hotel.price.replace(/[^0-9]/g, ""));
  // Apply room type multiplier and guest multiplier
  const roomPriceMultiplier = roomTypes[selectedRoomType].priceMultiplier;
  const guestPriceMultiplier = 1 + (guests - 1) * 0.1;
  const adjustedPricePerNight = Math.round(
    pricePerNight * roomPriceMultiplier * guestPriceMultiplier
  );
  const totalPrice = adjustedPricePerNight * nights;
  const serviceFee = Math.round(totalPrice * 0.15); // 15% service fee
  const totalBeforeTaxes = totalPrice + serviceFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: hotel.name,
          text: `Check out ${hotel.name} in Kanha National Park!`,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSave = () => {
    // In a real app, this would save to user's favorites
    alert("Hotel saved to your favorites!");
  };

  const handleGuestChange = (newGuests) => {
    setGuests(newGuests);
    // Don't close dropdown automatically to allow multiple adjustments
  };

  // Add date selection handlers
  const handleDateSelect = (type, date) => {
    if (type === "checkin") {
      setCheckInDate(date);
      // If checkout date is before new checkin date, adjust checkout
      const checkinDate = new Date(date);
      const checkoutDate = new Date(checkOutDate);
      if (checkoutDate <= checkinDate) {
        // Set checkout to checkin + 1 day
        checkinDate.setDate(checkinDate.getDate() + 1);
        const newCheckout = `${
          checkinDate.getMonth() + 1
        }/${checkinDate.getDate()}/${checkinDate.getFullYear()}`;
        setCheckOutDate(newCheckout);
      }
    } else {
      setCheckOutDate(date);
    }
  };

  const handleRoomTypeSelect = (roomType) => {
    setSelectedRoomType(roomType);
    setShowRoomTypeDropdown(false);
  };

  // Add this state near your other state declarations
  const [showUserForm, setShowUserForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Modify the handleReserve function
  const handleReserve = async () => {
    setShowUserForm(true);
  };

  // Add this new function after handleReserve
  const handleSubmitBooking = async () => {
    try {
      // Validate required fields
      if (!userInfo.name || !userInfo.email || !userInfo.phone) {
        alert("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Validate phone number (basic validation for Indian numbers)
      const phoneRegex = /^[0-9]{10}$/;
      const cleanPhone = userInfo.phone.replace(/[^0-9]/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
      }

      const bookingData = {
        id: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
        name: userInfo.name.trim(),
        email: userInfo.email.trim(),
        phone: cleanPhone,
        property: hotel.name,
        roomType: roomTypes[selectedRoomType].name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests,
        amount: totalBeforeTaxes,
        status: "Pending",
        paymentStatus: "Pending",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:5000/api/hotel-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const responseData = await response.json();
      setIsBookingConfirmed(true);
      alert("Booking confirmed successfully!");
      navigate("/hotel-in-kanha");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(`Booking failed: ${error.message}`);
      setIsBookingConfirmed(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Header />
      </div>

      {/* Add the user form modal here */}
      {showUserForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-gray-900">
                Enter Your Details
              </h3>
              <button
                onClick={() => setShowUserForm(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  required
                  placeholder="Enter your name"
                  style={{ color: "#1f2937" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  required
                  placeholder="Enter your email"
                  style={{ color: "#1f2937" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  required
                  placeholder="Enter your phone number"
                  style={{ color: "#1f2937" }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmitBooking}
              className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hotel Name and Share/Save Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        {!showAllPhotos ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 h-64 md:h-auto relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            {hotel.images &&
              hotel.images.slice(1, 5).map((img, index) => (
                <div key={index} className="h-48 relative">
                  <img
                    src={img}
                    alt={`${hotel.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && (
                    <button
                      onClick={() => setShowAllPhotos(true)}
                      className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
                    >
                      Show all photos
                    </button>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.images &&
                  hotel.images.map((img, index) => (
                    <div key={index} className="space-y-4">
                      <img
                        src={img}
                        alt={`${hotel.name} view ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  Stay in {hotel.location}
                </h2>
                <p className="text-gray-600">
                  {hotel.guests} guests · {hotel.bedrooms} bedroom ·{" "}
                  {hotel.beds} bed · {hotel.bathrooms} bathrooms
                </p>
              </div>
            </div>

            {/* Room Types Section - Add this new section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Available Room Types
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(roomTypes).map(([key, room]) => (
                  <div
                    key={key}
                    className={`border rounded-xl p-4 transition-all cursor-pointer ${
                      selectedRoomType === key
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    onClick={() => handleRoomTypeSelect(key)}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <img
                          src={
                            room.img && room.img.length > 0
                              ? room.img[0]
                              : hotel?.image
                          }
                          alt={room.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {room.name}
                          </h4>
                          <p className="text-gray-600 mt-1">
                            {room.description}
                          </p>
                          <ul className="mt-2 space-y-1">
                            <li className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 text-emerald-500 mr-2" />
                              {key === "standard"
                                ? "Basic amenities"
                                : key === "deluxe"
                                ? "Premium amenities"
                                : "Luxury amenities"}
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 text-emerald-500 mr-2" />
                              {key === "standard"
                                ? "Garden view"
                                : key === "deluxe"
                                ? "Forest view"
                                : "Panoramic view"}
                            </li>
                            <li className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 text-emerald-500 mr-2" />
                              {key === "standard"
                                ? "Queen bed"
                                : key === "deluxe"
                                ? "King bed"
                                : "King bed + sofa bed"}
                            </li>
                          </ul>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-lg font-semibold text-gray-900">
                            ₹
                            {Math.round(
                              pricePerNight * room.priceMultiplier
                            ).toLocaleString()}
                            <span className="text-sm font-normal text-gray-600">
                              {" "}
                              / night
                            </span>
                          </div>
                          <div>
                            <button
                              className={`px-4 py-2 rounded-lg ${
                                selectedRoomType === key
                                  ? "bg-emerald-600 text-white"
                                  : "bg-white border border-emerald-600 text-emerald-600"
                              }`}
                              onClick={() => handleRoomTypeSelect(key)}
                            >
                              {selectedRoomType === key ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {hotel.features &&
                hotel.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-6 border-b border-gray-200"
                  >
                    {index === 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                        />
                      </svg>
                    )}
                    {index === 2 && (
                      <Calendar className="w-8 h-8 text-gray-700" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                About this place
              </h3>
              <p className="text-gray-700 mb-4">{hotel.description}</p>
              <button
                onClick={() => alert("Full description would be shown here")}
                className="text-gray-900 font-semibold underline"
              >
                Show more
              </button>
            </div>

            {/* What this place offers */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-gray-700" />
                  <span className="text-gray-700">Mountain view</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                  <span className="text-gray-700">Resort view</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                  <span className="text-gray-700">Kitchen</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                    />
                  </svg>
                  <span className="text-gray-700">Dedicated workspace</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                    />
                  </svg>
                  <span className="text-gray-700">Wifi</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Free parking on premises
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  <span className="text-gray-700">TV</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Shared outdoor pool - available all year, open specific
                    hours, infinity
                  </span>
                </div>
              </div>
              <button
                onClick={() => alert("All amenities would be shown here")}
                className="mt-6 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Show all amenities
              </button>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-semibold text-gray-900">
                  {hotel.price}
                  <span className="text-base font-normal text-gray-600">
                    {" "}
                    night
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-gray-900 fill-gray-900" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-gray-600">
                    ({hotel.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 relative">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div
                    className="p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      CHECK-IN
                    </label>
                    <div className="text-sm">{checkInDate}</div>
                  </div>
                  <div
                    className="p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      CHECKOUT
                    </label>
                    <div className="text-sm">{checkOutDate}</div>
                  </div>
                </div>

                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div
                    ref={datePickerRef}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowDatePicker(false)}
                  >
                    <div
                      className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-gray-900">
                          Select Dates
                        </h3>
                        <button
                          onClick={() => setShowDatePicker(false)}
                          className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3 text-gray-800">
                            Check-in Date
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {generateDateOptions()
                              .slice(0, 6)
                              .map((date) => (
                                <button
                                  key={`checkin-${date}`}
                                  onClick={() =>
                                    handleDateSelect("checkin", date)
                                  }
                                  className={`p-3 border rounded-lg text-sm transition-colors ${
                                    checkInDate === date
                                      ? "bg-emerald-100 border-emerald-500 text-emerald-700 font-medium"
                                      : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50"
                                  }`}
                                >
                                  {date}
                                </button>
                              ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3 text-gray-800">
                            Check-out Date
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {generateDateOptions(new Date(checkInDate))
                              .slice(1, 7)
                              .map((date) => (
                                <button
                                  key={`checkout-${date}`}
                                  onClick={() =>
                                    handleDateSelect("checkout", date)
                                  }
                                  className={`p-3 border rounded-lg text-sm transition-colors ${
                                    checkOutDate === date
                                      ? "bg-emerald-100 border-emerald-500 text-emerald-700 font-medium"
                                      : "border-gray-300 hover:border-emerald-300 hover:bg-emerald-50"
                                  }`}
                                >
                                  {date}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>

                      <button
                        className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Apply Dates
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className="border-t border-gray-300 p-3 cursor-pointer hover:bg-gray-50 relative"
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                >
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    GUESTS
                  </label>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {guests} guest{guests > 1 ? "s" : ""}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Guest Dropdown - Moved outside the booking form for better positioning */}
              {showGuestDropdown && (
                <div
                  ref={guestDropdownRef}
                  className="absolute z-20 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-1"
                  style={{ top: "auto" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-600">Age 13+</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (guests > 1) handleGuestChange(guests - 1);
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{guests}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (guests < hotel.guests)
                            handleGuestChange(guests + 1);
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    This place has a maximum of {hotel.guests} guests, not
                    including infants.
                  </div>
                  <button
                    className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
                    onClick={() => setShowGuestDropdown(false)}
                  >
                    Apply
                  </button>
                </div>
              )}

              <button
                onClick={handleReserve}
                className={`w-full py-3 rounded-lg font-semibold mb-4 transition ${
                  isBookingConfirmed
                    ? "bg-emerald-700 text-white cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                disabled={isBookingConfirmed}
              >
                {isBookingConfirmed ? "Booking Confirmed!" : "Reserve"}
              </button>

              <p className="text-center text-gray-600 text-sm mb-6">
                You won't be charged yet
              </p>

              {/* Price Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="underline">
                    ₹{adjustedPricePerNight.toLocaleString()} x {nights} night
                    {nights !== 1 ? "s" : ""}
                  </div>
                  <div>₹{totalPrice.toLocaleString()}</div>
                </div>
                {selectedRoomType !== "standard" && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      Includes premium for {roomTypes[selectedRoomType].name}
                    </div>
                  </div>
                )}
                {guests > 1 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      Includes guest fee for {guests - 1} additional guest
                      {guests > 2 ? "s" : ""}
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="underline">Service fee</div>
                  <div>₹{serviceFee.toLocaleString()}</div>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 font-semibold">
                  <div>Total before taxes</div>
                  <div>₹{totalBeforeTaxes.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HotelDetail;
