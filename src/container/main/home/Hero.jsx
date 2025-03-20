import React from 'react';
import { Search, Map, Menu } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute min-w-full min-h-full object-cover"
        >
          <source 
            src="https://player.vimeo.com/external/370467553.sd.mp4?s=96de8b923170ccd7992d1367e4d4f58da19602d3&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="text-white text-2xl font-bold">KANHA</div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-gray-200">Discover</a>
          <a href="#" className="text-white hover:text-gray-200">Protect</a>
          <a href="#" className="text-white hover:text-gray-200">Visit</a>
          <a href="#" className="text-white hover:text-gray-200">Shop</a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-gray-200">
            <Search size={24} />
          </button>
          <button className="text-white hover:text-gray-200">
            <Map size={24} />
          </button>
          <button className="md:hidden text-white hover:text-gray-200">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          KANHA
        </h1>
        <h2 className="text-3xl md:text-4xl font-light text-white tracking-widest mb-8">
          NATIONAL PARK
        </h2>
        
        {/* Location Tag */}
        <div className="absolute bottom-8 left-8 flex items-center text-white">
          <Map size={20} className="mr-2" />
          <span>Madhya Pradesh, India</span>
        </div>

        {/* Photo Credit */}
        <div className="absolute bottom-8 right-8 text-white text-sm">
          © Wildlife India
        </div>
      </main>
    </div>
  );
}

export default App;