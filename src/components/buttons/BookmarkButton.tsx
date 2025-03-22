"use client";

import { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button onClick={() => setIsBookmarked(!isBookmarked)}>
      {isBookmarked ? (
        <IoBookmark className="text-2xl text-[#7B4F3A]" />
      ) : (
        <IoBookmarkOutline className="text-2xl text-[#898989]" />
      )}
    </button>
  );
}
