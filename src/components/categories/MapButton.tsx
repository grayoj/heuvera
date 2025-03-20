
import { Button } from "@heuvera/components/ui/button";
import { LucideMap } from "lucide-react";

const MapButton = () => (
  <Button
    variant="outline"
    className="bg-transparent border border-[#E3E2D9] shadow-none text-base font-serif"
    size="default"
  >
    <LucideMap className="text-xl" /> Map
  </Button>
);

export default MapButton;
