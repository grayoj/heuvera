import React, { memo } from "react";
import { LucideTrash, LucideSearch } from "lucide-react";
import { FilterFooterProps } from "@heuvera/utils/props";
import { Button } from "../ui/button";

export const FilterFooter = memo(
  ({ clearAll, closeFilter }: FilterFooterProps) => {
    return (
      <div className="p-4 border-t border-[#E3E2D9] dark:border-[#555555] flex justify-between gap-3">
        <Button
          variant="outline"
          size="xl"
          onClick={clearAll}
          className="text-[#7B4F3A] dark:text-[#8B5F4D] border border-[#7B4F3A] dark:border-[#8B5F4D]"
        >
          <LucideTrash size={16} />
          Clear
        </Button>
        <Button variant="default" size="xl" onClick={closeFilter}>
          <LucideSearch size={16} />
          Search
        </Button>
      </div>
    );
  },
);
