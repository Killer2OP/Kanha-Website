import React, { useState, useEffect } from "react";
import { Map } from "lucide-react";
import Header from "../../../components/Header";

function App() {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setVideoSrc(
        window.innerWidth <= 768
          ? "https://video-previews.elements.envatousercontent.com/files/a9e7060d-7228-421d-b720-64d426b8d50f/video_preview_h264.mp4"
          : "../assets/KanhaBg.mp4"
      );
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-Screen Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoSrc && (
          <video
            key={videoSrc}
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50 md:bg-black/40"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-2 sm:mb-4 tracking-wide">
          KANHA
        </h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-jungle text-white tracking-widest mb-6">
          NATIONAL PARK
        </h2>

        {/* Footer Details */}
        <div className="absolute bottom-8 sm:bottom-10 left-6 right-6 flex flex-col sm:flex-row sm:justify-between items-center text-white text-xs sm:text-sm md:text-base">
          <div className="flex items-center mb-6 sm:mb-0">
            <Map size={20} className="mr-2" />
            <span>Madhya Pradesh, India</span>
          </div>
          <div className="text-center sm:text-right">© Wildlife India</div>
        </div>
      </main>
    </div>
  );
}

export default App;
