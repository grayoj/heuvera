import { FilterType } from "@heuvera/utils/props";
import React, { memo } from "react";

interface FilterOptionProps {
  type: FilterType;
  label: string;
  placeholder: string;
  isActive: boolean;
  toggleFilter: (filter: FilterType) => void;
  value?: string;
  onChange?: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const FilterOption = memo(
  ({
    type,
    label,
    placeholder,
    isActive,
    toggleFilter,
    value,
    onChange,
    inputRef,
  }: FilterOptionProps) => {
    const activeClass = isActive ? "bg-[#F8F7F2] dark:bg-[#333333]" : "";

    return (
      <div
        className={`flex-1 p-4 cursor-pointer ${activeClass}`}
        onClick={() => toggleFilter(type)}
      >
        <div className="flex flex-col">
          <span className="text-xs font-medium text-[#7B4F3A] dark:text-[#8B5F4D]">
            {label}
          </span>
          {isActive && type === "location" && onChange ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search destinations"
              className="w-full h-5 bg-transparent outline-none text-sm text-[#323232] dark:text-[#FBFAF6] font-serif"
              autoFocus
            />
          ) : (
            <span className="font-serif text-sm text-[#323232] dark:text-[#F8F7F2]">
              {placeholder}
            </span>
          )}
        </div>
      </div>
    );
  },
);
