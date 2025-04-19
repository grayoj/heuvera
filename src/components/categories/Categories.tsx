"use client";

import { useRouter } from "next/navigation";
import MapButton from "./MapButton";
import FilterButton from "./FilterButton";
import LeaseRentStays from "./LeaseRentStays";
import CategoryList from "./CategoryList";
import useIsMobile from "@heuvera/hooks/IsMobile";
import React, { useCallback } from "react";

interface CategoriesProps {
  onCategorySelect: (category: string | null) => void;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange?: [number, number];
      bedrooms?: string | null;
      beds?: string | null;
      bathrooms?: string | null;
      amenities?: string[];
      propertyTypes?: string[];
      instantBooking?: boolean;
      selfCheckIn?: boolean;
    }>
  >;
}

const Categories = React.memo(
  ({ onCategorySelect, setActiveFilters }: CategoriesProps) => {
    const router = useRouter();
    const isMobile = useIsMobile();

    const toMap = useCallback(() => {
      router.push("/explore/map");
    }, [router]);

    return (
      <div
        className={`w-full border-b border-[#E3E2D9] dark:border-[#555555] ${
          isMobile
            ? "h-[130px]"
            : "h-[130px] md:h-[88px] lg:h-[68px] xl:h-[88px] 2xl:h-[88px] border-t"
        } flex items-center`}
      >
        {isMobile ? (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4 md:gap-0">
              <MapButton onClick={toMap} />
              <LeaseRentStays />
              <FilterButton setActiveFilters={setActiveFilters} />
            </div>
            <CategoryList onCategorySelect={onCategorySelect} />
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-2 min-w-0 flex-nowrap">
            <div className="">
              <MapButton onClick={toMap} />
            </div>

            <div className="h-8 border-[#E3E2D9] dark:border-[#555555] border-l" />

            <div className="min-w-0 overflow-hidden">
              <CategoryList onCategorySelect={onCategorySelect} />
            </div>

            <div className="h-8 border-[#E3E2D9] dark:border-[#555555] border-l" />

            <div className="">
              <FilterButton setActiveFilters={setActiveFilters} />
            </div>
          </div>
        )}
      </div>
    );
  },
);

Categories.displayName = "Categories";

export default Categories;
