"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";
import SectionHeaderText from "../text/SectionHeaderText";

interface ReviewsSectionProps {
  reviews: string[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const toggleReviews = () => {
    setShowAll((prev) => !prev);
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="flex flex-col gap-2">
      <SectionHeaderText title="Reviews" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={index} reviews={review} />
        ))}
      </div>
      {reviews.length > 4 && (
        <div className="w-full flex-start mt-5">
          <button
            onClick={toggleReviews}
            className="text-base font-serif font-medium text-[#3E3E3E] dark:text-[#666666] underline px-2"
          >
            {showAll ? "See less reviews" : "See all reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
