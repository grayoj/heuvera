"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LatLngTuple } from "leaflet";
import { IoHome } from "react-icons/io5";
import {
  Search,
  X,
  MapPin,
  List,
  Filter,
  Heart,
  LucideSearch,
} from "lucide-react";
import dynamic from "next/dynamic";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

import { Button } from "../../components/ui/button";
import { getCenterAndRadius } from "@heuvera/utils/map";
import { Property, MapComponentsProps } from "@heuvera/types/map";
import CategoryList from "../categories/CategoryList";
import FilterButton from "../categories/FilterButton";
import { FaHome } from "react-icons/fa";
import useIsMobile from "@heuvera/hooks/IsMobile";

const MapComponents = dynamic(() => import("./MapComponent"), {
  loading: () => null,
  ssr: false,
}) as React.ComponentType<MapComponentsProps>;

// Sample properties data (use your actual data source)
const properties: Property[] = [
  {
    id: 1,
    name: "Luxury Apartment",
    price: "$1,200/mo",
    rating: 4.8,
    position: [9.0579, 7.4951] as LatLngTuple,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format",
    description: "Modern luxury apartment with panoramic city views.",
    icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    propertyType: "apartment",
  },
  {
    id: 2,
    name: "Family House",
    price: "$950/mo",
    rating: 4.5,
    position: [9.06, 7.49] as LatLngTuple,
    image:
      "https://images.unsplash.com/photo-1579656592043-6a47e332b902?q=80&w=1974&auto=format",
    description: "Cozy family home with a large backyard.",
    icon: <FaHome className="text-sm text-[#7B4F3A]" />,
    propertyType: "house",
  },
];

interface MapDrawerPageProps {
  properties?: Property[];
}

export default function MapDrawerPage({
  properties: propProperties = [],
}: MapDrawerPageProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  // Use provided properties or fall back to sample data
  const displayProperties =
    propProperties.length > 0 ? propProperties : properties;

  // Filter and map marker positions
  const markerPositions = displayProperties
    .filter((property) => {
      if (!property.position) return false;
      if (Array.isArray(property.position)) {
        return (
          property.position.length === 2 &&
          !isNaN(Number(property.position[0])) &&
          !isNaN(Number(property.position[1]))
        );
      } else if (typeof property.position === "object") {
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

  // Calculate map center and radius
  const { center, radius } = getCenterAndRadius(markerPositions);

  // Ensure default values if center is undefined
  const mapCenter = center || ([9.0579, 7.4951] as LatLngTuple);
  const mapRadius = radius || 1; // Default radius if not calculated

  return (
    <div className="relative w-full h-screen bg-[#F8F7F2] flex flex-col">
      {/* Responsive Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-[1000] bg-white shadow-subtle w-full"
      >
        <div className="container mx-auto w-full py-4 flex flex-col items-center justify-between space-x-4 px-4">
          {/* Search Input */}
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex-grow flex justify-center">
              <motion.form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Searching:", searchQuery);
                }}
                className="w-full max-w-80"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`
                    relative w-full h-10 
                    ${
                      isSearchFocused
                        ? "bg-white border-[#7B4F3A] shadow-sm"
                        : "bg-[#F8F7F2] border-[#E3E2D9]"
                    } 
                    border rounded-full flex items-center transition-all duration-300
                `}
                >
                  <div className="flex items-center pl-3 text-[#898989]">
                    <LucideSearch size={16} />
                  </div>
                  <input
                    className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none 
                    text-[#3E3E3E] placeholder-[#A0A0A0]"
                    placeholder="Search properties, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setSearchQuery("")}
                          asChild
                        >
                          <div>
                            <X size={16} />
                          </div>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            </div>

            <div className="">
              <FilterButton />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full-Screen Map */}
      <div className="flex-grow relative w-full h-[calc(100vh-4rem)]">
        <MapComponents
          center={mapCenter}
          properties={displayProperties}
          markerPositions={markerPositions}
          center_radius={mapCenter}
          radius={mapRadius}
          isTrayOpen={isDrawerOpen}
          setSelectedProperty={setSelectedProperty}
        />
      </div>
    </div>
  );
}
