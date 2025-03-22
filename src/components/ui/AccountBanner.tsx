'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import Input from "./Input";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AccountBanner() {
  const pathname = usePathname();

  // Function to format the pathname for display
  const formattedPathSegment = useMemo(() => {
    if (!pathname) return "";
    
    // Extract the relevant part from the URL
    // Remove the leading slash and split by '/'
    const pathSegments = pathname.slice(1).split('/');
    
    // If URL contains 'profile', use the next segment if available
    const index = pathSegments.indexOf('property-renters');
    if (index !== -1 && index + 1 < pathSegments.length) {
      // Convert kebab-case to Title Case (e.g., property-renters -> Property Renters)
      return pathSegments[index + 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // If we couldn't extract a meaningful segment, default to "Support"
    return "Personal Info";
  }, [pathname]);

  return (
    <div className="w-full h-[3.4rem] bg-[#F8F7F2] flex border-b-[1px] border-[#E3E2D9] sticky top-0 z-10">
      <div className="border-r-[1px] w-[20%] flex items-center justify-center">
        <Button variant='outline' className="bg-[#F8F7F2]  hover:cursor-pointer">
          <ArrowLeft />
          Back</Button>
      </div>
      <div className="flex justify-around w-[80%] items-center text-sm">
        <p>Account {">"} <span className="font-semibold">{formattedPathSegment}</span></p>
        <Input className="w-[19rem] flex items-center justify-center text-center" placeholder="Search" />
        <Button variant='outline' className='bg-[#F8F7F2]  hover:cursor-pointer'>Help</Button>
      </div>
    </div>
  );
}