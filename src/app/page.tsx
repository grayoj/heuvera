"use client";

import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Categories from "@heuvera/components/categories/Categories";
import { PropertyData } from "@heuvera/components/data/PropertyData";
import FilterTags from "@heuvera/components/FilterTags";
import SearchBar from "@heuvera/components/search/SearchBar";
import { SkeletalPreloader } from "@heuvera/components/skeletalpreloader/propertycards";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { MarketplaceProvider } from "@heuvera/providers/MarketplaceProvider";

import { motion } from "framer-motion";
import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";

const Explore = React.memo(() => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(PropertyData);
  const [activeFilters, setActiveFilters] = useState<{
    priceRange?: [number, number];
    bedrooms?: string | null;
    beds?: string | null;
    bathrooms?: string | null;
    amenities?: string[];
    propertyTypes?: string[];
    instantBooking?: boolean;
    selfCheckIn?: boolean;
  }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = PropertyData;

    if (selectedCategory) {
      result = result.filter(
        (property) =>
          property.propertyCategory.toLowerCase() ===
          selectedCategory.toLowerCase(),
      );
    }

    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      result = result.filter(
        (property) =>
          property.propertyDetails.price >= min &&
          property.propertyDetails.price <= max,
      );
    }

    if (activeFilters.propertyTypes && activeFilters.propertyTypes.length > 0) {
      result = result.filter((property) =>
        activeFilters.propertyTypes?.includes(property.propertyCategory),
      );
    }

    if (activeFilters.bedrooms && activeFilters.bedrooms !== "Any") {
      result = result.filter((property) =>
        activeFilters.bedrooms === "5+"
          ? property.propertyDetails.bedrooms >= 5
          : property.propertyDetails.bedrooms ===
          parseInt(activeFilters.bedrooms || "0"),
      );
    }

    if (activeFilters.amenities && activeFilters.amenities.length > 0) {
      result = result.filter((property) =>
        activeFilters.amenities?.every((amenity) =>
          property.amenities.includes(amenity),
        ),
      );
    }

    setFilteredProperties(result);
  }, [selectedCategory, activeFilters]);

  const removeFilter = useCallback((filterKey: keyof typeof activeFilters) => {
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      switch (filterKey) {
        case "priceRange":
          newFilters.priceRange = undefined;
          break;
        case "bedrooms":
          newFilters.bedrooms = undefined;
          break;
        case "beds":
          newFilters.beds = undefined;
          break;
        case "bathrooms":
          newFilters.bathrooms = undefined;
          break;
        case "amenities":
          newFilters.amenities = [];
          break;
        case "propertyTypes":
          newFilters.propertyTypes = [];
          break;
        case "instantBooking":
          newFilters.instantBooking = undefined;
          break;
        case "selfCheckIn":
          newFilters.selfCheckIn = undefined;
          break;
      }

      return newFilters;
    });
  }, []);

  // Column configuration for different screen sizes
  const columnsConfig = {
    sm: 1,
    md: 3,
    lg: 4,
    xl: 5,
    xxl: 6
  };


  // Simple loading placeholders
  const CategoriesPlaceholder = () => (
    <div className="w-full h-[130px] md:h-[88px] lg:h-[68px] xl:h-[88px] 2xl:h-[88px] border-t border-b border-[#E3E2D9] dark:border-[#555555] bg-gray-100 dark:bg-[#333333] animate-pulse"></div>
  );

  const FilterTagsPlaceholder = () => (
    <div className="w-full flex flex-wrap gap-2 my-2">
      <div className="h-8 w-24 bg-gray-200 dark:bg-[#444444] rounded-md animate-pulse"></div>
      <div className="h-8 w-32 bg-gray-200 dark:bg-[#444444] rounded-md animate-pulse"></div>
    </div>
  );


  return (
    <MarketplaceProvider>
      <div className="flex flex-col flex-1 h-full w-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20">
        <div className="w-full gap-5 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between">
            <SearchBar isMobile={isMobile} />
          </div>

          <Categories
            onCategorySelect={setSelectedCategory}
            setActiveFilters={setActiveFilters}
          />

          <div className="w-full flex items-center justify-start">
            {Object.keys(activeFilters).length > 0 && (
              <div className="gap-2 flex items-center">

                <FilterTags
                  activeFilters={activeFilters}
                  removeFilter={removeFilter}
                />

              </div>
            )}
          </div>
        </div>

        {loading ? (
          <SkeletalPreloader />
        ) : (
          <motion.div
            className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-8 justify-center"
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
            {filteredProperties.map((property, index) => (
              <motion.div
                key={`property-${property.id}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <PropertyCard
                  property={property}
                  isPriority={index < 6}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MarketplaceProvider>
  );
});

Explore.displayName = "Explore";

export default Explore;