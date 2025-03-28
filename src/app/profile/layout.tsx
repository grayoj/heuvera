'use client';

import React, { useMemo } from 'react';
import { sideBar } from '../data/array';
import SidebarItem from '../../components/ui/SidebarItem';
import AccountBanner from '@heuvera/components/ui/AccountBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebarItems = useMemo(() => {
    return sideBar.map((item) => (
      <SidebarItem item={item} key={item.route} route={item.route}>
        <div className="flex items-center ml-3">
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

  return (
    <div className="flex flex-col h-screen">
      <AccountBanner />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[25%] bg-[#F8F7F2] border-r-[1px] overflow-y-auto">
          {sidebarItems}
        </aside>
        <main className="flex-1 p-4 bg-[#F8F7F2] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
