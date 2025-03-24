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
          <div className="">
            <MapButton onClick={ToMap} />
          </div>

          {/* Divider */}
          <div className="h-8 border-[#E3E2D9] border-l" />

          {/* Categories List */}
          <div className="min-w-0 overflow-hidden">
            <CategoryList />
          </div>

          {/* Divider */}
          <div className="h-8 border-[#E3E2D9] border-l" />

          <div className="">
            <FilterButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
