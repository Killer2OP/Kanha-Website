import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Car, Check, Users, Phone, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import tourPackages from "../data/tourPackages";

function TourDetail() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    date: "",
    specialRequests: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the tour package with the matching ID
    const foundTour = tourPackages.find(pkg => pkg.id === tourId);
    
    if (foundTour) {
      setTour(foundTour);
    }
    
    setLoading(false);
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the booking data to a backend
    console.log("Booking submitted:", {
      tour: tour.title,
      tourId: tour.id,
      ...bookingData,
    });
    
    // Show success message
    setBookingSuccess(true);
    setShowBookingForm(false);
    
    // Reset form
    setBookingData({
      name: "",
      email: "",
      phone: "",
      guests: 1,
      date: "",
      specialRequests: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-200"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Tour Package Not Found</h1>
        <p className="mb-6">The tour package you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/tours')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
        >
          Back to Tours
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-fixed bg-cover bg-center relative min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jungle.jpg')`,
      }}
    >
      <Header />

      <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/tour-packages')}
          className="flex items-center text-emerald-300 hover:text-emerald-100 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Tours
        </button>

        <div className="bg-emerald-800/30 backdrop-blur-lg border border-emerald-500/20 rounded-xl overflow-hidden">
          {/* Hero Image */}
          <div className="h-64 md:h-96 relative">
            <img 
              src={tour.image} 
              alt={tour.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
              <p className="text-emerald-300 text-xl">{tour.subtitle}</p>
            </div>
          </div>

          {/* Tour Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-emerald-100">
                <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center text-emerald-100">
                <Car className="h-5 w-5 text-emerald-400 mr-2" />
                <span>{tour.safaris}</span>
              </div>
              <div className="text-emerald-300 text-2xl font-bold ml-auto">
                {tour.price}
                <span className="text-emerald-400 text-sm font-normal"> / person</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-white mb-4">Tour Description</h2>
                <div className="text-emerald-100 space-y-4">
                  {tour.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Tour Features</h2>
                <ul className="space-y-3">
                  {tour.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-emerald-100">
                      <Check className="h-5 w-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Tour Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500 pl-4 py-2">
                    <h3 className="text-xl font-semibold text-white mb-2">{day.day}</h3>
                    <ul className="space-y-2">
                      {day.activities.map((activity, actIdx) => (
                        <li key={actIdx} className="text-emerald-100 flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 mr-2 flex-shrink-0"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setShowBookingForm(true)}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold text-lg"
              >
                Book This Tour Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Booking Success Message */}
        {bookingSuccess && (
          <div className="mt-8 bg-green-800/30 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">Booking Request Received!</h3>
            <p className="text-green-300 mb-4">
              Thank you for booking with us. We will contact you shortly to confirm your tour details.
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
        
        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-emerald-800/90 border border-emerald-500/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Book Your Tour
                  </h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    &times;
                  </button>
                </div>
                
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-emerald-300 mb-2">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={bookingData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-emerald-300 mb-2">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-emerald-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-emerald-300 mb-2">Number of Guests</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleInputChange}
                          min="1"
                          required
                          className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-emerald-300 mb-2">Preferred Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-emerald-300 mb-2">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full h-32 p-3 bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Any special requests or requirements..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold text-lg"
                    >
                      Submit Booking Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default TourDetail;