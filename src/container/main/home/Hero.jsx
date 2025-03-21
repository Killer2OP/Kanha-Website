import React from "react";
import { Search, Map, Menu } from "lucide-react";
import Header from "../../../components/Header";

const navLinks = ["Discover", "Protect", "Visit", "Shop"];

function App() {
  return (
    <div className="relative min-h-[95vh]">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          muted
          preload="auto" // Helps preloading the video
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://video-previews.elements.envatousercontent.com/files/ebea1fc7-ae5a-4e87-8880-745ea7d5586b/video_preview_h264.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <Header/>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          KANHA
        </h1>
        <h2 className="text-3xl md:text-4xl font-light text-white tracking-widest mb-8">
          NATIONAL PARK
        </h2>

        {/* Footer Details */}
        <div className="absolute bottom-8 left-8 flex items-center text-white">
          <Map size={20} className="mr-2" />
          <span>Madhya Pradesh, India</span>
        </div>
        <div className="absolute bottom-8 right-8 text-white text-sm">
          © Wildlife India
        </div>
      </main>
    </div>
  );
}

export default App;
