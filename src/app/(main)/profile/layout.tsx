"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heuvera/components/ui/button";
import SidebarItem from "@heuvera/components/ui/SidebarItem";
import { sideBar } from "@heuvera/app/data/array";
import useIsMobile from "@heuvera/hooks/IsMobile";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const sidebarItems = useMemo(() => {
    return sideBar.map((item: any) => {
      const handleClick = () => {
        if (isMobile) {
          router.push(item.route);
        }
      };

      return (
        <div
          key={item.route}
          onClick={handleClick}
          className={isMobile ? "cursor-pointer" : ""}
        >
          <SidebarItem item={item} route={item.route}>
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <h2 className="font-medium text-sm">{item.name}</h2>
                <p className="text-[#898989] text-xs w-full md:w-auto lg:w-[8.5rem] xl:w-[10rem] 2xl:w-[12.5rem] line-clamp-2 overflow-hidden text-ellipsis">
                  {item.description}
                </p>
              </div>
            </div>
          </SidebarItem>
        </div>
      );
    });
  }, [isMobile, router]);

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-[#F8F7F2]">
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {sidebarItems}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-[25%] md:w-[30%] lg:w-[25%] xl:w-[25%] 2xl:w-[25%] bg-[#F8F7F2] border-r-[1px] flex flex-col gap-2 overflow-y-auto">
        <div className="w-full px-4 py-4">
          <Button variant="outline" className="bg-[#F8F7F2]" onClick={() => router.push("/explore")}>
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="w-full">{sidebarItems}</div>
      </aside>

      <main className="flex-1 min-h-0 overflow-y-auto pl-4 pr-4 md:pr-8 lg:pr-12 xl:pr-14 2xl:pr-20 pb-4 bg-[#F8F7F2]">
        {children}
      </main>
    </div>
  );
}
