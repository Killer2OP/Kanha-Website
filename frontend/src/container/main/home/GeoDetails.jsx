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
              src="https://african-safari.sites.motocms.com/res/62625786d6eae90022049e05/6274f806015ea20022fe5da7_optimized_1104.webp" 
              alt="African Safari"
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
                <p>Total Forest Area – 940 Square Kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Target className="w-6 h-6 text-green-400" />
                <p>Core Area – 940 square kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Shield className="w-6 h-6 text-green-400" />
                <p>Buffer area – 1067 Square kilometres</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <TreePine className="w-6 h-6 text-green-400" />
                <p>Type of forest - Moist Deciduous Forest, Dry Deciduous Forest</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Waves className="w-6 h-6 text-green-400" />
                <p>Rivers - Banjar River</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Mountain className="w-6 h-6 text-green-400" />
                <p>Hills - valley meadow and plateau meadow</p>
              </div>
              
              <div className="flex items-center gap-4 hover:bg-green-900/30 p-2 rounded-lg transition-colors">
                <Thermometer className="w-6 h-6 text-green-400" />
                <p>Temperature - extreme- hot and dry (April-June) – max temperature- 43° C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;