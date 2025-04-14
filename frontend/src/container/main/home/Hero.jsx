import React, { useState, useEffect, useRef } from "react";
import { Map } from "lucide-react";
import Header from "../../../components/Header";

const LOGO_PATH =
  "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/Jungle1.webp";
const VIDEO_PATH = "https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/KanhaBg.mp4";

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  // Initialize video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Set video attributes
      video.src = VIDEO_PATH;
      video.preload = "auto";
      
      // Event listeners for video
      const handleCanPlay = () => {
        setVideoLoaded(true);
        video.play().catch(error => {
          console.error("Video autoplay failed:", error);
        });
      };

      const handleError = (error) => {
        console.error("Video loading error:", error);
        setVideoLoaded(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Load video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    const debouncedResize = debounce(checkScreenSize, 250);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Debounce utility function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div className="relative w-full md:h-screen h-[75vh] overflow-hidden flex flex-col">
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted
          className={`absolute inset-0 object-cover ${
            isLargeScreen ? "w-[105%] h-[105%]" : "w-full h-[100vh]"
          } ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        >
          <source src={VIDEO_PATH} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Fallback background color while video loads */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`} />
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 md:bg-black/40" />
      </div>

      <Header className="relative z-10" />

      <main className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4 sm:px-8 md:px-12">
        <img
          ref={imageRef}
          src={LOGO_PATH}
          alt="Kanha Jungle Logo"
          width="850"
          height="300"
          onLoad={() => setImageLoaded(true)}
          fetchpriority="high"
          decoding="async"
          loading="eager"
          className="w-68 sm:w-74 md:w-90 lg:w-96 xl:w-[850px] mx-auto object-contain"
          style={{
            contentVisibility: "auto",
            contain: "paint",
          }}
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

