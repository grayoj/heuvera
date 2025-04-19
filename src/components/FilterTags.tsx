import React from "react";
import { ActiveFilters, FilterTagsProps } from "@heuvera/utils/props";
import { X } from "lucide-react";

const filterDisplayMap: Record<keyof ActiveFilters, (val: any) => string> = {
  priceRange: (val) => `₦${val[0]} - ₦${val[1]}`,
  bedrooms: (val) => `${val} Bedrooms`,
  beds: (val) => `${val} Beds`,
  bathrooms: (val) => `${val} Bathrooms`,
  amenities: (val) => val.join(", "),
  propertyTypes: (val) => val.join(", "),
  instantBooking: () => "Instant Booking",
  selfCheckIn: () => "Self Check-in",
};

const FilterTag = React.memo(
  ({
    filterKey,
    value,
    removeFilter,
  }: {
    filterKey: keyof ActiveFilters;
    value: any;
    removeFilter: (key: keyof ActiveFilters) => void;
  }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const display = filterDisplayMap[filterKey]?.(value);
    if (!display) return null;

    return (
      <div className="flex items-center bg-[#7B4F3A] dark:bg-[#8B5F4D] rounded-md px-4 py-2 text-xs sm:text-sm">
        <span className="mr-2">{display}</span>
        <button onClick={() => removeFilter(filterKey)}>
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  },
);

FilterTag.displayName = "FilterTag";

const FilterTags = React.memo(
  ({ activeFilters, removeFilter }: FilterTagsProps) => {
    return (
      <div className="flex flex-wrap gap-2 my-2">
        {Object.entries(activeFilters).map(([key, value]) => (
          <FilterTag
            key={key}
            filterKey={key as keyof ActiveFilters}
            value={value}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    );
  },
);

FilterTags.displayName = "FilterTags";

export default FilterTags;
