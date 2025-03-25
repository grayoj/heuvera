'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, LucideStar } from 'lucide-react';
import { PropertyData } from '@heuvera/components/data/PropertyData';
import FavoritesHeader from '@heuvera/components/header/FavoritesHeader';
import useIsMobile from '@heuvera/hooks/IsMobile';
import PropertyCard from '@heuvera/components/cards/PropertyCards/PropertyCard';
import { Property, ViewMode, SortOption } from '@heuvera/types/map';

export default function Favorites() {
    const isMobile = useIsMobile();
    const [favorites, setFavorites] = useState<Property[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sortOption, setSortOption] = useState<SortOption>('recent');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const sortProperties = (properties: Property[]): Property[] => {
        switch (sortOption) {
            case 'price-low':
                return [...properties].sort(
                    (a, b) =>
                        (a.propertyDetails?.price || 0) - (b.propertyDetails?.price || 0),
                );
            case 'price-high':
                return [...properties].sort(
                    (a, b) =>
                        (b.propertyDetails?.price || 0) - (a.propertyDetails?.price || 0),
                );
            case 'recent':
            default:
                return properties;
        }
    };

    // const handleRemoveFavorite = (propertyId: number | string) => {
    //     setFavorites(prev => prev.filter(property => property.id !== propertyId));
    // };

    // const sortedFavorites = sortProperties(favorites);

    return (
        <div className="flex flex-col flex-1 h-full w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-20">
            {/* Header Section */}
            <div
                className={`
                    w-full 
                    border-b border-[#E3E2D9] 
                    ${isMobile ? 'h-[130px]' : 'h-[130px] md:h-[88px] lg:h-[68px] xl:h-[88px] 2xl:h-[88px] border-t'} 
                    flex items-center 
                    relative 
                `}
            >
                <FavoritesHeader
                    setSortOption={setSortOption}
                    setViewMode={setViewMode}
                    sortOption={sortOption}
                    viewMode={viewMode}
                />
            </div>

            {/* Favorites Grid */}
            {PropertyData.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-[70vh] text-center"
                >
                    <LucideStar size={64} className="text-gray-300 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-600 mb-2">
                        No Favorites Yet
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        Explore amazing properties and mark them as favorites to see them
                        here.
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                >
                    {PropertyData.map((property) => (
                        <motion.div
                            key={property.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="w-full flex justify-center"
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
