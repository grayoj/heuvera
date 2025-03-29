"use client";

import React, { useMemo } from "react";

import AccountBanner from "@heuvera/components/ui/ProfileBanner";
import SidebarItem from "@heuvera/components/ui/SidebarItem";
import { sideBar } from "@heuvera/app/data/array";
import { Button } from "@heuvera/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = useMemo(() => {
    return sideBar.map((item: any) => (
      <SidebarItem item={item} key={item.route} route={item.route}>
        <div className="flex items-center">
          <div className="flex flex-col ml-3">
            <h2 className="font-medium text-sm">{item.name}</h2>
            <p className="text-[#898989] text-xs w-[12.5rem]">
              {item.description}
            </p>
          </div>
        </div>
      </SidebarItem>
    ));
  }, []);
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">

        <aside className="w-[25%] bg-[#F8F7F2] border-r-[1px] overflow-y-auto flex flex-col gap-2">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 py-4">
            <Button
              variant="outline"
              className="bg-[#F8F7F2]  hover:cursor-pointer"
              onClick={() => router.push('/explore')}
            >
              <ArrowLeft />
              Back
            </Button>
          </div>
          {sidebarItems}
        </aside>

        <main className="flex-1 pl-4 pr-4 md:pr-8 lg:pr-12 xl:pr-14 2xl:pr-20 pb-4 bg-[#F8F7F2] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
