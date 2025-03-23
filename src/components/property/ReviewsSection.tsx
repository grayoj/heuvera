'use client';

import { useState } from 'react';
import ReviewCard from './ReviewCard';
import SectionHeaderText from '../text/SectionHeaderText';

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const toggleReviews = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionHeaderText title="Reviews" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        {showAll && (
          <>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </>
        )}
      </div>
      <div className="w-full flex-start mt-5">
        <button
          onClick={toggleReviews}
          className="text-base font-serif font-medium text-[#3E3E3E] underline px-2"
        >
          {showAll ? 'See less reviews' : 'See all reviews'}
        </button>
      </div>
    </div>
  );
}
