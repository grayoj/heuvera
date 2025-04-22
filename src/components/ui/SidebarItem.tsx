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
  const fullRoute = route === "account" ? "/account" : `/account/${route}`;
  const isActive = pathname === fullRoute;

  return (
    <Link
      href={fullRoute}
      prefetch={true}
      className={`flex items-center gap-4 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-1 md:px-1 xl:px-4 h-10 md:py-4 
        ${isActive ? "text-[#7B4F3A] dark:text-[#8B5F4D] border-b-2 border-b-[#7B4F3A] dark:border-b-[#8B5F4D]" : "border-b-2 border-transparent"}
      `}
    >
      <div
        className={`rounded-full flex justify-center items-center 
          ${isActive ? "text-[#7B4F3A] dark:text-[#8B5F4D]" : "bg-[#F8F7F2] dark:bg-[#44444433]"} 
          size-4 md:size-5 lg:size-6 aspect-square
        `}
      >
        <item.icon className="size-4" />
      </div>

      <div className="flex-1">{children}</div>
    </Link>
  );
}

export default React.memo(SidebarItem, (prevProps, nextProps) => {
  return (
    prevProps.route === nextProps.route &&
    prevProps.children === nextProps.children &&
    JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item) // Deep comparison for item
  );
});
