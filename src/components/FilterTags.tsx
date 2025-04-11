import { ActiveFilters, FilterTagsProps } from "@heuvera/utils/props";
import { X } from "lucide-react";

const FilterTags: React.FC<FilterTagsProps> = ({
  activeFilters,
  removeFilter,
}) => {
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

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {Object.entries(activeFilters).map(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        const display = filterDisplayMap[key as keyof ActiveFilters]?.(value);
        return display ? (
          <div
            key={key}
            className="flex items-center bg-[#7B4F3A] dark:bg-[#8B5F4D] rounded-md px-4 py-2 text-xs sm:text-sm"
          >
            <span className="mr-2">{display}</span>
            <button onClick={() => removeFilter(key as keyof ActiveFilters)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default FilterTags;
