import React from 'react';
import { 
  Waves, 
  TreePine, 
  Droplets, 
  Mountain, 
  Landmark, 
  ParkingSquare, 
  Tent,
  Building,
  Info,
  Bath
} from 'lucide-react';

const iconMap = {
  Waves,
  TreePine,
  Droplets,
  Mountain,
  Landmark,
  ParkingSquare,
  Tent,
  Building,
  Info,
  Bath
};

const MapFilters = ({ filters, onFilterChange, onSelectAll }) => {
  const categories = ['Discover', 'Plan'];
  
  return (
    <div className="bg-green-200 p-3 md:p-4 rounded-lg shadow-lg w-full md:w-68 max-h-[300px] md:max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <h1 className="text-lg md:text-xl font-bold">Explore Map</h1>
        <button className="text-sm md:text-base text-gray-600 hover:text-gray-800">Clear</button>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm md:text-base font-semibold text-gray-700">{category}</h2>
            <button
              onClick={() => onSelectAll(category)}
              className="text-xs md:text-sm text-blue-600 hover:text-blue-800"
            >
              Select all
            </button>
          </div>
          
          {filters
            .filter((filter) => 
              category === 'Discover' ? 
                ['forests', 'lakes', 'mountains', 'history', 'visitor_center'].includes(filter.id) : 
                ['parking', 'camping', 'hotels', 'restrooms'].includes(filter.id)
            )
            .map((filter) => {
              const IconComponent = iconMap[filter.icon];
              return (
                <div
                  key={filter.id}
                  className="flex items-center space-x-2 md:space-x-3 mb-2 cursor-pointer"
                  onClick={() => onFilterChange(filter.id)}
                >
                  <div className={`p-1.5 md:p-2 rounded-full ${filter.color}`}>
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700">{filter.name}</span>
                  <div className="flex-grow"></div>
                  <input
                    type="checkbox"
                    checked={filter.selected}
                    onChange={() => onFilterChange(filter.id)}
                    className="form-checkbox h-4 w-4 md:h-5 md:w-5 text-blue-600"
                  />
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default MapFilters;