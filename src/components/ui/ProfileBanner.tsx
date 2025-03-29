"use client";

import { ArrowLeft, LucideHelpCircle } from "lucide-react";
import { Button } from "./button";
import Input from "./Input";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function ProfileBanner() {
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
    <div className="w-full h-16 md:h-16 lg:h-12 xl:h-16 2xl:h-16 bg-[#F8F7F2] items-center flex border-b-[1px] border-[#E3E2D9] sticky top-0 z-10">
      <div className="flex justify-between w-full h-full items-center text-sm">
        <p className="font-serif text-base md:text-base lg:text-xs xl:text-base 2xl:text-base">
          Account {">"}{" "}
          <span className="font-semibold">{formattedPathSegment}</span>
        </p>
        <Input
          className="w-[19rem] md:w-[19rem] lg:w-[15rem] xl:w-[19rem] 2xl:w-[19rem] flex items-center justify-center text-center font-serif"
          placeholder="Search"
        />
        <Button
          variant="outline"
          className="bg-[#F8F7F2] hover:cursor-pointer font-serif"
        >
          <LucideHelpCircle />
          Help
        </Button>
      </div>
    </div>
  );
}
