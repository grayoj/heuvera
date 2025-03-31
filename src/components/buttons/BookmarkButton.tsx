"use client";

import { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

interface BookmarkButtonProps {
  className?: string;
}

export default function BookmarkButton({ className }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button onClick={() => setIsBookmarked(!isBookmarked)}>
      {isBookmarked ? (
        <IoBookmark className={`text-2xl md:text-xl lg:text-base xl:text-base 2xl:text-2xl text-[#7B4F3A] ${className}`} />
      ) : (
        <IoBookmarkOutline className={`text-2xl md:text-xl lg:text-base xl:text-base 2xl:text-2xl text-[#898989] ${className}`} />
      )}
    </button>
  );
}
