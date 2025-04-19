"use client";

import React, { lazy, Suspense } from "react";
import PropertyDetails from "./PropertyDetails";
import Link from "next/link";
import { Property } from "@heuvera/utils/props";

const PropertyImageCarousel = lazy(() => import("./PropertyImage"));

const PropertyCardFallback = () => (
  <div className="h-60 md:h-36 lg:h-28 xl:h-32 2xl:h-40 bg-gray-200 dark:bg-[#444444] rounded-t-2xl animate-pulse" />
);

const PropertyCard = React.memo(
  ({
    property,
    isPriority = false,
  }: {
    property: Property;
    isPriority?: boolean;
  }) => {
    return (
      <div className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:size-56 2xl:size-72 rounded-2xl border border-[#E3E2D9] dark:border-[#555555] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
        <Suspense fallback={<PropertyCardFallback />}>
          <PropertyImageCarousel
            images={property.images}
            isPriority={isPriority}
          />
        </Suspense>
        <Link href={`/explore/${property.id}`} key={property.id}>
          <div className="h-32 md:h-24 lg:h-24 xl:h-24 2xl:h-28 p-3 md:p-3 lg:p-3 xl:p-3 2xl:p-4 flex flex-col justify-evenly">
            <PropertyDetails
              price={property.propertyDetails.price}
              address={property.propertyDetails.location}
              beds={property.propertyDetails.bedrooms}
              baths={property.propertyDetails.bathrooms}
              guests={property.propertyDetails.guests}
              isVerified={property.isVerified}
              rating={property.propertyDetails.rating}
            />
          </div>
        </Link>
      </div>
    );
  },
);

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
