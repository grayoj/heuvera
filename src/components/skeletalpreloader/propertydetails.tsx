'use client';

import { IoBed, IoPerson } from 'react-icons/io5';
import { FaBath, FaStar } from 'react-icons/fa6';

export default function PropertyDetailsSkeletalPreloader() {
  return (
    <div className="w-full flex flex-col pb-10 gap-10 px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>

      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-10 h-full">
        {/* Images Section */}
        <div className="flex flex-col w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 gap-6">
          <div className="h-[400px] bg-gray-200 rounded-2xl md:rounded-[3rem]"></div>
          <div className="flex gap-4">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="h-28 md:h-60 w-6/12 bg-gray-200 rounded-2xl md:rounded-[2rem]"
              ></div>
            ))}
          </div>
          <div className="h-[400px] bg-gray-200 rounded-2xl md:rounded-[3rem]"></div>
        </div>

        {/* Right Side Property Details Skeleton */}
        <div className="flex flex-col w-12/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>

          <div className="flex flex-row gap-5">
            {[
              { icon: <IoBed className="text-gray-200" />, label: 'Bedrooms' },
              {
                icon: <FaBath className="text-gray-200" />,
                label: 'Bathrooms',
              },
              { icon: <IoPerson className="text-gray-200" />, label: 'Guests' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>

          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>

          {/* Host Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>

          {/* Amenities Section Skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="flex flex-row flex-wrap gap-12">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews and Location Skeletons */}
      <div className="space-y-6">
        {[1, 2].map((_, index) => (
          <div key={index}>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
