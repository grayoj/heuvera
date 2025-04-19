"use client";

import React, { useRef, useEffect, useState, memo } from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@heuvera/utils/props";

interface LazyPropertyCardProps {
  property: Property;
}

const LazyPropertyCard = memo(({ property }: LazyPropertyCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="w-full flex justify-center">
      {isVisible ? (
        <PropertyCard property={property} />
      ) : (
        <div className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:size-56 2xl:size-72 rounded-2xl border border-[#E3E2D9] dark:border-[#555555] bg-gray-100 dark:bg-[#333333] animate-pulse" />
      )}
    </div>
  );
});

LazyPropertyCard.displayName = "LazyPropertyCard";

export default LazyPropertyCard;
