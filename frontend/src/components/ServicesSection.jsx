import React, { useState, useEffect } from "react";
import {
  TreePine,
  Compass,
  TentTree,
  Sun,
  Moon,
  ChevronRight,
  X,
} from "lucide-react";
import axios from "axios"; // Add axios import for API calls

const ServiceBookingForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: "1",
    specialRequests: "",
    safariTime: "",
    vehicle: "jeep",
    difficulty: "easy",
    equipmentRental: false,
    mealPreference: "standard",
    photography: false,
    experienceLevel: "beginner",
    specialInterest: "general",
    park: "kanha" // Added park selection with default value
  });
  // Add these missing state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Rename to handleSubmit to match the form onSubmit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send the data to your backend API
      const response = await axios.post('/api/bookings', {
        serviceType: service.title,
        ...formData
      });
      
      console.log("Booking submitted successfully:", response.data);
      alert(`Booking request for ${service.title} submitted successfully!`);
      onClose();
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("Failed to submit booking. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Service-specific form fields
  const renderServiceSpecificFields = () => {
    switch (service.title) {
      case "Jungle Safari":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safari Time*
              </label>
              <select
                name="safariTime"
                value={formData.safariTime}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="">Select Time</option>
                <option value="morning">Morning (6:00 AM - 10:00 AM)</option>
                <option value="evening">Evening (3:00 PM - 6:30 PM)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Preference*
              </label>
              <select
                name="vehicle"
                value={formData.vehicle}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="jeep">Jeep (6 Seater)</option>
                <option value="canter">Canter (20 Seater)</option>
              </select>
            </div>
          </>
        );

      case "Nature Trails":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trail Difficulty*
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="easy">Easy (Beginner Friendly)</option>
                <option value="moderate">Moderate (Some Experience)</option>
                <option value="challenging">Challenging (Experienced Hikers)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Rental
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="equipmentRental"
                  name="equipmentRental"
                  className="mr-2"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "equipmentRental",
                        value: e.target.checked,
                      },
                    })
                  }
                />
                <label htmlFor="equipmentRental">
                  I need binoculars and field guides
                </label>
              </div>
            </div>
          </>
        );

      case "Full Day Safari":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Preferences*
              </label>
              <select
                name="mealPreference"
                value={formData.mealPreference}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="standard">Standard Meal</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="glutenFree">Gluten Free</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photography Equipment
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="photography"
                  name="photography"
                  className="mr-2"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "photography", value: e.target.checked },
                    })
                  }
                />
                <label htmlFor="photography">
                  I'm bringing professional camera equipment
                </label>
              </div>
            </div>
          </>
        );

      case "Night Safari":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level*
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="beginner">Beginner (First Night Safari)</option>
                <option value="intermediate">Intermediate (Some Experience)</option>
                <option value="advanced">Advanced (Experienced)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Interest*
              </label>
              <select
                name="specialInterest"
                value={formData.specialInterest}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                onChange={handleChange}
                required
              >
                <option value="general">General Wildlife</option>
                <option value="nocturnal">Nocturnal Predators</option>
                <option value="astronomy">Stars & Astronomy</option>
                <option value="photography">Night Photography</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="bg-emerald-600 p-2 rounded-lg mr-3">
              <service.icon className="text-white" size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Book {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              National Park*
            </label>
            <select
              name="park"
              value={formData.park}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="kanha">Kanha National Park</option>
              <option value="bandhavgarh">Bandhavgarh National Park</option>
              <option value="pench">Pench National Park</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of People
            </label>
            <select
              name="people"
              value={formData.people}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
              <option value="10+">10+</option>
            </select>
          </div>

          {/* Service-specific fields */}
          {renderServiceSpecificFields()}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 h-24"
              placeholder="Any special requirements or questions?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    </div>
  );
};

// In the ServiceCard component, add park to the initial formData state
const ServiceCard = ({
  title,
  images,
  features,
  icon: Icon,
  service,
  videoSrc,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: "1",
    specialRequests: "",
    // Add default values for service-specific fields
    safariTime: "",
    vehicle: "jeep",
    difficulty: "easy",
    equipmentRental: false,
    mealPreference: "standard",
    photography: false,
    experienceLevel: "beginner",
    specialInterest: "general",
    park: "kanha" // Add default park selection
  });
  // Add these missing state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFlipped && !videoSrc) {
        // Only run slideshow if not a video card and not flipped
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, isFlipped, videoSrc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate required fields for specific service types
    if (title === "Jungle Safari" && !formData.safariTime) {
      setError("Please select a safari time");
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log("Submitting form data:", {
        serviceType: title,
        ...formData
      });
      
      // Send the data to your backend API
      const response = await axios.post('/api/bookings', {
        serviceType: title,
        ...formData
      });
      
      console.log("Booking submitted successfully:", response.data);
      alert(`Booking request for ${title} submitted successfully!`);
      setIsFlipped(false);
    } catch (err) {
      console.error("Error submitting booking:", err);
      // More detailed error message
      const errorMessage = err.response?.data?.error || err.message || "Failed to submit booking. Please try again later.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Service-specific form fields
  const renderServiceSpecificFields = () => {
    switch (title) {
      case "Jungle Safari":
        return (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Safari Time*
              </label>
              <select
                name="safariTime"
                value={formData.safariTime}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="" style={{ backgroundColor: "#1f2937", color: "white" }}>Select Time</option>
                <option value="morning" style={{ backgroundColor: "#1f2937", color: "white" }}>Morning (6:00 AM - 10:00 AM)</option>
                <option value="evening" style={{ backgroundColor: "#1f2937", color: "white" }}>Evening (3:00 PM - 6:30 PM)</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Vehicle Preference*
              </label>
              <select
                name="vehicle"
                value={formData.vehicle}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="jeep" style={{ backgroundColor: "#1f2937", color: "white" }}>Jeep (6 Seater)</option>
                <option value="canter" style={{ backgroundColor: "#1f2937", color: "white" }}>Canter (20 Seater)</option>
              </select>
            </div>
          </>
        );

      case "Nature Trails":
        return (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Trail Difficulty*
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="easy" style={{ backgroundColor: "#1f2937", color: "white" }}>Easy (Beginner Friendly)</option>
                <option value="moderate" style={{ backgroundColor: "#1f2937", color: "white" }}>Moderate (Some Experience)</option>
                <option value="challenging" style={{ backgroundColor: "#1f2937", color: "white" }}>Challenging (Experienced Hikers)</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Equipment Rental
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="equipmentRental"
                  name="equipmentRental"
                  className="mr-2"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "equipmentRental",
                        value: e.target.checked,
                      },
                    })
                  }
                />
                <label htmlFor="equipmentRental" className="text-gray-200">
                  I need binoculars and field guides
                </label>
              </div>
            </div>
          </>
        );

      case "Full Day Safari":
        return (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Meal Preferences*
              </label>
              <select
                name="mealPreference"
                value={formData.mealPreference}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="standard" style={{ backgroundColor: "#1f2937", color: "white" }}>Standard Meal</option>
                <option value="vegetarian" style={{ backgroundColor: "#1f2937", color: "white" }}>Vegetarian</option>
                <option value="vegan" style={{ backgroundColor: "#1f2937", color: "white" }}>Vegan</option>
                <option value="glutenFree" style={{ backgroundColor: "#1f2937", color: "white" }}>Gluten Free</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Photography Equipment
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="photography"
                  name="photography"
                  className="mr-2"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "photography", value: e.target.checked },
                    })
                  }
                />
                <label htmlFor="photography" className="text-gray-200">
                  I'm bringing professional camera equipment
                </label>
              </div>
            </div>
          </>
        );

      case "Night Safari":
        return (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Experience Level*
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="beginner" style={{ backgroundColor: "#1f2937", color: "white" }}>Beginner (First Night Safari)</option>
                <option value="intermediate" style={{ backgroundColor: "#1f2937", color: "white" }}>Intermediate (Some Experience)</option>
                <option value="advanced" style={{ backgroundColor: "#1f2937", color: "white" }}>Advanced (Experienced)</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Special Interest*
              </label>
              <select
                name="specialInterest"
                value={formData.specialInterest}
                className="w-full p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="general" style={{ backgroundColor: "#1f2937", color: "white" }}>General Wildlife</option>
                <option value="nocturnal" style={{ backgroundColor: "#1f2937", color: "white" }}>Nocturnal Predators</option>
                <option value="astronomy" style={{ backgroundColor: "#1f2937", color: "white" }}>Stars & Astronomy</option>
                <option value="photography" style={{ backgroundColor: "#1f2937", color: "white" }}>Night Photography</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-[500px] sm:h-[550px] md:h-[600px] perspective-1000">
      <div
        className={`relative h-full w-full transition-transform duration-700 transform-style preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30 group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Video or Image Slideshow */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-3 sm:mb-4">
            {videoSrc ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))
            )}
          </div>

          {/* Content */}
          <div className="p-1 sm:p-2 flex flex-col h-[250px]">
            <div>
              <div className="flex items-center mb-2 sm:mb-4">
                <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg mr-2 sm:mr-3">
                  <Icon className="text-white" size={16} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {title}
                </h3>
              </div>

              <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-300 text-sm sm:text-base"
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400 mr-1 sm:mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setIsFlipped(true)}
              className="mt-auto w-full py-3.5 sm:py-2 px-3 sm:px-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 group-hover:bg-emerald-500 text-sm sm:text-base"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Back of card (booking form) */}
        <div
          className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:w-1 sm:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-green-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-300"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center">
              <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                <Icon className="text-white" size={16} />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white">
                Book {title}
              </h3>
            </div>
            <button
              onClick={() => setIsFlipped(false)}
              className="text-white hover:text-emerald-300"
            >
              <X size={18} />
            </button>
          </div>

        
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                National Park*
              </label>
              <select
                name="park"
                value={formData.park}
                className="w-full p-1.5 sm:p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                onChange={handleChange}
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <option value="kanha" style={{ backgroundColor: "#1f2937", color: "white" }}>Kanha National Park</option>
                <option value="bandhavgarh" style={{ backgroundColor: "#1f2937", color: "white" }}>Bandhavgarh National Park</option>
                <option value="pench" style={{ backgroundColor: "#1f2937", color: "white" }}>Pench National Park</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Preferred Date*
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Number of People*
              </label>
              <select
                name="people"
                value={formData.people}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/30 border border-white/30 rounded-md focus:ring-2 focus:ring-emerald-500 text-white text-sm"
                required
                style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1} style={{ backgroundColor: "#1f2937", color: "white" }}>
                    {i + 1}
                  </option>
                ))}
                <option value="10+" style={{ backgroundColor: "#1f2937", color: "white" }}>10+</option>
              </select>
            </div>

            {/* Service-specific fields */}
            {renderServiceSpecificFields()}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="w-full p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-emerald-500 text-white h-12 sm:h-16 text-sm"
                placeholder="Any special requirements or questions?"
              ></textarea>
            </div>

            {/* Add error message display */}
            {error && (
              <div className="p-2 bg-red-500/30 text-white text-sm rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300 text-sm sm:text-base disabled:bg-gray-600/50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Jungle Safari",
      icon: TreePine,
      images: [],
      videoSrc:
        "https://videos.pexels.com/video-files/30214834/12953736_640_360_60fps.mp4",
      features: [
        "Guided tours with experienced naturalists",
        "Opportunity to spot tigers and other wildlife",
        "Open jeep safaris for better viewing",
        "Morning and evening slots available",
      ],
    },
    {
      title: "Nature Trails",
      icon: Compass,
      images: [], // Empty array since we're using video
      videoSrc:
        "https://videos.pexels.com/video-files/7624759/7624759-sd_640_360_30fps.mp4",
      features: [
        "Explore the buffer zone on foot",
        "Bird watching opportunities",
        "Learn about local flora and fauna",
        "Suitable for all fitness levels",
      ],
    },
    {
      title: "Full Day Safari",
      icon: Sun,
      images: [],
      videoSrc:
        "https://videos.pexels.com/video-files/11236995/11236995-sd_640_360_30fps.mp4",
      features: [
        "Spend the entire day inside the core zone",
        "Packed meals and refreshments included",
        "Maximum wildlife viewing time",
        "Exclusive routes with fewer tourists",
      ],
    },
    {
      title: "Night Safari",
      icon: Moon,
      images: [],
      videoSrc:
        "https://videos.pexels.com/video-files/13085360/13085360-sd_640_360_25fps.mp4",
      features: [
        "Experience the jungle after dark",
        "Spot nocturnal animals in their natural habitat",
        "Special spotlights for wildlife viewing",
        "Limited availability - book in advance",
      ],
    },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden p-3 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl bg-green-900/20 border border-white/10 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 justify-center text-center sm:text-left">
        <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg mb-2 sm:mb-0 sm:mr-4">
          <TentTree className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-md">
          Explore the Wild: Thrilling Safari Adventures Await!
        </h2>
      </div>

      <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium mb-4 sm:mb-8 text-center max-w-3xl mx-auto">
        Explore Kanha National Park through our range of specialized safari
        experiences. Each service is designed to showcase the unique aspects of
        the park's ecosystem and wildlife.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
