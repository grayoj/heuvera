'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LatLngTuple } from 'leaflet';
import { BsArrowLeft } from 'react-icons/bs';
import { LucideSlidersHorizontal, Search, X, MapPin, List } from 'lucide-react';
import { IoHome } from 'react-icons/io5';
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
        image:
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Modern luxury apartment with panoramic city views.',
        icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    },
    {
        id: 2,
        name: 'Modern Duplex',
        price: '$2,500/mo',
        rating: 4.6,
        position: [9.065, 7.497] as LatLngTuple,
        image:
            'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Spacious modern duplex in a prime location.',
        icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    },
    {
        id: 3,
        name: 'Cozy Studio',
        price: '$800/mo',
        rating: 4.3,
        position: [9.059, 7.489] as LatLngTuple,
        image:
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Compact and comfortable studio apartment in the city center.',
        icon: <IoHome className="text-sm text-[#7B4F3A]" />,
    },
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
    const router = useRouter();

    // Use provided properties or fall back to sample data
    const displayProperties = propProperties.length > 0 ? propProperties : properties;

    // Open drawer when a property is selected
    useEffect(() => {
        if (selectedProperty) {
            setIsDrawerOpen(true);
        }
    }, [selectedProperty]);

    // Handle drawer close
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        // Delay clearing the selected property to allow for smooth animation
        setTimeout(() => {
            setSelectedProperty(null);
        }, 300);
    };

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

    // Handle search functionality
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const toggleView = () => {
        setShowListView(!showListView);
    };

    return (
        <div className="relative w-full h-screen bg-[#F8F7F2] overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-[1000] bg-[#F3F2EC] shadow-sm">
                <div className="h-16 flex items-center justify-between px-6 md:px-12">
                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4">
                        <div
                            className={`relative w-full h-10 bg-[#F8F7F2] border ${isSearchFocused ? 'border-[#7B4F3A]' : 'border-[#C4C3B8]'
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
                        variant="ghost"
                        size="icon"
                        onClick={toggleView}
                        className="h-10 w-10 rounded-full"
                    >
                        {showListView ? <MapPin size={20} className="text-[#7B4F3A]" /> : <List size={20} className="text-[#7B4F3A]" />}
                    </Button>
                </div>
            </div>

            <div className="w-full h-[calc(100vh-16px)] pt-16 flex">
                {/* Property List Panel */}
                {showListView && (
                    <div className="w-80 h-full bg-white shadow-md overflow-y-auto">
                        <div className="p-4 border-b border-[#E3E2D9]">
                            <h2 className="font-serif font-bold text-[#3E3E3E]">Available Properties</h2>
                            <p className="text-sm text-[#6E6E6E]">{displayProperties.length} properties found</p>
                        </div>
                        
                        <div className="divide-y divide-[#E3E2D9]">
                            {displayProperties.map(property => (
                                <div 
                                    key={property.id} 
                                    className="p-4 hover:bg-[#F8F7F2] cursor-pointer transition-colors"
                                    onClick={() => setSelectedProperty(property)}
                                >
                                    <div className="aspect-video overflow-hidden rounded-lg mb-2">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-serif font-bold text-[#3E3E3E]">{property.name}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="font-medium text-[#7B4F3A]">{property.price}</p>
                                        <div className="flex items-center gap-1 text-sm">
                                            <span>{property.rating}</span>
                                            <span className="text-yellow-400">★</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Map Container */}
                <div className={`${showListView ? 'w-[calc(100%-20rem)]' : 'w-full'} h-full overflow-hidden`}>
                    <MapComponents
                        center={center}
                        properties={displayProperties}
                        markerPositions={markerPositions}
                        center_radius={center}
                        radius={radius}
                        isTrayOpen={isDrawerOpen}
                        setSelectedProperty={setSelectedProperty}
                    />
                </div>
            </div>

            {/* Property Detail Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-h-[85vh] rounded-t-xl">
                    <DrawerHeader className="bg-[#F3F2EC] border-b border-[#E3E2D9]">
                        <DrawerTitle className="text-[#3E3E3E] font-serif flex justify-between items-center">
                            <span>{selectedProperty?.name}</span>
                            {/* <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDrawerClose}
                                className="h-8 w-8 rounded-full"
                            >
                                <X size={18} className="text-[#898989]" />
                            </Button> */}
                        </DrawerTitle>
                        <DrawerDescription className="text-[#7B4F3A] font-semibold">
                            {selectedProperty?.price}
                        </DrawerDescription>
                    </DrawerHeader>

                    {selectedProperty && (
                        <div className="p-4 bg-white">
                            <div className="aspect-video overflow-hidden rounded-lg mb-4">
                                <img
                                    src={selectedProperty.image}
                                    alt={selectedProperty.name}
                                    className="w-full h-full object-cover"
                                />
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

                            {/* <Button
                                className="w-full bg-[#7B4F3A] hover:bg-[#694332] text-white font-medium"
                            >
                                Book Viewing
                            </Button> */}
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}