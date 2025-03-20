import { Button } from "@heuvera/components/ui/button";
import { LucideSlidersHorizontal } from "lucide-react";

const FilterButton = () => (
    <Button
        variant="outline"
        className="bg-transparent border border-[#E3E2D9] shadow-none text-base font-serif"
        size="default"
    >
        <LucideSlidersHorizontal className="text-xl" /> Filter
    </Button>
);

export default FilterButton;
