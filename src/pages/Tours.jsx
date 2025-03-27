import React from 'react';
import { Compass, ChevronRight, MapPin, Calendar, Car } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const packages = [
  {
    title: "Kanha Fun Tour",
    subtitle: "with 1 Jeep Safari",
    duration: "1 Night/2 Days",
    safaris: "1 Jeep Safari",
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&q=80&w=800",
    description: "Kanha National Park is one the biggest tiger reserve and national parks in Madhya Pradesh. Spread over a core area of 940 Sq. km and a buffer area of approximately 1071 Sq. km, the popular national park of India is located in the Mandala district.",
    features: [
      "1 Night Accommodation",
      "1 Jeep Safari",
      "All Meals Included",
      "Transport from Station",
      "Expert Naturalist"
    ]
  },
  {
    title: "Kanha Holiday Tour",
    subtitle: "with 1 Jeep Safari",
    duration: "2 Nights/3 Days",
    safaris: "1 Jeep Safari",
    price: "₹19,999",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800",
    description: "Located in the Mandla and Balaghat district of Madhya Pradesh, the adventurous Kanha kisli National Park is a National Park as well as a Tiger Reserve divided into two sanctuaries, namely Hallon and Banjar.",
    features: [
      "2 Nights Accommodation",
      "1 Jeep Safari",
      "All Meals Included",
      "Transport from Station",
      "Wildlife Guide"
    ]
  },
  {
    title: "Kanha and Bandhavgarh Tour",
    subtitle: "with 2 Jeep Safaris",
    duration: "4 Nights/5 Days",
    safaris: "2 Jeep Safaris",
    price: "₹34,999",
    image: "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?auto=format&fit=crop&q=80&w=800",
    description: "If you are a wildlife and nature enthusiasts then you must try to visit the two popular wildlife destinations of Madhya Pradesh- the Kanha National Park and Bandhavgarh National Park. Kanha is famous for sound wildlife population.",
    features: [
      "4 Nights Accommodation",
      "2 Jeep Safaris",
      "All Meals Included",
      "Inter-park Transfer",
      "Expert Naturalist"
    ]
  },
  {
    title: "Kanha and Pench Tour",
    subtitle: "with 2 Jeep Safaris",
    duration: "4 Nights/5 Days",
    safaris: "2 Jeep Safaris",
    price: "₹32,999",
    image: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&q=80&w=800",
    description: "This wildlife tour covers two most famous and noted parks of central India, Pench and Kanha. The jungle of Pench is primarily a teak forest also popular for royal Bengal tigers and wild dogs.",
    features: [
      "4 Nights Accommodation",
      "2 Jeep Safaris",
      "All Meals Included",
      "Inter-park Transfer",
      "Wildlife Photography"
    ]
  }
];

function App() {
  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('../assets/Jungle.jpg')`
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16">
        <div className="relative flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 transform translate-y-0 transition-transform duration-500">
          Kanha National Park Tour and Packages
          </h1>
          <p className="text-xl text-emerald-100 max-w-5xl transform translate-y-0 transition-transform duration-700 delay-100">
          Wildlife tour packages offered by us are meant for a memorable vacation in Kanha National Park. For every wildlife lover, we have recommendations based on their interest and preference.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tour Packages Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b bg-green-900/20 backdrop-blur-lg rounded-3xl -m-8"></div>
          <div className="relative mb-12 text-center pt-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-emerald-500 p-3 rounded-lg mr-4">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Available Tour Packages
              </h2>
            </div>
            <p className="text-emerald-100 text-lg max-w-5xl mx-auto">
            Wildlife tour packages offered by us are meant for a memorable vacation in Kanha National Park. For every wildlife lover, we have recommendations based on their interest and preference. So don’t just sit back and take a look at some of the best travel packages listed below
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-8">
            {packages.map((pkg, index) => (
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
                    <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
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
                      <span className="text-emerald-400 text-sm font-normal"> / person</span>
                    </p>
                  </div>

                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-4 text-sm">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-emerald-100">
                        <ChevronRight className="h-3 w-3 text-emerald-400 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300 font-semibold flex items-center justify-center gap-2 text-sm">
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

export default App;