import React, { useState, useEffect, useRef } from "react";
import { Map } from "lucide-react";
import Header from "../../../components/Header";

// Custom hook to add preload link to head
const useImagePreload = (imagePath) => {
  useEffect(() => {
    // Create link element for preloading
    const linkElement = document.createElement("link");
    linkElement.rel = "preload";
    linkElement.as = "image";
    linkElement.href = imagePath;
    linkElement.type = "image/webp";
    linkElement.fetchpriority = "high";

    // Add to head
    document.head.appendChild(linkElement);

    // Clean up
    return () => {
      document.head.removeChild(linkElement);
    };
  }, [imagePath]);
};

// Preload the logo image
const LOGO_PATH = "/assets/Jungle1.webp";

function App() {
  const [videoSrc, setVideoSrc] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef(null);

  // Use the preload hook
  useImagePreload(LOGO_PATH);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Load video after image is loaded
  useEffect(() => {
    if (imageLoaded) {
      // Delay video loading slightly to prioritize image rendering
      const timer = setTimeout(() => {
        setVideoSrc(
          "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/KanhaBg.mp4"
        );
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth > 768;
      setIsLargeScreen(isLarge);
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
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop
            playsInline
            muted
            preload="metadata"
            loading="lazy"
            crossOrigin="anonymous"
            className={`absolute inset-0 object-cover ${
              isLargeScreen ? "w-[105%] h-[105%]" : "w-full h-[100vh]"
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
          src={LOGO_PATH}
          alt="Kanha Jungle Logo"
          width="850"
          height="300"
          onLoad={handleImageLoad}
          fetchPriority="high"
          decoding="async"
          loading="eager"
          importance="high"
          className="w-68 sm:w-74 md:w-90 lg:w-96 xl:w-[850px] mx-auto object-contain"
          style={{ contentVisibility: "auto" }}
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
