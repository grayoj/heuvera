"use client";

import { ArrowLeft, LucideHelpCircle } from "lucide-react";
import { Button } from "./button";
import Input from "./Input";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface ProfileBannerProps {
  toggleHelp: () => void;
  isHelpVisible: boolean;
}

export default function ProfileBanner({
  toggleHelp,
  isHelpVisible,
}: ProfileBannerProps) {
  const pathname = usePathname();

  // Function to format the pathname for display
  const formattedPathSegment = useMemo(() => {
    if (!pathname) return "";

    // Extract the relevant part from the URL
    // Remove the leading slash and split by '/'
    const pathSegments = pathname.slice(1).split("/");

    // If URL contains 'profile', use the next segment if available
    const index = pathSegments.indexOf("property-renters");
    if (index !== -1 && index + 1 < pathSegments.length) {
      // Convert kebab-case to Title Case (e.g., property-renters -> Property Renters)
      return pathSegments[index + 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Personal Info";
  }, [pathname]);

  return (
    <div className="w-full h-12 md:h-16 lg:h-12 xl:h-16 2xl:h-16 bg-[#F8F7F2] dark:bg-[#333333] items-center flex border-b-[1px] border-[#E3E2D9] dark:border-[#555555] sticky top-0 z-10 hidden md:block">
      <div className="flex justify-between w-full h-full items-center">
        <p className="font-serif text-xs md:text-base lg:text-xs xl:text-base 2xl:text-base">
          Account {">"}{" "}
          <span className="font-semibold">{formattedPathSegment}</span>
        </p>
        <Input
          className="w-48 md:w-72 flex items-center justify-center text-center font-serif"
          placeholder="Search"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="bg-[#F8F7F2] dark:bg-[#333333] hover:cursor-pointer font-serif"
            onClick={toggleHelp}
          >
            <LucideHelpCircle />
            {isHelpVisible ? "Close Help" : "Help"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
