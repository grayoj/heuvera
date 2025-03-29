"use client";

import { FindPropertyCard } from '@heuvera/components/cards/DiscoverCards/FindPropertyCard';
import { PropertyCategoryCard } from '@heuvera/components/cards/DiscoverCards/PropertyCategoryCard';
import CategoryList from '@heuvera/components/categories/CategoryList';
import Hero from '@heuvera/components/hero';
import SearchBar from '@heuvera/components/search/SearchBar';
import useIsMobile from '@heuvera/hooks/IsMobile';
import { LucideCircleChevronLeft, LucideCircleChevronRight } from 'lucide-react';

interface DiscoverProps {
  onCategorySelect: (category: string | null) => void;
}

const Discover: React.FC<DiscoverProps> = ({
  onCategorySelect
}) => {
  const isMobile = useIsMobile();

  const propertyCategories = [
    { id: 1, category: 'Town House', count: 2, imageUrl: '/town.jpg' },
    { id: 2, category: 'Apartment', count: 5, imageUrl: '/apartment.jpg' },
    { id: 3, category: 'Villa', count: 3, imageUrl: '/villa.jpg' },
    { id: 4, category: 'Penthouse', count: 1, imageUrl: '/penthouse.jpg' },
    { id: 5, category: 'Cottage', count: 4, imageUrl: '/cottage.jpg' }
  ];

  const propertyLocation = [
    { id: 1, category: 'New York', count: 158, imageUrl: '/newyork.jpg' },
    { id: 2, category: 'Los Angeles', count: 94, imageUrl: '/losangeles.jpg' },
    { id: 3, category: 'Miami', count: 76, imageUrl: '/miami.jpg' },
    { id: 4, category: 'Chicago', count: 63, imageUrl: '/chicago.jpg' },
    { id: 5, category: 'San Francisco', count: 52, imageUrl: '/sanfrancisco.jpg' },
    { id: 6, category: 'Austin', count: 47, imageUrl: '/austin.jpg' }
  ];

  return (
    <>
      <div className='w-full h-full px-4 md:px-8 lg:px-12 xl:px-14 2xl:px-20 flex flex-col gap-20'>
        <div className='w-full h-full relative'>
          <Hero />
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/3 px-4 z-10">
            <SearchBar isMobile={isMobile} />
          </div>
        </div>
        <div className='w-full flex items-center justify-center gap-3'>
          <LucideCircleChevronLeft className='text-[#A7A7A7]' />
          <div className='border-b overflow-hidden'>
            <CategoryList onCategorySelect={onCategorySelect} />
          </div>
          <LucideCircleChevronRight className='text-[#A7A7A7]' />
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-semibold font-serif text-[#323232]'>Feature Categories</h1>
          <h1 className='text-xl font-normal font-serif text-[#323232]'>Discover your perfect property by the features that matter most to you</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-10'>
            {propertyCategories.map((item) => (
              <PropertyCategoryCard
                key={item.id}
                category={item.category}
                count={item.count}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-semibold font-serif text-[#323232]'>Find Properties in These Cities</h1>
          <h1 className='text-xl font-normal font-serif text-[#323232]'>Based on your viewing history, we think you'll love these locations</h1>
          <div className='w-full flex flex-col gap-5 pt-10'>
            <div className='w-12/12 flex flex-row gap-5'>
              <div className='w-6/12'>
                <FindPropertyCard
                  category={propertyLocation[0].category}
                  count={propertyLocation[0].count}
                  imageUrl={propertyLocation[0].imageUrl}
                  width="w-12/12"
                />
              </div>
              <div className='w-6/12 flex flex-row gap-5'>
                <div className='w-6/12'>
                  <FindPropertyCard
                    category={propertyLocation[1].category}
                    count={propertyLocation[1].count}
                    imageUrl={propertyLocation[1].imageUrl}
                    width="w-12/12"
                  />
                </div>
                <div className='w-6/12'>
                  <FindPropertyCard
                    category={propertyLocation[2].category}
                    count={propertyLocation[2].count}
                    imageUrl={propertyLocation[2].imageUrl}
                    width="w-12/12"
                  />
                </div>
              </div>
            </div>
            <div className='w-12/12 flex flex-row gap-5'>

              <div className='w-6/12 flex flex-row gap-5'>
                <div className='w-6/12'>
                  <FindPropertyCard
                    category={propertyLocation[1].category}
                    count={propertyLocation[1].count}
                    imageUrl={propertyLocation[1].imageUrl}
                    width="w-12/12"
                  />
                </div>
                <div className='w-6/12'>
                  <FindPropertyCard
                    category={propertyLocation[2].category}
                    count={propertyLocation[2].count}
                    imageUrl={propertyLocation[2].imageUrl}
                    width="w-12/12"
                  />
                </div>
              </div>
              <div className='w-6/12'>
                <FindPropertyCard
                  category={propertyLocation[0].category}
                  count={propertyLocation[0].count}
                  imageUrl={propertyLocation[0].imageUrl}
                  width="w-12/12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;