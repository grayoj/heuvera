'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Item {
  icon?: React.FC;
  name: string;
  route: string;
  description: string;
}

function SidebarItem({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
  item: Item;
}) {
  const pathname = usePathname();
  const fullRoute =
    route === '/'
      ? '/profile/property-owners'
      : `/profile/property-owners/${route}`;
  const isActive = pathname === fullRoute;

  return (
    <Link
      href={fullRoute}
      prefetch={true}
      className={`flex justify-center left-[1px] top-[145px]  py-[14px] ${
        isActive
          ? 'bg-[#E3E2D966] border-2 border-t-0 border-l-[#7B4F3A] '
          : 'border-b-2 border-[#E3E2D9] '
      }`}
    >
      <div
        className={`${isActive ? 'bg-[#7B4F3A] text-white ' : 'bg-[#F8F7F2] text-black'} rounded-full size-12 flex justify-center items-center shadow-[#00000040] shadow-[0px_2px_2px]`}
      >
        {/* <item.icon /> */}
      </div>
      {children}
    </Link>
  );
}

export default React.memo(SidebarItem, (prevProps, nextProps) => {
  return (
    prevProps.route === nextProps.route &&
    prevProps.children === nextProps.children &&
    prevProps.item === nextProps.item
  );
});
