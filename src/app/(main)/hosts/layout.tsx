"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heuvera/components/ui/button";
import SidebarItem from "@heuvera/components/ui/SidebarItem";
import { sideBarAdmin } from "@heuvera/app/data/array";
import useIsMobile from "@heuvera/hooks/IsMobile";
import MobileProfileSettings from "@heuvera/components/modal/MobileSidebarModal";
import AdminSideBarItem from "@heuvera/components/ui/AdminSideBarItem";

interface Item {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  route: string;
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileProfileSettings />;
  }

  return (
    <div className="flex flex-col px-4 md:px-8 lg:px-10 xl:px-14 2xl:px-20">
      <aside className="w-full bg-[#F8F7F2] dark:bg-[#333333] flex flex-col py-5">
        <div className="max-w-fit py-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="cursor-pointer"
          >
            <ArrowLeft className="mr-2" /> Back to Home
          </Button>
        </div>
        <div className="max-w-fit justify-center md:gap-1 lg:gap-1 xl:gap-0 flex border-b border-[#E3E2D9] dark:border-[#555555]">
          {sideBarAdmin.map((item: Item) => (
            <div key={item.route}>
              <AdminSideBarItem item={item} route={item.route}>
                <div className="flex items-center">
                  <div className="flex flex-row">
                    <h2 className="font-medium md:text-[0.6rem] lg:text-xs">
                      {item.name}
                    </h2>
                  </div>
                </div>
              </AdminSideBarItem>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 min-h-0 overflow-y-auto pb-4 bg-[#F8F7F2] dark:bg-[#333333]">
        {children}
      </main>
    </div>
  );
}
