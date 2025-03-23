'use client';

import { useRouter } from 'next/navigation';
import MapButton from './MapButton';
import FilterButton from './FilterButton';
import LeaseRentStays from './LeaseRentStays';
import CategoryList from './CategoryList';
import useIsMobile from '@heuvera/hooks/IsMobile';

const Categories = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const ToMap = () => {
    router.push('/explore/map');
  };

  return (
    <div
      className={`w-full border-b border-[#E3E2D9] ${isMobile ? 'h-[130px]' : 'h-[130px] md:h-[88px] lg:h-[68px] xl:h-[88px] 2xl:h-[88px] border-t'} flex items-center`}
    >
      {isMobile ? (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between gap-4 md:gap-0">
            <MapButton onClick={ToMap} />
            <LeaseRentStays />
            <FilterButton />
          </div>
          <CategoryList />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-2 min-w-0 flex-nowrap">
          <div className="flex-shrink-0">
            <MapButton onClick={ToMap} />
          </div>

          <div className="flex md:flex-[2] lg:flex-[2] xl:flex-[2] 2xl:flex-[1] justify-center min-w-0">
            <LeaseRentStays />
          </div>

          {/* Divider */}
          <div className="h-8 border-[#E3E2D9] border-l flex-shrink-0" />

          {/* Categories List */}
          <div className="flex-[5] min-w-0 overflow-hidden">
            <CategoryList />
          </div>

          {/* Divider */}
          <div className="h-8 border-[#E3E2D9] border-l flex-shrink-0" />

          <div className="flex-shrink-0">
            <FilterButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
