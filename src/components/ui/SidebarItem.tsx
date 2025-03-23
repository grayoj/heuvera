'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarItem({
  children,
  route,
  basePath,
}: {
  children: React.ReactNode;
  route: string;
  basePath: string;
}) {
  const pathname = usePathname();
  const fullRoute = `/profile/${basePath}/${route}`;
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
      {children}
    </Link>
  );
}

export default React.memo(SidebarItem, (prevProps, nextProps) => {
  return (
    prevProps.route === nextProps.route &&
    prevProps.children === nextProps.children &&
    prevProps.basePath === nextProps.basePath
  );
});
