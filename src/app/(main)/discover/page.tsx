"use client";

import useIsMobile from "@heuvera/hooks/IsMobile";
import { ListingsSection } from "@heuvera/components/sections/ListingSection";
import { FeaturedSection } from "@heuvera/components/sections/FeaturedSection";
import { CategoriesSection } from "@heuvera/components/sections/CategoriesSection";
import { HeaderSection } from "@heuvera/components/sections/HeaderSection";
import { useState } from "react";
import { propertyCategories, propertyLocation } from "@heuvera/app/data/array";

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export const cardAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2 },
  },
};

export default function Discover() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleCategorySelect = (category: string | null) => {
    console.log("Selected category from CategoryList:", category);
  };

  const handlePropertyCategoryClick = (category: string) => {
    setSelectedCategory({ type: "property", name: category });
  };

  const handleLocationClick = (location: string) => {
    setSelectedCategory({ type: "location", name: location });
  };

  const handleCloseFiltered = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 flex flex-col gap-10 md:gap-20">
      <HeaderSection isMobile={isMobile} />
      <CategoriesSection onCategorySelect={handleCategorySelect} />
      {selectedCategory ? (
        <ListingsSection
          selectedCategory={selectedCategory}
          handleCloseFiltered={handleCloseFiltered}
        />
      ) : (
        <FeaturedSection
          propertyCategories={propertyCategories}
          propertyLocation={propertyLocation}
          handlePropertyCategoryClick={handlePropertyCategoryClick}
          handleLocationClick={handleLocationClick}
        />
      )}
    </div>
  );
}
