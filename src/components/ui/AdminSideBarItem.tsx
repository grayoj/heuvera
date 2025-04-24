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
      className={`flex items-center gap-4 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-1 md:px-1 xl:px-4 h-10 md:py-4 
        ${isActive ? "text-[#7B4F3A] dark:text-[#8B5F4D] border-b-2 border-b-[#7B4F3A] dark:border-b-[#8B5F4D]" : "border-b-2 border-transparent"}
      `}
    >
      <div
        className={`flex justify-center items-center 
          ${isActive ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "bg-[#F8F7F2] dark:bg-[#44444433]"} 
          aspect-square
        `}
      >
        <item.icon className="size-4 xl:size-5" />
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
