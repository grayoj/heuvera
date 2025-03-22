"use client";

import { useEffect, useState, Dispatch, SetStateAction, ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import { LucideSlidersHorizontal, Search, X } from "lucide-react";
import { LatLngBounds, LatLngTuple } from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@heuvera/components/ui/button";
import { IoBed, IoHome, IoPerson, IoShareSocialOutline } from "react-icons/io5";
import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";
import { PropertyData } from "@heuvera/components/data/PropertyData";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBath, FaStar } from "react-icons/fa";

// Define interface for property type
interface Property {
    id: number;
    name: string;
    price: string;
    rating: number;
    position: LatLngTuple;
    image: string;
    description: string;
    icon: ReactNode;
    [key: string]: any; // For any additional properties
}

// Define props interface for MapComponents
interface MapComponentsProps {
    center: LatLngTuple;
    properties: Property[];
    markerPositions: LatLngTuple[];
    center_radius: LatLngTuple;
    radius: number;
    isTrayOpen: boolean;
    setSelectedProperty: Dispatch<SetStateAction<Property | null>>;
}

// Dynamically import react-leaflet components with no SSR
const MapComponents = dynamic<MapComponentsProps>(
    () => import("./MapComponents"),
    { ssr: false }
);

// Sample property data
const properties: Property[] = [
    {
        id: 1,
        name: "Luxury Apartment",
        price: "$1,200/mo",
        rating: 4.8,
        position: [9.0579, 7.4951] as LatLngTuple,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Modern luxury apartment with panoramic city views.",
        icon: <IoHome className="text-sm text-[#7B4F3A]" />
    },
    {
        id: 2,
        name: "Modern Duplex",
        price: "$2,500/mo",
        rating: 4.6,
        position: [9.065, 7.497] as LatLngTuple,
        image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Spacious modern duplex in a prime location.",
        icon: <IoHome className="text-sm text-[#7B4F3A]" />
    },
];

const getCenterAndRadius = (locations: LatLngTuple[]) => {
    if (locations.length === 0) {
        // Default values if no locations
        return {
            center: [9.0579, 7.4951] as LatLngTuple,
            radius: 1000
        };
    }

    const avgLat = locations.reduce((sum, pos) => sum + pos[0], 0) / locations.length;
    const avgLng = locations.reduce((sum, pos) => sum + pos[1], 0) / locations.length;

    // Find the max distance from the center and slightly increase it
    const maxDistance = Math.max(
        ...locations.map((pos) => Math.sqrt((pos[0] - avgLat) ** 2 + (pos[1] - avgLng) ** 2))
    );

    return {
        center: [avgLat, avgLng] as LatLngTuple,
        radius: maxDistance * 111000 * 1.2, // Increase by 20%
    };
};

// Property Detail Tray Component
const PropertyDetailTray = ({ property, onClose }: { property: Property, onClose: () => void }) => {
    const router = useRouter();
    
    const goToDetails = () => {
        router.push(`/explore/${property.id}`);
    };
    
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 bottom-0 h-[calc(100vh-6rem)] w-1/2 bg-[#F3F2EC] shadow-lg z-[1000] overflow-y-auto"
        >
            <div className="sticky top-0 z-10 bg-[#F3F2EC] flex justify-between items-center p-5 border-b border-[#E3E2D9]">
                <h2 className="text-xl font-serif font-semibold text-[#3E3E3E]">Property Details</h2>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="rounded-full hover:bg-[#E3E2D9]"
                >
                    <X className="h-5 w-5 text-[#3E3E3E]" />
                </Button>
            </div>
            
            <div className="w-full p-5 flex flex-col gap-6">
                {PropertyData.length > 0 && (
                    <div className="w-full flex flex-col gap-6">
                        {/* Image Section */}
                        <div className="w-full h-80 rounded-3xl overflow-hidden">
                            <Image
                                src={PropertyData[0].images[0]}
                                alt="Property Image"
                                className="w-full h-full object-cover"
                                height={500}
                                width={500}
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full rounded-2xl flex flex-col gap-4">
                            <div className="flex flex-row justify-between items-center">
                                <div className="cursor-pointer flex flex-row gap-2 items-center">
                                    <h1 className="text-base font-serif text-[#898989]">Island</h1>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Button variant="ghost" size="sm" className="flex gap-2 items-center text-[#898989] hover:bg-[#E3E2D9]">
                                        <span className="text-sm">Share</span>
                                        <IoShareSocialOutline className="text-lg" />
                                    </Button>
                                </div>
                            </div>
                            
                            <h1 className="text-2xl font-serif font-semibold text-[#3E3E3E]">{PropertyData[0].propertyName}</h1>
                            
                            <div className="flex flex-row gap-2 items-center">
                                <h1 className="text-lg font-medium font-serif text-[#323232]">4.5</h1>
                                <div className="flex flex-row">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-lg" />
                                    ))}
                                </div>
                            </div>
                            
                            <p className="text-base font-serif font-normal text-[#3E3E3E]">{PropertyData[0].propertyDetails.location}</p>
                            
                            <div className="flex flex-row gap-5 py-2 border-y border-[#E3E2D9]">
                                <div className="gap-1 flex items-center">
                                    <IoBed className="text-[#6A6A6A] text-lg" />
                                    <h1 className="text-[#6A6A6A] text-sm font-serif">3 Bedrooms</h1>
                                </div>
                                <div className="border-r border-[#C4C3B8]" />
                                <div className="gap-1 flex items-center">
                                    <FaBath className="text-[#6A6A6A] text-lg" />
                                    <h1 className="text-[#6A6A6A] text-sm font-serif">5 Bathrooms</h1>
                                </div>
                                <div className="border-r border-[#C4C3B8]" />
                                <div className="gap-1 flex items-center">
                                    <IoPerson className="text-[#6A6A6A] text-lg" />
                                    <h1 className="text-[#6A6A6A] text-sm font-serif">4 Guests</h1>
                                </div>
                            </div>
                            
                            <p className="text-base font-serif font-normal text-[#3E3E3E] py-2">{PropertyData[0].propertyDescription}</p>
                            
                            <h1 className="text-2xl text-[#3F3B2B] font-semibold font-serif">
                                ₦{PropertyData[0].propertyDetails.price}
                                <span className="text-sm text-[#3E3E3E] font-serif font-normal"> /night</span>
                            </h1>
                            
                            <Button 
                                className="w-full h-12 rounded-full bg-[#7B4F3A] hover:bg-[#6A432F] transition-colors"
                                onClick={goToDetails}
                            >
                                Show Details
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5 mt-4">
                <h3 className="text-lg font-serif font-semibold text-[#3E3E3E] mb-4">Similar Properties</h3>
                <div className="w-full flex overflow-x-auto gap-4 pb-4">
                    {PropertyData.map((property, index) => (
                        <div key={index} className="min-w-64 flex-shrink-0">
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

interface MapSectionProps {
    properties?: Property[];
    isTrayOpen?: boolean;
}

export default function MapSection({ properties: propProperties = [], isTrayOpen = false }: MapSectionProps) {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const router = useRouter();

    // Use the passed properties or fallback to the sample data
    const displayProperties = propProperties.length > 0 ? propProperties : properties;

    // Filter and extract valid positions for the map
    const markerPositions = displayProperties
        .filter((property) => {
            // First, ensure position exists
            if (!property.position) return false;

            // Handle array positions
            if (Array.isArray(property.position)) {
                return property.position.length === 2 &&
                    !isNaN(Number(property.position[0])) &&
                    !isNaN(Number(property.position[1]));
            }
            // Handle object positions with lat/lng properties
            else if (typeof property.position === 'object') {
                // Use type assertion to allow property access
                const pos = property.position as { lat?: number, lng?: number };
                return pos.lat !== undefined &&
                    pos.lng !== undefined &&
                    !isNaN(Number(pos.lat)) &&
                    !isNaN(Number(pos.lng));
            }
            return false;
        })
        .map((property) => {
            // Convert to LatLngTuple format
            if (Array.isArray(property.position)) {
                return property.position as LatLngTuple;
            } else {
                // Use type assertion to allow property access
                const pos = property.position as { lat: number, lng: number };
                return [pos.lat, pos.lng] as LatLngTuple;
            }
        });

    const { center, radius } = getCenterAndRadius(markerPositions);

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Handle search submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search logic here
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Header Bar with Search - Animates when tray opens */}
            <motion.div 
                className="absolute top-0 left-0 right-0 z-[1000] bg-[#F3F2EC] shadow-sm"
                animate={{
                    width: selectedProperty ? "50%" : "100%",
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
                    
                    <form 
                        onSubmit={handleSearchSubmit}
                        className="flex-1 max-w-md mx-4"
                    >
                        <div className={`relative w-full h-10 bg-[#F8F7F2] border ${isSearchFocused ? 'border-[#7B4F3A]' : 'border-[#C4C3B8]'} rounded-full flex items-center transition-all duration-300`}>
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
                                    onClick={() => setSearchQuery("")}
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

            {/* Map Container - Animates when property is selected */}
            <motion.div
                className="absolute top-20 left-0 bottom-0 bg-[#F8F7F2]"
                animate={{
                    width: selectedProperty ? "50%" : "100%",
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

            {/* Property Detail Tray */}
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