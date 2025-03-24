'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LatLngTuple } from 'leaflet';
import { IoHome } from 'react-icons/io5';
import { Search, X, MapPin, List, Filter, Heart } from 'lucide-react';
import dynamic from 'next/dynamic';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "../ui/drawer";

import { Button } from '../../components/ui/button';
import { getCenterAndRadius } from '@heuvera/utils/map';
import { Property, MapComponentsProps } from '@heuvera/types/map';

// Dynamically import the MapComponent to avoid SSR issues with Leaflet
const MapComponents = dynamic<MapComponentsProps>(
    () => import('./MapComponent'),
    { ssr: false },
);

// Sample properties data (use your actual data source)
const properties: Property[] = [
    {
        id: 1,
        name: 'Luxury Apartment',
        price: '$1,200/mo',
        rating: 4.8,
        position: [9.0579, 7.4951] as LatLngTuple,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Modern luxury apartment with panoramic city views.',
        icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    },
    // ... (other properties remain the same)
];


interface MapDrawerPageProps {
    properties?: Property[];
}

export default function MapDrawerPage({ properties: propProperties = [] }: MapDrawerPageProps) {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [showListView, setShowListView] = useState<boolean>(true);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const router = useRouter();

    // Use provided properties or fall back to sample data
    const displayProperties = propProperties.length > 0 ? propProperties : properties;

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

    // Calculate map center and radius
    const { center, radius } = getCenterAndRadius(markerPositions);

    // Ensure default values if center is undefined
    const mapCenter = center || [9.0579, 7.4951] as LatLngTuple;
    const mapRadius = radius || 1; // Default radius if not calculated
    return (
        <div className="relative w-full h-screen bg-[#F8F7F2] overflow-hidden">
            {/* Refined Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-subtle"
            >
                <div className="h-16 flex items-center justify-between px-6 md:px-12">
                    {/* Search with Enhanced Interactions */}
                    <motion.form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Searching:', searchQuery);
                        }}
                        className="flex-1 max-w-md mx-4"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className={`
                            relative w-full h-10 
                            ${isSearchFocused
                                ? 'bg-white border-[#7B4F3A] shadow-sm'
                                : 'bg-[#F8F7F2] border-[#E3E2D9]'
                            } 
                            border rounded-full flex items-center transition-all duration-300
                        `}>
                            <div className="flex items-center pl-3 text-[#898989]">
                                <Search size={16} />
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
                                            className="h-6 w-6 mr-2 text-[#898989] hover:bg-[#F0F0F0]"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <X size={14} />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.form>

                    {/* View Toggle and Filter */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="h-10 w-10 rounded-full hover:bg-[#F0F0F0]"
                        >
                            <Filter size={20} className="text-[#7B4F3A]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowListView(!showListView)}
                            className="h-10 w-10 rounded-full hover:bg-[#F0F0F0]"
                        >
                            {showListView ?
                                <MapPin size={20} className="text-[#7B4F3A]" /> :
                                <List size={20} className="text-[#7B4F3A]" />
                            }
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="w-full h-[calc(100vh-64px)] pt-16 flex">
                {/* Refined Property List */}
                {showListView && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-80 h-full bg-white shadow-md overflow-y-auto"
                    >
                        <div className="p-4 border-b border-[#E3E2D9]">
                            <h2 className="font-serif font-bold text-xl text-[#3E3E3E]">
                                Available Properties
                            </h2>
                            <p className="text-sm text-[#6E6E6E] mt-1">
                                {displayProperties.length} properties found
                            </p>
                        </div>

                        <div className="divide-y divide-[#E3E2D9]">
                            {displayProperties.map(property => (
                                <motion.div
                                    key={property.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 hover:bg-[#F8F7F2] cursor-pointer transition-colors group"
                                    onClick={() => {
                                        setSelectedProperty(property);
                                        setIsDrawerOpen(true);
                                    }}
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 bg-white/70 rounded-full hover:bg-white"
                                        >
                                            <Heart size={16} className="text-[#7B4F3A]" />
                                        </Button>
                                    </div>
                                    <h3 className="font-serif font-bold text-[#3E3E3E]">
                                        {property.name}
                                    </h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="font-medium text-[#7B4F3A]">
                                            {property.price}
                                        </p>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span>{property.rating}</span>
                                            <span className="text-yellow-400">★</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Map Container */}
                <div className={`
                    ${showListView ? 'w-[calc(100%-20rem)]' : 'w-full'} 
                    h-full overflow-hidden
                `}>
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

            {/* Property Detail Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-h-[85vh] rounded-t-2xl">
                    <DrawerHeader className="bg-[#F3F2EC] border-b border-[#E3E2D9]">
                        <DrawerTitle className="text-[#3E3E3E] font-serif flex justify-between items-center">
                            <span>{selectedProperty?.name}</span>
                        </DrawerTitle>
                        <DrawerDescription className="text-[#7B4F3A] font-semibold">
                            {selectedProperty?.price}
                        </DrawerDescription>
                    </DrawerHeader>

                    {selectedProperty && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="p-4 bg-white"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                                <img
                                    src={selectedProperty.image}
                                    alt={selectedProperty.name}
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-white/70 rounded-full hover:bg-white"
                                >
                                    <Heart size={20} className="text-[#7B4F3A]" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif font-bold text-lg text-[#3E3E3E]">
                                    {selectedProperty.name}
                                </h3>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <span>{selectedProperty.rating}</span>
                                    <span className="text-yellow-400">★</span>
                                </div>
                            </div>

                            <p className="text-[#6E6E6E] mb-6">
                                {selectedProperty.description}
                            </p>

                            <Button
                                className="w-full bg-[#7B4F3A] hover:bg-[#694332] text-white font-medium"
                            >
                                Book Viewing
                            </Button>
                        </motion.div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}