import React from 'react';
import { Map, Trees, Target, Shield, TreePine, Waves, Mountain, Thermometer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="https://sin1.contabostorage.com/d1fa3867924f4c149226431ef8cbe8ee:kanha/geolocation.webp" 
              alt="Kanha Tiger Reserve"
              className=" w-full h-auto object-cover shadow-green-900/30"
            />
          </div>

          {/* Right side - Content */}
          <div className="text-green-50">
            <h1 className="text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'system-ui' }}>
              Geographical Details About Park
            </h1>

            <div className="space-y-6 text-lg">
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Trees className="w-6 h-6 text-green-400" />
                <p>Total Tiger Reserve Area – 2074.31 Square Kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Target className="w-6 h-6 text-green-400" />
                <p>Core/Critical Tiger Habitat – 917.43 Square Kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Shield className="w-6 h-6 text-green-400" />
                <p>Buffer Zone – 1134.31 Square Kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Map className="w-6 h-6 text-green-400" />
                <p>National Park Area – 940 Square Kilometres (including 917.43 sq. km. of critical tiger habitat)</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <TreePine className="w-6 h-6 text-green-400" />
                <p>Location - Maikal ranges of the Satpuras, Mandla and Balaghat districts of Madhya Pradesh</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Mountain className="w-6 h-6 text-green-400" />
                <p>Includes Phen Wildlife Sanctuary (110 sq. km.) - a Satellitic Micro Core</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Thermometer className="w-6 h-6 text-green-400" />
                <p>Known for saving the endangered hard ground barasingha (Cervus duvauceli branderi) from extinction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;