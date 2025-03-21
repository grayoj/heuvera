'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarItem({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  const pathname = usePathname();
  // Avoid recalculating this on every render by removing the dependency on pathname
  const fullRoute = `/profile/property-renters/${route}`;
  const isActive = pathname === fullRoute;

  return (
    <Link
      href={fullRoute}
      prefetch={true}
      className={`flex justify-center bg-[#F8F7F2] left-[1px] top-[145px] border-b-2 py-[14px] ${
        isActive ? 'bg-gray-200' : 'border-[#E3E2D9]'
      }`} 
    >
      {children}
    </Link>
  );
}

// Use a proper comparison function with React.memo to prevent unnecessary re-renders
export default React.memo(SidebarItem, (prevProps, nextProps) => {
  return prevProps.route === nextProps.route && 
         prevProps.children === nextProps.children;
});