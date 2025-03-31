import React from "react";

// Define the type for sort options
export type SortOption = "recent" | "price-low" | "price-high";

interface SortDropdownProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div className="relative w-full max-w-xl flex items-center">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value as SortOption)}
        className="
                    appearance-none 
                    w-full 
                    px-3 
                    py-2 
                    text-[#323232]
                    outline-none
                    pr-8 // Add right padding to make space for the arrow
                    rounded-b-lg
                "
      >
        <option value="recent">Recently Added</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      {/* Custom dropdown arrow */}
      <div
        className="
                absolute 
                right-2 
                pointer-events-none 
                flex 
                items-center 
                text-gray-700
            "
      >
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
