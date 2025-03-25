'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, LucideListFilter } from 'lucide-react';
import { ViewMode, SortOption } from '@heuvera/types/map';
import { FaSort } from 'react-icons/fa6';
import SortDropdown from '../SortDropdown';

interface FavoritesHeaderProps {
  sortOption?: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  viewMode?: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  isMobile?: boolean;
}

const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  isMobile = false,
}) => {
  const [sortData, setSortData] = useState<SortOption>('recent');
  return (
    <div className="w-full flex items-center justify-between">
      {/* Sort Options */}
      <div
        className={`
        flex items-center 
        ${isMobile ? 'w-full justify-center' : ''}
        `}
      >
        <LucideListFilter className="text-[#323232] mr-1" />

        <SortDropdown
          value={sortData}
          onValueChange={(value) => {
            setSortData(value);
            setSortOption(value);
          }}
        />
      </div>

      {/* View Mode Toggle */}
      <div
        className={`flex items-center ${isMobile ? 'w-full justify-center mt-2' : 'ml-auto'}`}
      >
        <div className="flex items-center space-x-2 bg-[#FBFAF6] rounded-full p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#7B4F3A] text-white' : 'text-[#323232] hover:bg-[#D6D6D6]'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-[#7B4F3A] text-white' : 'text-[#323232] hover:bg-[#D6D6D6]'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesHeader;
