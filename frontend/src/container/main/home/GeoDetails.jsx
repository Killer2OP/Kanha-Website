import React, { useState, useEffect } from "react";
import {
  Map,
  Trees,
  Target,
  Shield,
  TreePine,
  Mountain,
  Thermometer,
  Compass,
  Landmark,
  Leaf,
  Rabbit,
  Bird,
} from "lucide-react";

// Park data
const parkData = [
  {
    id: "kanha",
    name: "Kanha National Park",
    details: [
      {
        icon: Trees,
        text: "Total Tiger Reserve Area – 2074.31 Square Kilometres",
      },
      {
        icon: Target,
        text: "Core/Critical Tiger Habitat – 917.43 Square Kilometres",
      },
      { icon: Shield, text: "Buffer Zone – 1134.31 Square Kilometres" },
      {
        icon: Map,
        text: "National Park Area – 940 Square Kilometres (including 917.43 sq. km. of critical tiger habitat)",
      },
      {
        icon: TreePine,
        text: "Location - Maikal ranges of the Satpuras, Mandla and Balaghat districts of Madhya Pradesh",
      },
      {
        icon: Mountain,
        text: "Includes Phen Wildlife Sanctuary (110 sq. km.) - a Satellitic Micro Core",
      },
      {
        icon: Thermometer,
        text: "Known for saving the endangered hard ground barasingha (Cervus duvauceli branderi) from extinction",
      },
    ],
  },
  {
    id: "bandhavgarh",
    name: "Bandhavgarh National Park",
    details: [
      {
        icon: Trees,
        text: "Total Tiger Reserve Area – 1536.93 Square Kilometres",
      },
      {
        icon: Target,
        text: "Core/Critical Tiger Habitat – 716.90 Square Kilometres",
      },
      { icon: Shield, text: "Buffer Zone – 820.03 Square Kilometres" },
      { icon: Map, text: "National Park Area – 453.65 Square Kilometres" },
      {
        icon: TreePine,
        text: "Location - Vindhya hills in Umaria district of Madhya Pradesh",
      },
      { icon: Compass, text: "Highest density of Bengal tigers in India" },
      {
        icon: Landmark,
        text: "Features ancient caves with inscriptions and rock paintings dating back to 1st century BC",
      },
    ],
  },
  {
    id: "pench",
    name: "Pench National Park",
    details: [
      {
        icon: Trees,
        text: "Total Tiger Reserve Area – 1179.63 Square Kilometres",
      },
      {
        icon: Target,
        text: "Core/Critical Tiger Habitat – 411.33 Square Kilometres",
      },
      { icon: Shield, text: "Buffer Zone – 768.30 Square Kilometres" },
      { icon: Map, text: "National Park Area – 292.85 Square Kilometres" },
      {
        icon: TreePine,
        text: "Location - Southern boundary of Madhya Pradesh and northern boundary of Maharashtra",
      },
      {
        icon: Leaf,
        text: "Named after the Pench River that flows through the park",
      },
      {
        icon: Bird,
        text: "Home to over 285 species of resident and migratory birds",
      },
      {
        icon: Rabbit,
        text: "Inspiration for Rudyard Kipling's 'The Jungle Book'",
      },
    ],
  },
];

function App() {
  const [activePark, setActivePark] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (slideDirection) {
      setIsAnimating(true);
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [slideDirection, activePark]);

  // Auto-slide functionality
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      if (!isAnimating) {
        setSlideDirection("right");
        setActivePark((prev) => (prev === parkData.length - 1 ? 0 : prev + 1));
      }
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(autoSlideInterval);
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Fixed Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/geolocation.webp"
                alt="National Park Map"
                className="w-full h-auto object-cover shadow-green-900/30"
              />
            </div>
          </div>

          {/* Right side - Content with sliding animation */}
          <div className="text-green-50 overflow-hidden">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "system-ui" }}
            >
              Geographical Details
            </h1>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-emerald-400">
                {parkData[activePark].name}
              </h2>

              {/* Subtle indicator dots */}
              <div className="flex space-x-2 mt-3">
                {parkData.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === activePark
                        ? "bg-emerald-400 w-4"
                        : "bg-emerald-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className={`space-y-6 text-lg transition-all duration-500 transform ${
                isAnimating
                  ? slideDirection === "right"
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
              key={activePark}
            >
              {parkData[activePark].details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors"
                >
                  <detail.icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <p>{detail.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
