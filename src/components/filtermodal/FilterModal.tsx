"use client";

import React, { useState } from "react";
import { cn } from "@heuvera/lib/utils";
import { Switch } from "@radix-ui/react-switch";
import {
  Wifi,
  WashingMachine,
  Utensils,
  Video,
  Refrigerator,
  Home,
  Bed,
  Shield,
  CheckIcon,
  LucideSlidersHorizontal,
  X,
  LucideSearch,
  LucideRotateCw,
} from "lucide-react";
import {
  IoBedOutline,
  IoTicketOutline,
  IoWaterOutline,
  IoHomeOutline,
} from "react-icons/io5";
import Currency from "../icons/svgs/currency";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { PriceTab } from "./PriceTab";
import { RoomsTab } from "./RoomsTab";
import { TypeTab } from "./TypeTab";
import { AmenitiesTab } from "./AmenitiesTab";
import { BookTab } from "./BookTab";
import { FilterModalProps, TabType } from "@heuvera/utils/props";
import { AMENITIES_CONFIG, TABS_CONFIG } from "@heuvera/app/data/array";

export function FilterModal({
  onApplyFilters,
  initialFilters = {},
  onClose,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("price");

  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [20000, 100000],
  );
  const [bedrooms, setBedrooms] = useState<string | null>(
    initialFilters?.bedrooms || null,
  );
  const [beds, setBeds] = useState<string | null>(initialFilters?.beds || null);
  const [bathrooms, setBathrooms] = useState<string | null>(
    initialFilters?.bathrooms || null,
  );
  const [amenities, setAmenities] = useState<string[]>(
    initialFilters?.amenities ||
    AMENITIES_CONFIG.filter((a) => a.defaultSelected).map((a) => a.name),
  );
  const [propertyTypes, setPropertyTypes] = useState<string[]>(
    initialFilters?.propertyTypes || [],
  );
  const [instantBooking, setInstantBooking] = useState(
    initialFilters?.instantBooking ?? true,
  );
  const [selfCheckIn, setSelfCheckIn] = useState(
    initialFilters?.selfCheckIn ?? false,
  );

  const handleTabChange = (value: TabType) => {
    setActiveTab(value);
  };

  const handleReset = () => {
    setPriceRange([45000, 105000]);
    setBedrooms(null);
    setBeds(null);
    setBathrooms(null);
    setAmenities(
      AMENITIES_CONFIG.filter((a) => a.defaultSelected).map((a) => a.name),
    );
    setPropertyTypes([]);
    setInstantBooking(true);
    setSelfCheckIn(false);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const togglePropertyType = (type: string) => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleNumberSelect = (
    type: "bedrooms" | "beds" | "bathrooms",
    value: string,
  ) => {
    const setters = {
      bedrooms: setBedrooms,
      beds: setBeds,
      bathrooms: setBathrooms,
    };
    const currentValue = { bedrooms, beds, bathrooms }[type];
    setters[type](value === currentValue ? null : value);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[60%] 2xl:w-[35%] h-[60%] sm:h-3/5 bg-[#F8F7F2] dark:bg-[#333333] rounded-lg shadow-lg z-50 flex flex-col">
        <div className="flex items-center justify-between border-b p-4 sm:p-5 md:p-6">
          <div className="flex items-center">
            <LucideSlidersHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <h2 className="text-sm sm:text-base md:text-lg font-serif font-medium">
              Filters
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center hover:bg-gray-100 hover:dark:bg-[#444444]"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        <div className="w-full flex flex-col flex-grow">
          <div className="h-14 sm:h-16 md:h-20 flex justify-between border-b px-3 sm:px-4 md:px-6 overflow-x-auto">
            {TABS_CONFIG.map(({ id, icon: Icon, label, mobileLabel }) => {
              const isActive = activeTab === id;
              const IconComponent = () => (
                <Icon
                  color=""
                  className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5",
                    isActive
                      ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                      : "text-[#323223] dark:text-[#F8F7F2]",
                  )}
                />
              );
              return (
                <button
                  key={id}
                  onClick={() => handleTabChange(id as TabType)}
                  className={cn(
                    "flex items-center justify-center gap-1 sm:gap-2 h-14 sm:h-16 md:h-20 max-w-fit rounded-none text-xs sm:text-sm",
                    isActive
                      ? "border-b-2 border-[#7B4F3A] dark:border-[#8B5F4D]"
                      : "",
                  )}
                >
                  <IconComponent />
                  <span
                    className={`hidden sm:inline ${isActive
                        ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                        : "text-[#323223] dark:text-[#F8F7F2]"
                      }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`sm:hidden ${isActive
                        ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                        : "text-[#323223] dark:text-[#F8F7F2]"
                      }`}
                  >
                    {mobileLabel || label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex-grow overflow-y-auto p-3 sm:p-4 md:p-6">
            {activeTab === "price" && (
              <PriceTab priceRange={priceRange} setPriceRange={setPriceRange} />
            )}
            {activeTab === "rooms" && (
              <RoomsTab
                bedrooms={bedrooms}
                beds={beds}
                bathrooms={bathrooms}
                onSelect={handleNumberSelect}
              />
            )}
            {activeTab === "type" && (
              <TypeTab
                propertyTypes={propertyTypes}
                togglePropertyType={togglePropertyType}
              />
            )}
            {activeTab === "amenities" && (
              <AmenitiesTab
                amenities={amenities}
                toggleAmenity={toggleAmenity}
              />
            )}
            {activeTab === "book" && (
              <BookTab
                instantBooking={instantBooking}
                selfCheckIn={selfCheckIn}
                setInstantBooking={setInstantBooking}
                setSelfCheckIn={setSelfCheckIn}
              />
            )}
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-t">
            <Button
              variant="outline"
              onClick={handleReset}
              className="rounded-lg bg-[#f0efe9] hover:bg-[#e8e7e1] text-xs sm:text-sm"
            >
              <LucideRotateCw />
              Reset
            </Button>
            <Button
              className="rounded-lg bg-[#7B4F3A] dark:bg-[#8B5F4D] hover:bg-[#7a3b10] text-white text-xs sm:text-sm"
              onClick={() => {
                onApplyFilters({
                  priceRange,
                  bedrooms,
                  beds,
                  bathrooms,
                  amenities,
                  propertyTypes,
                  instantBooking,
                  selfCheckIn,
                });
                onClose();
              }}
            >
              <LucideSearch />
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}