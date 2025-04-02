"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import Input from "./Input";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AccountBanner() {
  const pathname = usePathname();

  const formattedPathSegment = useMemo(() => {
    if (!pathname) return "";

    const pathSegments = pathname.slice(1).split("/");

    const index = pathSegments.indexOf("property-owners");
    if (index !== -1 && index + 1 < pathSegments.length) {
      return pathSegments[index + 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return "Personal Info";
  }, [pathname]);

  return (
    <div className="w-full h-[3.4rem] bg-[#F8F7F2] flex border-b-[1px] border-[#E3E2D9] sticky top-0 z-10">
      <div className="border-r-[1px] w-[25%] flex items-center justify-center">
        <Button
          variant="outline"
          className="bg-[#F8F7F2]  hover:cursor-pointer"
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="flex justify-around w-[75%] items-center text-sm">
        <p>
          Account {">"}{" "}
          <span className="font-semibold">{formattedPathSegment}</span>
        </p>
        <Input
          className="w-[19rem] flex items-center justify-center text-center"
          placeholder="Search"
        />
        <Button
          variant="outline"
          className="bg-[#F8F7F2]  hover:cursor-pointer"
        >
          Help
        </Button>
      </div>
    </div>
  );
}
