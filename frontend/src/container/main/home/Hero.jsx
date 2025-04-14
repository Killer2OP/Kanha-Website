import React, { useState, useEffect } from "react";
import { Map } from "lucide-react";
import Header from "../../../components/Header";

function App() {
  const [videoSrc, setVideoSrc] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth > 768;
      setIsLargeScreen(isLarge);
      setVideoSrc(
        isLarge
          ? "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/KanhaBg.mp4"
          : "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/KanhaBg.mp4"
      ); // Ensure correct path and case
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative w-full md:h-screen h-[75vh] overflow-hidden flex flex-col">
      {/* Full-Screen Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoSrc && (
          <video
            key={videoSrc}
            autoPlay
            loop
            playsInline
            muted
            preload="metadata"
            crossOrigin="anonymous"
            className={`absolute inset-0 object-cover ${
              isLargeScreen ? "w-[105%] h-[105%]" : "w-full h-full"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 md:bg-black/40"></div>
      </div>

      <Header className="relative z-10" />

      <main className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4 sm:px-8 md:px-12">
        <img
          src=""
          width="400px" // Replace with actual width
          height="auto" // Replace with actual height
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[650px] mx-auto object-contain"
        />
      </main>

      <footer className="absolute bottom-4 sm:bottom-6 w-full px-6 flex flex-row items-center justify-between text-white text-xs sm:text-sm md:text-base">
        <div className="flex items-center">
          <Map size={20} className="mr-2" />
          <span>Madhya Pradesh, India</span>
        </div>
        <div className="text-right">© Wildlife India</div>
      </footer>
    </div>
  );
}

export default App;
