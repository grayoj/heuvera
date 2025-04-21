"use client";

import { useState, useCallback, Suspense } from "react";
import useIsMobile from "@heuvera/hooks/IsMobile";
import dynamic from "next/dynamic";
import { propertyCategories, propertyLocation } from "@heuvera/app/data/array";
import { memo } from "react";
import { HeaderSection } from "@heuvera/components/sections/HeaderSection";
import { CategoriesSection } from "@heuvera/components/sections/CategoriesSection";

const ListingsSection = dynamic(
  () => import("@heuvera/components/sections/ListingSection").then(mod => ({ default: mod.ListingsSection })),
  { loading: () => null }
);

const FeaturedSection = dynamic(
  () => import("@heuvera/components/sections/FeaturedSection").then(mod => ({ default: mod.FeaturedSection })),
  { loading: () => null }
);

const Discover = memo(function Discover() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<{
    type: string;
    name: string;
  } | null>(null);

  const handleCategorySelect = useCallback((category: string | null) => {
    console.log("Selected category from CategoryList:", category);
  }, []);

  const handlePropertyCategoryClick = useCallback((category: string) => {
    setSelectedCategory({ type: "property", name: category });
  }, []);

  const handleLocationClick = useCallback((location: string) => {
    setSelectedCategory({ type: "location", name: location });
  }, []);

  const handleCloseFiltered = useCallback(() => {
    setSelectedCategory(null);
  }, []);

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
});

export default Discover;