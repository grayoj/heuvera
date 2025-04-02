import React from "react";

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
                    text-[#323232] dark:text-[#FBFAF6]
                    bg-[#FBFAF6] dark:bg-[#323232]
                    outline-none
                    pr-8
                    rounded-b-lg
                "
      >
        <option value="recent text-[#323232]">Recently Added</option>
        <option value="price-low text-[#323232]">Price: Low to High</option>
        <option value="price-high text-[#323232]">Price: High to Low</option>
      </select>
      <div
        className="
                absolute 
                right-2 
                pointer-events-none 
                flex 
                items-center 
                text-gray-700 dark:text-gray-200
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
