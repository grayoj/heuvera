import React, { memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideSearch, LucideX } from "lucide-react";
import LeaseRentStays from "../../categories/LeaseRentStays";
import { FilterFooter } from "../FilterFooter";
import { FilterOption } from "./FilterOption";
import { DesktopSearchBarProps } from "@heuvera/utils/props";
import FilterContent from "./FilterContent";

export const DesktopSearchBar = memo((props: DesktopSearchBarProps) => {
  const {
    activeFilter,
    toggleFilter,
    clearAll,
    searchText,
    setSearchText,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const containerMotion = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3, delay: 0.2 },
  };

  const dropdownMotion = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center pt-4 relative"
      {...containerMotion}
    >
      <div className="bg-[#FBFAF6] dark:bg-[#444444] px-1 pt-1 rounded-t-lg">
        <LeaseRentStays />
      </div>
      <div className="w-full max-w-3xl bg-[#FBFAF6] dark:bg-[#444444] rounded-full shadow-md overflow-hidden">
        <div className="flex items-center">
          <FilterOption
            type="location"
            label="Where"
            placeholder="Anywhere"
            isActive={activeFilter === "location"}
            toggleFilter={toggleFilter}
            value={searchText}
            onChange={setSearchText}
            inputRef={inputRef}
          />

          <div className="h-8 w-px bg-[#DDDDDD] dark:bg-[#555555]" />

          <FilterOption
            type="dates"
            label="When"
            placeholder="Any week"
            isActive={activeFilter === "dates"}
            toggleFilter={toggleFilter}
          />

          <div className="h-8 w-px bg-[#DDDDDD] dark:bg-[#555555]" />

          <FilterOption
            type="guests"
            label="Who"
            placeholder="Add guests"
            isActive={activeFilter === "guests"}
            toggleFilter={toggleFilter}
          />

          <div className="p-2 pr-3">
            <button className="bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white rounded-full p-3 hover:bg-[#6A4331] transition-colors">
              <LucideSearch className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeFilter && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-3 bg-[#F8F7F2] dark:bg-[#333333] rounded-2xl shadow-lg z-50 overflow-hidden max-w-3xl mx-auto w-full"
            {...dropdownMotion}
          >
            <div className="p-4 px-6 flex justify-between items-center border-b border-[#E3E2D9] dark:border-[#555555]">
              <span className="font-serif font-medium text-[#323232] dark:text-[#FBFAF6]">
                {activeFilter === "location" && "Search destinations"}
                {activeFilter === "dates" && "Select dates"}
                {activeFilter === "guests" && "Who's coming?"}
              </span>
              <button
                onClick={() => toggleFilter(activeFilter)}
                className="p-2 rounded-full hover:bg-[#E3E2D9] dark:hover:bg-[#555555]"
              >
                <LucideX
                  className="text-[#323232] dark:text-[#F8F7F2]"
                  size={18}
                />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <FilterContent
                type={activeFilter}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
              />
            </div>

            <FilterFooter
              clearAll={clearAll}
              closeFilter={() => toggleFilter(activeFilter)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
