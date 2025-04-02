"use client";

import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";
import Categories from "@heuvera/components/categories/Categories";
import { PropertyData } from "@heuvera/components/data/PropertyData";
import SearchBar from "@heuvera/components/search/SearchBar";
import { SkeletalPreloader } from "@heuvera/components/skeletalpreloader/propertycards";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Explore() {
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

    // // Instant booking filter
    // if (activeFilters.instantBooking !== undefined) {
    //   result = result.filter(property =>
    //     property.bookingOptions.instantBooking === activeFilters.instantBooking
    //   );
    // }

    // // Self check-in filter
    // if (activeFilters.selfCheckIn !== undefined) {
    //   result = result.filter(property =>
    //     property.bookingOptions.selfCheckIn === activeFilters.selfCheckIn
    //   );
    // }

    setFilteredProperties(result);
  }, [selectedCategory, activeFilters]);

  const removeFilter = (filterKey: keyof typeof activeFilters) => {
    const newFilters = { ...activeFilters };

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

    setActiveFilters(newFilters);
  };

  const renderActiveFilters = () => {
    const filterDisplayMap = {
      priceRange: (val: [number, number]) => `$${val[0]} - $${val[1]}`,
      bedrooms: (val: string) => `${val} Bedrooms`,
      beds: (val: string) => `${val} Beds`,
      bathrooms: (val: string) => `${val} Bathrooms`,
      amenities: (val: string[]) => val.join(", "),
      propertyTypes: (val: string[]) => val.join(", "),
      instantBooking: () => "Instant Booking",
      selfCheckIn: () => "Self Check-in",
    };

    return (
      <div className="flex flex-wrap gap-2 my-2">
        {Object.entries(activeFilters).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0))
            return null;

          const display = filterDisplayMap[
            key as keyof typeof filterDisplayMap
          ]?.(value as any);

          return display ? (
            <div
              key={key}
              className="flex items-center bg-[#f8efe9] rounded-full px-3 py-1 text-xs sm:text-sm"
            >
              <span className="mr-2">{display}</span>
              <button
                onClick={() => removeFilter(key as keyof typeof activeFilters)}
              >
                <X className="h-4 w-4 text-[#8B4513]" />
              </button>
            </div>
          ) : null;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-full w-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20">
      <div className="w-full gap-5 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between">
          <SearchBar isMobile={isMobile} />
        </div>
        <Categories
          onCategorySelect={(category) => setSelectedCategory(category)}
          setActiveFilters={setActiveFilters}
        />

        <div>
          {Object.keys(activeFilters).length > 0 && renderActiveFilters()}
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
          {filteredProperties.map((property) => (
            <motion.div
              key={`property-${property.id}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
