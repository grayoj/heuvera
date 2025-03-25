'use client';

import BookingSection from '@heuvera/components/property/BookingSection';
import ImportantInfo from '@heuvera/components/property/ImportantInfo';
import LocationSection from '@heuvera/components/property/LocationSection';
import PageHeader from '@heuvera/components/property/PageHeader';
import PropertyAmenities from '@heuvera/components/property/PropertyAmenities';
import PropertyDetails from '@heuvera/components/property/PropertyDetails';
import HostInfo from '@heuvera/components/property/PropertyHost';
import PropertyImages from '@heuvera/components/property/PropertyImages';
import ReviewsSection from '@heuvera/components/property/ReviewsSection';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyDetailsSkeletalPreloader from '@heuvera/components/skeletalpreloader/propertydetails';

// Skeletal Preloader Component
const SkeletalPreloader = () => {
  return (
    <div className="w-full flex flex-col pb-10 gap-10 px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20">

      {/* Main Content Skeleton */}
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-10 h-full">
        {/* Images Section */}
        <div className="flex flex-col w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 gap-6">
          <div className="h-[400px] bg-gray-200 rounded-lg"></div>
          <div className="flex gap-4">
            {[1, 2].map((_, index) => (
              <div key={index} className="h-52 w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-[400px] bg-gray-200 rounded-lg"></div>
        </div>

        {/* Right Side Skeleton */}
        <div className="flex flex-col w-12/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 space-y-6">
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ExploreViewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PropertyDetailsSkeletalPreloader/>
  }

  return (
    <div className="w-full flex flex-col pb-10 gap-10 px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20">
      <PageHeader />
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-10 h-full">
        <div className="flex flex-col w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 gap-6">
          <PropertyImages />
        </div>
        <div className="flex flex-col w-12/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12">
          <div className="w-full flex flex-col">
            <PropertyDetails />
            <BookingSection />
            <div className="">
              <HostInfo />
            </div>
            <div className="flex flex-col">
              <PropertyAmenities />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ReviewsSection />
      </div>
      <div className="">
        <LocationSection />
      </div>
      <div className="">
        <ImportantInfo />
      </div>
    </div>
  );
}