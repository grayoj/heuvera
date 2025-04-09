"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Item {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  route: string;
}

function AdminSidebarItem({
  children,
  route,
  item,
}: {
  children: React.ReactNode;
  route: string;
  item: Item;
}) {
  const pathname = usePathname();
  const fullRoute = route === "/" ? "/hosts" : `/hosts/${route}`;
  const isActive = pathname === fullRoute;

  return (
    <Link
      href={fullRoute}
      className={`flex items-center gap-4 md:gap-0 lg:gap-1 xl:gap-0 2xl:gap-8 px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-20 py-3 md:py-4 
        ${isActive ? "bg-[#E3E2D966] dark:bg-[#55555544] border-l-2 border-y-2 border-l-[#7B4F3A] dark:border-l-[#8B5F4D]" : "border-b-2 border-[#E3E2D9] dark:border-[#555555]"}
      `}
    >
      <div
        className={`rounded-full flex justify-center items-center shadow-[0px_2px_2px] shadow-[#00000040] 
          ${isActive ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "bg-[#F8F7F2] dark:bg-[#44444433] text-black"} 
          size-10 md:size-8 lg:size-10 xl:size-16 aspect-square
        `}
      >
        <item.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white dark:text-white" />
      </div>

      <div className="flex-1">{children}</div>
    </Link>
  );
}

export default React.memo(AdminSidebarItem, (prevProps, nextProps) => {
  return (
    prevProps.route === nextProps.route &&
    prevProps.children === nextProps.children &&
    JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item) // Deep comparison for item
  );
});
