"use client";

import React from "react";
import { Grid, List, LucideListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SortOption } from "@heuvera/types/map";
import { FavoritesHeaderProps } from "@heuvera/types/types";

const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  isMobile = false,
}) => {
  const SortOption = [
    {
      sort: "Recently Added" as SortOption,
    },
    {
      sort: "Price: Low to High" as SortOption,
    },
    {
      sort: "Price: High to Low" as SortOption,
    },
  ];
  return (
    <div
      className={`w-full ${isMobile ? "flex flex-col space-y-4" : "flex items-center justify-between"}`}
    >
      <div className="flex items-center gap-2">
        <LucideListFilter className="text-[#323232] dark:text-[#555555] mr-1" />
        <Select
          value={sortOption}
          onValueChange={(value: SortOption) => setSortOption(value)}
        >
          <SelectTrigger className="max-w-fit">
            <SelectValue placeholder="Recently Added" />
          </SelectTrigger>
          <SelectContent>
            {SortOption.map((item, index) => (
              <SelectItem key={index} value={item.sort}>
                {item.sort}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={`flex items-center ${isMobile ? "" : "ml-auto"}`}>
        <div className="flex items-center space-x-2 bg-[#FBFAF6] dark:bg-[#444444] rounded-full p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === "grid" ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "text-[#323232] hover:bg-[#D6D6D6] dark:hover:bg-[#555555]"}`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-full transition-all duration-300 ${viewMode === "list" ? "bg-[#7B4F3A] darK:bg-[#8B5F4D] text-white" : "text-[#323232] dark:hover:bg-[#555555]"}`}
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
