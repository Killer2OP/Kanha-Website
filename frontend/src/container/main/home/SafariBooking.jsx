import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { Clock, ChevronDown } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import { tariffDetails, tariffData, safariTypes } from "./SafariBookingData";
import "./SafariCalendar.css"; // Add this import for custom calendar styling
import axios from "axios"; // Import axios for API calls

function App() {
  const [date, setDate] = useState(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ success: false, message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "indian",
    safariType: "",
    guests: "1",
    park: "kanha", // Add default park selection
  });

  // Enhanced park data with more comprehensive information
  const parks = {
    kanha: {
      name: "Kanha National Park",
      priceMultiplier: 1.0, // Base price
      description:
        "Famous for tigers and barasingha deer with diverse landscapes",
      fullDescription:
        "Kanha National Park, located in Madhya Pradesh, spans 940 sq. km of core area and is known for its significant tiger population and the rare hard-ground barasingha. The park's varied habitats include sal and bamboo forests, grasslands, and streams that support diverse wildlife.",
      gates: ["Khatiya", "Mukki", "Sarhi"],
      bestTimeToVisit: "October to June",
      famousFor: [
        "Tigers",
        "Barasingha Deer",
        "Diverse Landscapes",
        "Sal Forests",
      ],
    },
    bandhavgarh: {
      name: "Bandhavgarh National Park",
      priceMultiplier: 1.2, // 20% higher than Kanha
      description: "Known for high tiger density and ancient fort ruins",
      fullDescription:
        "Bandhavgarh National Park boasts the highest density of Bengal tigers in India and features dramatic landscapes with steep ridges, open meadows, and dense forests. The ancient Bandhavgarh Fort within the park adds historical significance to this wildlife haven.",
      gates: ["Tala", "Magdhi", "Khitauli"],
      bestTimeToVisit: "October to June",
      famousFor: [
        "High Tiger Density",
        "Ancient Fort",
        "White Tigers",
        "Grasslands",
      ],
    },
    pench: {
      name: "Pench National Park",
      priceMultiplier: 0.9, // 10% lower than Kanha
      description: "Inspiration for 'The Jungle Book' with rich biodiversity",
      fullDescription:
        "Pench National Park, straddling Madhya Pradesh and Maharashtra, is believed to have inspired Rudyard Kipling's 'The Jungle Book'. The park features teak forests and the Pench River, supporting a rich ecosystem with tigers, leopards, wild dogs, and over 285 bird species.",
      gates: ["Turia", "Jamtara", "Karmajhiri"],
      bestTimeToVisit: "November to May",
      famousFor: [
        "The Jungle Book",
        "Teak Forests",
        "Wild Dogs",
        "Birdwatching",
      ],
    },
  };

  const handleDateChange = (value) => {
    setDate(value);
    setIsFlipped(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookingStatus({ success: false, message: "" });
    
    try {
      // Prepare booking data
      const bookingData = {
        date: date instanceof Date ? format(date, "dd/MM/yyyy") : "",
        formattedDate: date instanceof Date ? format(date, "dd MMMM yyyy") : "",
        time: formData.safariType ? safariTypes[formData.safariType].time : "",
        parkName: parks[formData.park].name,
        safariTypeName: formData.safariType ? safariTypes[formData.safariType].title : "",
        totalAmount: getPrice(),
        ...formData,
      };
      
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/safari-bookings', bookingData);
      
      console.log("Booking successful:", response.data);
      setBookingStatus({ 
        success: true, 
        message: "Your safari booking has been confirmed! Check your email for details." 
      });
      alert(
        "Booking confirmed! We will contact you soon for confirmation."
      );
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        nationality: "indian",
        safariType: "",
        guests: "1",
        park: "kanha",
      });
      setIsFlipped(false);
      
    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus({ 
        success: false, 
        message: error.response?.data?.message || "Failed to book safari. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsFlipped(false);
  };

  const getPrice = () => {
    if (!formData.safariType || !formData.park) return 0;

    // Check if the selected date is a weekend (Saturday or Sunday)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    // Get the appropriate price based on nationality and whether it's a weekend
    let basePrice = 0;
    if (formData.nationality === "indian") {
      basePrice = isWeekend
        ? tariffDetails.weekendsCoreZones.indian
        : tariffDetails.weekdaysCoreZones.indian;
    } else {
      basePrice = isWeekend
        ? tariffDetails.weekendsCoreZones.foreign
        : tariffDetails.weekdaysCoreZones.foreign;
    }

    // Apply park-specific price multiplier
    return Math.round(basePrice * parks[formData.park].priceMultiplier);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Tariff Details Section - unchanged */}
      <div className="flex-[1.5] min-h-[480px] max-h-[450px] md:max-h-[450px] lg:max-h-[790px]  
                bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-white 
                overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-green-100 [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-emerald-300">
        <h2 className="text-2xl font-bold mb-4">National Park Safari Tariff</h2>

        {/* Park Selection Tabs - Enhanced with better styling */}
        <div className="flex flex-wrap gap-4 pb-3">
          {Object.entries(parks).map(([key, park]) => (
            <button
              key={key}
              onClick={() => setFormData({ ...formData, park: key })}
              className={`px-2 py-2 rounded-lg whitespace-nowrap transition-all ${
                formData.park === key
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {park.name}
            </button>
          ))}
        </div>

        <p className="text-yellow-300 mb-4">
          You May Reserve Your Seats and Accommodation NOW.
        </p>

        <div className="space-y-4">
          {/* Display selected park description with enhanced details */}
          <div className="bg-white/5 p-4 rounded-lg mb-2">
            <h3 className="text-lg font-semibold text-emerald-300">
              {parks[formData.park].name}
            </h3>
            <p className="text-gray-200 mb-2">
              {parks[formData.park].fullDescription}
            </p>

            {/* Additional park information */}
            <div className="mt-3 space-y-2">
              {/* <div>
                  <h4 className="text-sm font-semibold text-emerald-200">
                    Entry Gates:
                  </h4>
                  <p className="text-gray-300">
                    {parks[formData.park].gates.join(", ")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-200">
                    Best Time to Visit:
                  </h4>
                  <p className="text-gray-300">
                    {parks[formData.park].bestTimeToVisit}
                  </p>
                </div> */}
              <div>
                <h4 className="text-sm font-semibold text-emerald-200">
                  Famous For:
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parks[formData.park].famousFor.map((item, i) => (
                    <span
                      key={i}
                      className="bg-emerald-900/50 text-emerald-100 text-xs px-2 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {tariffData.map((item, index) => (
            <div key={index} className="bg-white/5 p-3 rounded-lg mb-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-emerald-200">
                Indian: ₹
                {Math.round(
                  item.details.indian * parks[formData.park].priceMultiplier
                )}
              </p>
              <p className="text-emerald-200">
                Foreigner: ₹
                {Math.round(
                  item.details.foreign * parks[formData.park].priceMultiplier
                )}
              </p>
              <p className="text-gray-300">
                Zones: {item.details.zones.join(", ")}
              </p>
            </div>
          ))}

          <div className="bg-white/5 p-3 rounded-lg">
            <h3 className="text-lg font-semibold text-white">Timings</h3>
            <p className="text-emerald-200">
              Morning: {tariffDetails.timings.morning}
            </p>
            <p className="text-emerald-200">
              Evening: {tariffDetails.timings.evening}
            </p>
            <p className="text-sm text-gray-400">
              (Safari Timing Varies as Season Changes)
            </p>
          </div>
        </div>
      </div>

      {/* Calendar and Booking Form Section - Updated for larger calendar */}
      <div className="flex-[1.5] min-h-[480px] md:max-w-2xl lg:max-w-none mx-auto w-full">
        <div className="relative min-h-[650px] md:min-h-[700px] perspective-1000">
          <div
            className={`absolute inset-0 duration-700 preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front - Calendar - Increased size */}
            <div className="absolute inset-0 h-[450px] md:h-[850px] max-h-[620px] mx-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-3 md:p-6 backface-hidden">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Select Your Safari Date
              </h2>
              <div className="safari-calendar-container">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="w-full border-none safari-calendar text-lg"
                  minDate={new Date()}
                />
              </div>
            </div>

            {/* Back - Booking Form - unchanged */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xl h-[480px] md:h-[780px] border border-white/10 rounded-xl p-3 md:p-6 overflow-y-auto backface-hidden rotate-y-180">
              <div className="flex justify-between items-center mb-7 px-6">
                <h2 className="text-2xl font-bold text-white">
                  Booking Details
                </h2>
                <button
                  onClick={handleBack}
                  className="text-white hover:text-emerald-300 transition-colors"
                >
                  ← Back to Calendar
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8 px-4 md:px-6 pb-8"
              >
                {/* Selected Date */}
                <div className="text-white">
                  <label className="block text-lg font-medium mb-2">
                    Selected Date
                  </label>
                  <div className="text-emerald-300 text-xl font-semibold">
                    {date instanceof Date ? format(date, "dd MMMM yyyy") : ""}
                  </div>
                </div>

                {/* Park Selection */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Select National Park
                  </h3>
                  <div className="relative">
                    <select
                      id="park"
                      name="park"
                      value={formData.park}
                      onChange={handleInputChange}
                      className="w-full bg-emerald-950/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:ring-emerald-400 appearance-none"
                    >
                      {Object.entries(parks).map(([key, park]) => (
                        <option
                          key={key}
                          value={key}
                          className="bg-emerald-950/90"
                        >
                          {park.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none size-4" />
                  </div>

                  <div className="mt-4 bg-white/5 p-4 rounded-lg">
                    <h5 className="text-lg font-bold text-white mb-2">
                      {parks[formData.park].name}
                    </h5>
                    <p className="text-gray-300 mb-3">
                      {parks[formData.park].description}
                    </p>

                    <div className="mt-3">
                      <h6 className="text-sm font-semibold text-emerald-200">
                        Entry Gates:
                      </h6>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {parks[formData.park].gates.map((gate, i) => (
                          <span
                            key={i}
                            className="bg-emerald-900/50 text-emerald-100 text-xs px-2 py-1 rounded-full"
                          >
                            {gate}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safari Types */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {Object.entries(safariTypes).map(([key, safari]) => (
                    <label
                      key={key}
                      className={`bg-white/5 backdrop-blur-sm border cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                        formData.safariType === key
                          ? "border-emerald-400 bg-white/10"
                          : "border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="safariType"
                        value={key}
                        checked={formData.safariType === key}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 mb-4">
                        {React.createElement(safari.icon, {
                          className: `size-6 ${safari.colorClass}`,
                        })}
                        <h5 className="text-xl font-bold text-white">
                          {safari.title}
                        </h5>
                      </div>
                      <p className="text-gray-300 mb-3">{safari.description}</p>
                      <p className={`${safari.colorClass} font-semibold`}>
                        {safari.time}
                      </p>
                    </label>
                  ))}
                </div>

                {/* Guest Info */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 focus:border-emerald-400 focus:ring-emerald-400"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 focus:border-emerald-400 focus:ring-emerald-400"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 focus:border-emerald-400 focus:ring-emerald-400"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Nationality
                    </label>
                    <div className="relative">
                      <select
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full bg-emerald-950/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-400 focus:ring-emerald-400 appearance-none"
                      >
                        <option value="indian" className="bg-emerald-950/90">
                          Indian National
                        </option>
                        <option value="foreign" className="bg-emerald-950/90">
                          Foreign National
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none size-4" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Number of Guests
                    </label>
                    <div className="relative">
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-emerald-950/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-400 focus:ring-emerald-400 appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option
                            key={num}
                            value={num}
                            className="bg-emerald-950/90"
                          >
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none size-4" />
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                {formData.safariType && (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        Park:{" "}
                        <span className="text-white">
                          {parks[formData.park].name}
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Safari Type:{" "}
                        <span className="text-white">
                          {safariTypes[formData.safariType].title}
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Date:{" "}
                        <span className="text-white">
                          {date instanceof Date
                            ? format(date, "dd MMMM yyyy")
                            : ""}
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Time:{" "}
                        <span className="text-white">
                          {safariTypes[formData.safariType].time}
                        </span>
                      </p>
                      <p className="text-gray-300">
                        Guests:{" "}
                        <span className="text-white">{formData.guests}</span>
                      </p>
                      <p className="text-xl font-bold text-emerald-400 mt-4">
                        Total Amount: ₹{getPrice().toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading 
                      ? "bg-emerald-700 cursor-wait" 
                      : "bg-emerald-600 hover:bg-emerald-700"
                  } text-white py-3 md:py-4 px-8 rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg font-semibold`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Clock className="size-5 md:size-6" />
                      Confirm Booking
                    </>
                  )} 
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
