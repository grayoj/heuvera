'use client';

import { MarketplaceProvider } from '@heuvera/providers/MarketplaceProvider';
import { ReactNode } from 'react';

export default function ApplicationLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <MarketplaceProvider>
        {children}
      </MarketplaceProvider>
    </div>
  );
}
