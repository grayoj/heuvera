import React, { memo } from "react";
import { LucideTrash, LucideSearch } from "lucide-react";
import { FilterFooterProps } from "@heuvera/utils/props";

export const FilterFooter = memo(({ clearAll, closeFilter }: FilterFooterProps) => {
    return (
        <div className="p-4 border-t border-[#E3E2D9] dark:border-[#555555] flex justify-between gap-3">
            <button
                onClick={clearAll}
                className="bg-transparent text-[#7B4F3A] dark:text-[#8B5F4D] border border-[#7B4F3A] dark:border-[#8B5F4D] font-serif font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2"
            >
                <LucideTrash size={16} />
                <span>Clear</span>
            </button>
            <button
                className="bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white font-serif font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2"
                onClick={closeFilter}
            >
                <LucideSearch size={16} />
                <span>Search</span>
            </button>
        </div>
    );
});