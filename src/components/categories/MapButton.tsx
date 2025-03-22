
import { Button } from "@heuvera/components/ui/button";
import { LucideMap } from "lucide-react";

interface MapButtonProp {
  onClick: () => void;
}

const MapButton = ({ onClick }: MapButtonProp) => (
  <Button
    onClick={onClick}
    variant="outline"
    className="bg-transparent border border-[#E3E2D9] shadow-none text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-serif"
    size="default"
  >
    <LucideMap className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-xl" /> Map
  </Button>
);

export default MapButton;
