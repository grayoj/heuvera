"use client";

import React, { useState } from "react";
import SectionHeaderText from "../text/SectionHeaderText";

interface PropertyDescriptionProps {
  propertyDescription: string;
}

export default function PropertyDescription({
  propertyDescription,
}: PropertyDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // propertyDescription = ``;

  const wordLimit = 30;

  const words = propertyDescription.split(" ");
  const truncatedDescription = words.slice(0, wordLimit).join(" ") + "...";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <SectionHeaderText title="Description" />
      <p className="text-base font-serif font-normal text-[#3E3E3E] dark:text-[#666666]">
        {isExpanded ? propertyDescription : truncatedDescription}
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
