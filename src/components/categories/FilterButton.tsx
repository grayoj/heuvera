"use client";

import { Button } from "@heuvera/components/ui/button";
import { LucideSlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { FilterModal } from "../FilterModal";

export interface FilterProps {
  priceRange: [number, number];
  bedrooms: string | null;
  beds: string | null;
  bathrooms: string | null;
  amenities: string[];
  propertyTypes: string[];
  instantBooking: boolean;
  selfCheckIn: boolean;
}

interface FilterButtonProps {
  setActiveFilters: React.Dispatch<React.SetStateAction<Partial<FilterProps>>>;
}

const defaultFilters: FilterProps = {
  priceRange: [0, 1000],
  bedrooms: null,
  beds: null,
  bathrooms: null,
  amenities: [],
  propertyTypes: [],
  instantBooking: false,
  selfCheckIn: false,
};

export function FilterButton({ setActiveFilters }: FilterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleApplyFilters = (newFilters: Partial<FilterProps>) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="bg-transparent border border-[#E3E2D9] shadow-none text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base font-serif h-8 sm:h-9 md:h-10 px-3 sm:px-4"
        size="default"
        onClick={() => setIsModalOpen(true)}
      >
        <LucideSlidersHorizontal className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mr-1 sm:mr-2" />
        Filter
      </Button>

      {isModalOpen && (
        <FilterModal
          onApplyFilters={handleApplyFilters}
          initialFilters={defaultFilters}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default FilterButton;
