"use client";

import { useState } from "react";
import { Map } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
  DrawerTitle,
} from "../../components/ui/drawer";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

const MapDrawerPage = dynamic(() => import("../map/MapDrawerPage"), {
  ssr: false,
});

interface MapButtonProps {
  onClick?: () => void;
  className?: string;
}

const MapButton = ({ className }: MapButtonProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const useDrawer = true;
  const handleClick = () => {
    if (!useDrawer) {
      router.push("/explore/map");
    }
  };

  return useDrawer ? (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-10 px-4 bg-[#F8F7F2] border border-[#E3E2D9] text-[#3E3E3E] shadow-none hover:bg-[#E3E2D9] ${className}`}
        >
          <Map className="mr-2 h-4 w-4" />
          Map
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Property Map View</DrawerTitle>
        </DrawerHeader>
        <MapDrawerPage />
        <DrawerClose className="absolute top-4 right-4 z-[1001]">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <span className="sr-only">Close</span>
            <span aria-hidden className="text-[#898989]">
              ×
            </span>
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className={`h-10 px-4 bg-[#F8F7F2] border border-[#E3E2D9] text-[#3E3E3E] shadow-none hover:bg-[#E3E2D9] ${className}`}
      onClick={handleClick}
    >
      <Map className="mr-2 h-4 w-4" />
      Map
    </Button>
  );
};

export default MapButton;
