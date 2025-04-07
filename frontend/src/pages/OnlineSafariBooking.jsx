import React from "react";
import SafariBooking from "../container/main/home/SafariBooking";
import { Camera, Clock, AlertCircle, MapPin, Info, Calendar } from "lucide-react";
import Header from "../components/Header";

const OnlineSafariBooking = () => {
  const zones = [
    { name: "Kanha", gates: ["Khatiya", "Mukki", "Sarhi"] },
    { name: "Kisli", gates: ["Khatiya", "Mukki"] },
    { name: "Mukki", gates: ["Mukki"] },
    { name: "Sarhi", gates: ["Sarhi"] },
  ];

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Safari.jpg')`
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16">
        <div className="relative flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Online Safari Booking
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Welcome to the online safari booking portal of Kanha National Park
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">

                  {/* Safari Booking Component */}
                  <div className="bg-emerald-900/10 backdrop-blur-lg rounded-3xl p-6 border border-emerald-500/20">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-emerald-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">Book Your Safari</h2>
          </div>
          
          {/* Safari Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&q=80&w=800" 
                alt="Tiger in Kanha"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800" 
                alt="Safari Jeep"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?auto=format&fit=crop&q=80&w=800" 
                alt="Forest Trail"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <SafariBooking />
        </div>

        {/* Important Information Section */}
        <div className="bg-emerald-900/10 backdrop-blur-lg rounded-3xl p-6 border border-emerald-500/20">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-6 w-6 text-emerald-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">Important Information</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">Booking Guidelines</h3>
              <ul className="space-y-3 text-emerald-100">
                <li>• Indian nationals: Book 30 days in advance</li>
                <li>• Foreign nationals: Book 90 days in advance</li>
                <li>• Tatkal bookings open at 5 PM (one day before)</li>
                <li>• Safari remains closed from 1st July to 30th September</li>
                <li>• Maximum 6 persons per vehicle</li>
                <li>• Valid government ID proof required</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">Important Notes</h3>
              <ul className="space-y-3 text-emerald-100">
                <li>• Booking is non-refundable and non-transferable</li>
                <li>• Park closed on Wednesday evenings</li>
                <li>• Official guides are mandatory</li>
                <li>• Pick & drop available at extra cost</li>
                <li>• Limited vehicles per zone</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safari Zones Section */}
        <div className="bg-emerald-900/10 backdrop-blur-lg rounded-3xl p-6 border border-emerald-500/20">
          <div className="flex items-center mb-6">
            <MapPin className="h-6 w-6 text-emerald-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">Safari Zones & Entry Gates</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {zones.map((zone, index) => (
              <div key={index} className="bg-emerald-800/10 rounded-xl p-4">
                <h3 className="text-xl font-semibold text-emerald-300 mb-3">{zone.name} Zone</h3>
                <div className="space-y-2">
                  {zone.gates.map((gate, idx) => (
                    <div key={idx} className="text-emerald-100">• {gate} Gate</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineSafariBooking;
