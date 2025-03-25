'use client';

import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import { divIcon, LatLngTuple } from 'leaflet';
import L from 'leaflet';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import ReactDOMServer from 'react-dom/server';
import { GoHomeFill } from 'react-icons/go';

// Leaflet CSS Import (crucial for map rendering)
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// FitMapToBounds Component
const FitMapToBounds = ({
  positions,
  isTrayOpen,
}: {
  positions: LatLngTuple[];
  isTrayOpen: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds =
        positions.length > 1
          ? new L.LatLngBounds(positions)
          : L.latLngBounds([
              [positions[0][0] - 0.01, positions[0][1] - 0.01],
              [positions[0][0] + 0.01, positions[0][1] + 0.01],
            ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions, isTrayOpen]);

  return null;
};

// MapRecenter Component
const MapRecenter = ({ center }: { center: LatLngTuple }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
};

interface Property {
  id: number;
  name: string;
  price: string;
  rating: number;
  position: LatLngTuple;
  image: string;
  description: string;
  icon: React.ReactNode;
  [key: string]: any;
}

interface MapComponentsProps {
  center: LatLngTuple;
  properties: Property[];
  markerPositions: LatLngTuple[];
  center_radius: LatLngTuple;
  radius: number;
  isTrayOpen: boolean;
  setSelectedProperty: (property: Property | null) => void;
}

const MapComponents = ({
  center,
  properties,
  markerPositions,
  center_radius,
  radius,
  isTrayOpen,
  setSelectedProperty,
}: MapComponentsProps) => {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0 rounded-lg shadow-lg"
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <MapRecenter center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="bg-[#F8F7F2]" // Beige background for the map
        />
        <FitMapToBounds positions={markerPositions} isTrayOpen={isTrayOpen} />

        <Circle
          center={center_radius}
          radius={radius}
          pathOptions={{
            color: 'rgba(123, 79, 58, 0.7)',
            weight: 3,
            fillOpacity: 0.1,
          }}
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={property.position}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
            icon={divIcon({
              className: '',
              html: ReactDOMServer.renderToString(
                <div
                  className="bg-white p-1 rounded-full shadow-md flex items-center justify-center"
                  style={{ width: '32px', height: '32px' }}
                >
                  <GoHomeFill size={20} color="#7B4F3A" />
                </div>,
              ),
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          >
            <Popup
              keepInView={true}
              closeButton={false}
              className="w-48 p-0 m-0"
              eventHandlers={{
                click: () => {
                  // Open property details in a new tab
                  window.open(`/property/${property.id}`, '_blank');
                },
              }}
            >
              <div className="py-1 flex flex-col gap-1 font-serif">
                <Image
                  src={property.image}
                  alt=""
                  height={200}
                  width={200}
                  className="rounded-t-lg"
                />
                <div className="px-2">
                  <h3 className="font-bold text-[#3e3e3e] text-xs">
                    {property.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[10px] text-[#7B4F3A]">
                      {property.price}
                    </h3>
                    <div className="flex flex-row gap-1 items-center text-[10px] font-semibold">
                      {property.rating} <FaStar className="text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponents;
