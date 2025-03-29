"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  icon: React.FC;
  name: string;
  description: string;
  route: string;
}

function SidebarItem({
  children,
  route,
  item,
}: {
  children: React.ReactNode;
  route: string;
  item: Item;
}) {
  const pathname = usePathname();
  // Adjust fullRoute to handle the root route correctly
  const fullRoute =
    route === "/"
      ? "/profile/property-renters"
      : `/profile/property-renters/${route}`;
  const isActive = pathname === fullRoute;

  return (
    <>
      <Link
        href={fullRoute}
        className={`flex justify-start gap-5 px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 left-[1px] top-[145px]  py-3.5 ${isActive
          ? "bg-[#E3E2D966] border-2 border-t-0 border-l-[#7B4F3A] "
          : "border-b-2 border-[#E3E2D9] "
          }`}
      >
        <div
          className={`${isActive ? "bg-[#7B4F3A] text-white " : "bg-[#F8F7F2] text-black"} rounded-full size-12 md:size-12 lg:size-12 xl:size-8 2xl:size-12 flex justify-center items-center shadow-[#00000040] shadow-[0px_2px_2px]`}
        >
          <item.icon/>
        </div>
        {children}
      </Link>
    </>
  );
}

// Use a proper comparison function with React.memo to prevent unnecessary re-renders
export default React.memo(SidebarItem, (prevProps, nextProps) => {
  return (
    prevProps.route === nextProps.route &&
    prevProps.children === nextProps.children &&
    prevProps.item === nextProps.item // Include item in the comparison
  );
});
