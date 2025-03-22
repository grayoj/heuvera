import { Button } from '@heuvera/components/ui/button';
import { LucideSlidersHorizontal } from 'lucide-react';

const FilterButton = () => (
    <Button
        variant="outline"
        className="bg-transparent border border-[#E3E2D9] shadow-none text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-serif"
        size="default"
    >
        <LucideSlidersHorizontal className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-xl" /> Filter
    </Button>
);

export default FilterButton;
