import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Car, Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import tourPackages from "../data/tourPackages";

function TourDetail() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the tour package with the matching ID
    const foundTour = tourPackages.find(pkg => pkg.id === tourId);
    
    if (foundTour) {
      setTour(foundTour);
    }
    
    setLoading(false);
  }, [tourId]);

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
              <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold text-lg">
                Book This Tour Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TourDetail;