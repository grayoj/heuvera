"use client";

import React from "react";
import { Grid, List, LucideListFilter } from "lucide-react";
import { ViewMode, SortOption } from "@heuvera/types/map";
import SortDropdown from "../SortDropdown";

interface FavoritesHeaderProps {
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  viewMode: ViewMode;
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
  return (
    <div className={`w-full ${isMobile ? "flex flex-col space-y-4" : "flex items-center justify-between"}`}>
      <div className="flex items-center">
        <LucideListFilter className="text-[#323232] mr-1" />
        <SortDropdown
          value={sortOption}
          onValueChange={(value) => {
            setSortOption(value);
          }}
        />
      </div>
      <div className={`flex items-center ${isMobile ? "" : "ml-auto"}`}>
        <div className="flex items-center space-x-2 bg-[#FBFAF6] rounded-full p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-[#7B4F3A] text-white" : "text-[#323232] hover:bg-[#D6D6D6]"}`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === "list" ? "bg-[#7B4F3A] text-white" : "text-[#323232] hover:bg-[#D6D6D6]"}`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesHeader;