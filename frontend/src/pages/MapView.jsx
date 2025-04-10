import React, { useState } from 'react';
import MapFilters from '../components/MapFilters';
import MapView from '../components/Map';
import Header from '../components/Header';

const initialFilters = [
  // Removed coast since it's not used in any locations
  { id: 'forests', name: 'Forests', icon: 'TreePine', color: 'bg-green-500', selected: true },
  { id: 'lakes', name: 'Lakes and Rivers', icon: 'Droplets', color: 'bg-blue-500', selected: true },
  { id: 'mountains', name: 'Mountain Ranges', icon: 'Mountain', color: 'bg-green-700', selected: true },
  { id: 'history', name: 'History and Heritage', icon: 'Landmark', color: 'bg-gray-500', selected: true },
  { id: 'parking', name: 'Car Parks', icon: 'ParkingSquare', color: 'bg-blue-400', selected: true },
  { id: 'camping', name: 'Camping', icon: 'Tent', color: 'bg-orange-500', selected: true },
  { id: 'hotels', name: 'Accommodations', icon: 'Building', color: 'bg-purple-500', selected: true }, // Added hotels
];

const sampleLocations = [
  {
    id: '1',
    name: 'Kanha National Park Core Zone',
    type: 'forests',
    coordinates: [22.2777, 80.6199],
    description: 'Famous for its tigers and diverse wildlife'
  },
  {
    id: '2',
    name: 'Mukki Gate',
    type: 'parking',
    coordinates: [22.1647, 80.5647],
    description: 'Main entrance to Kanha National Park'
  },
  {
    id: '3',
    name: 'Bamni Dadar',
    type: 'mountains',
    coordinates: [22.2696, 80.5799],
    description: 'Sunset Point with panoramic views'
  },
  {
    id: '4',
    name: 'Kanha Museum',
    type: 'history',
    coordinates: [22.2747, 80.6299],
    description: 'Natural history and conservation exhibits'
  },
  {
    id: '5',
    name: 'Shravan Tal',
    type: 'lakes',
    coordinates: [22.2877, 80.6099],
    description: 'Ancient lake with rich biodiversity'
  },
  {
    id: '6',
    name: 'Safari Camp',
    type: 'camping',
    coordinates: [22.2577, 80.6399],
    description: 'Eco-friendly camping facilities'
  },
  {
    id: '7',
    name: 'Kanha Zone',
    type: 'parking',
    coordinates: [22.2747, 80.6139],
    description: 'Main entrance to the Kanha Zone'
  },
  {
    id: '8',
    name: 'Kisli Zone',
    type: 'parking',
    coordinates: [22.2644, 80.5700],
    description: 'Popular entrance with high tiger sighting probability'
  },
  {
    id: '9',
    name: 'Sarhi Zone',
    type: 'parking',
    coordinates: [22.3396, 80.3776],
    description: 'Less crowded entrance to the northern section'
  },
  {
    id: '10',
    name: 'Kanha Earth Lodge',
    type: 'hotels',
    coordinates: [22.2876, 80.5913],
    description: 'Eco-friendly luxury lodge near Kanha Zone'
  },
  {
    id: '11',
    name: 'Singinawa Jungle Lodge',
    type: 'hotels',
    coordinates: [22.1802, 80.5654],
    description: 'Premium safari lodge near Mukki Zone'
  },
  {
    id: '12',
    name: 'Banjaar Tola Tented Camp',
    type: 'hotels',
    coordinates: [22.1688, 80.5773],
    description: 'Luxury tented safari camp by Taj Hotels'
  },
  {
    id: '13',
    name: 'Tuli Tiger Resort',
    type: 'hotels',
    coordinates: [22.2702, 80.6023],
    description: 'Wildlife resort with pool and spa facilities'
  },
  {
    id: '14',
    name: 'Sravantal Lake',
    type: 'lakes',
    coordinates: [22.2546, 80.6310],
    description: 'Historic lake with opportunities for wildlife sightings'
  },
  {
    id: '15',
    name: 'Sondar Tank',
    type: 'lakes',
    coordinates: [22.2293, 80.5631],
    description: 'Water body frequented by wild animals'
  },
  {
    id: '16',
    name: 'Ancient Temple Ruins',
    type: 'history',
    coordinates: [22.2331, 80.5891],
    description: 'Archaeological remains of ancient temples'
  },
  {
    id: '17',
    name: 'Mukki Buffer Zone Camping',
    type: 'camping',
    coordinates: [22.1583, 80.5832],
    description: 'Permitted camping area in the buffer zone'
  },
  {
    id: '18',
    name: 'Phen Wildlife Sanctuary Camping',
    type: 'camping',
    coordinates: [22.0890, 80.4912],
    description: 'Camping area near the adjacent Phen sanctuary'
  },
  {
    id: '19',
    name: 'Kanha Meadows',
    type: 'forests',
    coordinates: [22.2810, 80.5500],
    description: 'Vast grasslands where herds of deer and barasingha gather'
  },
  {
    id: '20',
    name: 'Barasingha Plateau',
    type: 'forests',
    coordinates: [22.2619, 80.5421],
    description: 'Home to the rare hard-ground barasingha deer'
  },
  {
    id: '21',
    name: 'Sonph Watchtower',
    type: 'mountains',
    coordinates: [22.2342, 80.5730],
    description: 'Elevated viewing platform for wildlife spotting'
  }
];

const parkData = {
  kanha: {
    name: 'Kanha National Park',
    center: [22.2777, 80.6199],
    zoom: 12
  },
  pench: {
    name: 'Pench National Park',
    center: [21.7519, 79.3177],
    zoom: 12
  },
  bandhavgarh: {
    name: 'Bandhavgarh National Park',
    center: [23.7215, 81.0428],
    zoom: 12
  }
};

const allLocations = {
  kanha: sampleLocations,
  pench: [
    {
      id: 'p1',
      name: 'Pench Tiger Reserve Core Zone',
      type: 'forests',
      coordinates: [21.7519, 79.3177],
      description: 'Main area of Pench Tiger Reserve'
    },
    {
      id: 'p2',
      name: 'Turia Gate',
      type: 'parking',
      coordinates: [21.7892, 79.3365],
      description: 'Main entrance to Pench National Park'
    },
    {
      id: 'p3',
      name: 'Pench Valley Resort',
      type: 'hotels',
      coordinates: [21.7923, 79.3401],
      description: 'Luxury wildlife resort'
    },
    {
      id: 'p4',
      name: 'Wolf Sanctuary',
      type: 'forests',
      coordinates: [21.7654, 79.3298],
      description: 'Protected area for Indian wolves'
    },
    {
      id: 'p5',
      name: 'Kohka Lake',
      type: 'lakes',
      coordinates: [21.7712, 79.3188],
      description: 'Natural water body attracting various wildlife'
    }
  ],
  bandhavgarh: [
    {
      id: 'b1',
      name: 'Bandhavgarh Fort',
      type: 'history',
      coordinates: [23.7215, 81.0428],
      description: 'Ancient fort with historical significance'
    },
    {
      id: 'b2',
      name: 'Tala Gate',
      type: 'parking',
      coordinates: [23.7081, 81.0289],
      description: 'Main entrance to Bandhavgarh National Park'
    },
    {
      id: 'b3',
      name: 'Kings Lodge',
      type: 'hotels',
      coordinates: [23.7145, 81.0356],
      description: 'Premium wildlife lodge'
    },
    {
      id: 'b4',
      name: 'Chakradhara Meadows',
      type: 'forests',
      coordinates: [23.7183, 81.0367],
      description: 'Prime tiger spotting location'
    },
    {
      id: 'b5',
      name: 'Climbers Point',
      type: 'mountains',
      coordinates: [23.7234, 81.0445],
      description: 'Elevated viewpoint for wildlife watching'
    }
  ]
};

function MapViewPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedPark, setSelectedPark] = useState('kanha');
  const [locations] = useState(allLocations);

  const handleFilterChange = (filterId) => {
    setFilters(filters.map(filter => 
      filter.id === filterId ? { ...filter, selected: !filter.selected } : filter
    ));
  };

  const handleSelectAll = (category) => {
    const categoryFilters = filters.filter(filter => 
      category === 'Discover' ? 
        ['forests', 'lakes', 'mountains', 'history'].includes(filter.id) : 
        ['parking', 'camping', 'hotels'].includes(filter.id) // Added hotels to Plan category
    );
    
    const areAllSelected = categoryFilters.every(filter => filter.selected);
    
    setFilters(filters.map(filter => {
      if (category === 'Discover' && ['forests', 'lakes', 'mountains', 'history'].includes(filter.id)) {
        return { ...filter, selected: !areAllSelected };
      }
      if (category === 'Plan' && ['parking', 'camping', 'hotels'].includes(filter.id)) { // Added hotels to Plan category
        return { ...filter, selected: !areAllSelected };
      }
      return filter;
    }));
  };

  const filteredLocations = locations[selectedPark].filter(location =>
    filters.find(filter => filter.id === location.type)?.selected
  );

  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 right-0 h-16 bg-black/50"></div>
      <Header />
      
      <div className="absolute inset-0 flex flex-col md:flex-row translate-y-21">
        <div className="w-full md:w-auto p-2 md:p-4 z-10">
          {/* Park Selector */}
          <div className="bg-emerald-700/80 p-3 md:p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg text-neutral-50 font-bold mb-2">Select National Park</h2>
            <select 
              value={selectedPark}
              onChange={(e) => setSelectedPark(e.target.value)}
              className="w-full p-2 border rounded-md bg-emerald-500/80"
            >
              <option value="kanha" className="bg-emerald-800" >Kanha National Park</option>
              <option value="pench" className="bg-emerald-800">Pench National Park</option>
              <option value="bandhavgarh" className="bg-emerald-800">Bandhavgarh National Park</option>
            </select>
          </div>
          
          <MapFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSelectAll={handleSelectAll}
          />
        </div>
        <div className="flex-1 h-[calc(100vh-200px)] md:h-auto">
          <MapView
            locations={filteredLocations}
            center={parkData[selectedPark].center}
            zoom={parkData[selectedPark].zoom}
          />
        </div>
      </div>
    </div>
  );
}

export default MapViewPage;