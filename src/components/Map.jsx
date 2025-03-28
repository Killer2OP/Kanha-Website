import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Create custom icons for different categories
const createCustomIcon = (color) => {
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Map of category types to colors
const categoryIcons = {
  forests: createCustomIcon('green'),
  lakes: createCustomIcon('blue'),
  mountains: createCustomIcon('green'),
  history: createCustomIcon('grey'),
  parking: createCustomIcon('blue'),
  camping: createCustomIcon('orange'),
  hotels: createCustomIcon('violet'),
  // Default icon for any unmapped categories
  default: new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

const MapView = ({ locations = [], center = [22.2777, 80.6199], zoom = 12 }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full rounded-lg"
      style={{ height: '100%', minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations && locations.length > 0 && locations.map((location) => (
        <Marker
          key={location.id}
          position={location.coordinates}
          icon={categoryIcons[location.type] || categoryIcons.default}
        >
          <Popup>
            <div className="p-2">
              <h3 className="text-sm md:text-base font-bold mb-1">{location.name}</h3>
              {location.description && <p className="text-xs md:text-sm">{location.description}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;