"use client";

import React, { useState } from "react";
import SectionHeaderText from "../text/SectionHeaderText";

export default function PropertyDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullDescription = `Luxury living in the Heart of Abuja Discover
        unparalleled elegance and sophistication at our luxury apartment
        in the heart of Abuja. Nestled in the prime location, this exclusive
        residence redefines modern living, offering a harmonious blend of
        opulence and comfort.
        Situated in one of Abuja's most prestigious neighborhoods, our
        luxury apartments provide easy access to top-tier shopping malls,
        fine dining restaurants, business districts, and recreational centers.
        Whether you seek the vibrance of city life or the tranquility of a
        serene retreat, this is the perfect place to call home...`;

  const wordLimit = 30;

  const words = fullDescription.split(" ");
  const truncatedDescription = words.slice(0, wordLimit).join(" ") + "...";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <SectionHeaderText title="Description" />
      <p className="text-base font-serif font-normal text-[#3E3E3E] dark:text-[#666666]">
        {isExpanded ? fullDescription : truncatedDescription}
      </p>
      <button
        className="text-base font-serif font-normal text-[#3E3E3E] dark:text-[#666666] underline self-start mt-2"
        onClick={toggleExpanded}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
