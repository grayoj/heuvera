'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heuvera/components/ui/button';
import { LucideSlidersHorizontal, Search, X } from 'lucide-react';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IoHome } from 'react-icons/io5';
import { LatLngTuple } from 'leaflet';
import {
  Property,
  MapSectionProps,
  MapComponentsProps,
} from '@heuvera/types/map';
import PropertyDetailTray from '../property/PropertyDetailTray';
import { getCenterAndRadius } from '@heuvera/utils/map';
import { FaHome } from 'react-icons/fa';

const MapComponents = dynamic<MapComponentsProps>(
  () => import('./MapComponent'),
  { ssr: false },
);

const properties: Property[] = [
  {
    id: 1,
    name: 'Luxury Apartment',
    price: '$1,200/mo',
    rating: 4.8,
    position: [9.0579, 7.4951] as LatLngTuple,
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format',
    description: 'Modern luxury apartment with panoramic city views.',
    icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    propertyType: 'apartment',
  },
  {
    id: 2,
    name: 'Family House',
    price: '$950/mo',
    rating: 4.5,
    position: [9.06, 7.49] as LatLngTuple,
    image:
      'https://images.unsplash.com/photo-1579656592043-6a47e332b902?q=80&w=1974&auto=format',
    description: 'Cozy family home with a large backyard.',
    icon: <FaHome className="text-sm text-[#7B4F3A]" />,
    propertyType: 'house',
  },
];

export default function MapPageContent({
  properties: propProperties = [],
}: MapSectionProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();

  const displayProperties =
    propProperties.length > 0 ? propProperties : properties;

  const markerPositions = displayProperties
    .filter((property) => {
      if (!property.position) return false;
      if (Array.isArray(property.position)) {
        return (
          property.position.length === 2 &&
          !isNaN(Number(property.position[0])) &&
          !isNaN(Number(property.position[1]))
        );
      } else if (typeof property.position === 'object') {
        const pos = property.position as { lat?: number; lng?: number };
        return (
          pos.lat !== undefined &&
          pos.lng !== undefined &&
          !isNaN(Number(pos.lat)) &&
          !isNaN(Number(pos.lng))
        );
      }
      return false;
    })
    .map((property) => {
      if (Array.isArray(property.position)) {
        return property.position as LatLngTuple;
      } else {
        const pos = property.position as { lat: number; lng: number };
        return [pos.lat, pos.lng] as LatLngTuple;
      }
    });

  const { center, radius } = getCenterAndRadius(markerPositions);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative w-full h-[calc(100vh-15rem)] bg-red-200 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 z-[1000] bg-[#F3F2EC] shadow-sm px-12"
        animate={{
          width: selectedProperty ? '50%' : '100%',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-20 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full hover:bg-[#E3E2D9]"
          >
            <BsArrowLeft className="text-[#898989] text-xl" />
          </Button>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4">
            <div
              className={`relative w-full h-10 bg-[#F8F7F2] border ${
                isSearchFocused ? 'border-[#7B4F3A]' : 'border-[#C4C3B8]'
              } rounded-full flex items-center transition-all duration-300`}
            >
              <div className="flex items-center pl-3 text-[#898989]">
                <Search size={16} />
              </div>
              <input
                className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none text-black placeholder-[#C4C3B8]"
                placeholder="Search properties, locations..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 mr-2"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={14} className="text-[#898989]" />
                </Button>
              )}
            </div>
          </form>

          <Button
            variant="outline"
            className="bg-transparent border border-[#E3E2D9] text-[#3E3E3E] bg-[#F3F2EC] shadow-none text-sm font-serif hover:bg-[#E3E2D9]"
            size="sm"
          >
            <LucideSlidersHorizontal className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="bg-[#F8F7F2] w-screen h-[calc(100vh-15rem)] overflow-hidden flex-grow relative"
        animate={{
          width: selectedProperty ? '50%' : '100%',
        }}
        transition={{ duration: 0.3 }}
      >
        <MapComponents
          center={center}
          properties={displayProperties}
          markerPositions={markerPositions}
          center_radius={center}
          radius={radius}
          isTrayOpen={!!selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
      </motion.div>

      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailTray
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
