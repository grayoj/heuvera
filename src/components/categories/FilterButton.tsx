'use client';

import { Button } from '@heuvera/components/ui/button';
import { LucideSlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { FilterModal } from '../filtermodal';

interface FilterButtonProps {
  setActiveFilters: (filters: {
    priceRange: [number, number];
    bedrooms: string | null;
    beds: string | null;
    bathrooms: string | null;
    amenities: string[];
    propertyTypes: string[];
    instantBooking: boolean;
    selfCheckIn: boolean;
  }) => void;
}
type FilterProps = {
  priceRange: [number, number];
  bedrooms: string | null;
  beds: string | null;
  bathrooms: string | null;
  amenities: string[];
  propertyTypes: string[];
  instantBooking: boolean;
  selfCheckIn: boolean;
};

export function FilterButton({ setActiveFilters }: FilterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyFilters = (newFilters: FilterProps) => {
    setActiveFilters(newFilters); // Now updates Explore's state
    setIsModalOpen(false);
  };
  const [filters, setFilters] = useState<{
    priceRange: [number, number];
    bedrooms: string | null;
    beds: string | null;
    bathrooms: string | null;
    amenities: string[];
    propertyTypes: string[];
    instantBooking: boolean;
    selfCheckIn: boolean;
  } | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button
        variant="outline"
        className="bg-transparent border border-[#E3E2D9] shadow-none text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base font-serif h-8 sm:h-9 md:h-10 px-3 sm:px-4"
        size="default"
        onClick={handleOpenModal}
      >
        <LucideSlidersHorizontal className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl mr-1 sm:mr-2" />
        Filter
      </Button>

      {isModalOpen && <FilterModal onApplyFilters={handleApplyFilters} />}
    </>
  );
}

export default FilterButton;