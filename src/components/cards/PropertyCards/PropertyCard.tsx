"use client";

import PropertyDetails from "./PropertyDetails";
import Link from "next/link";
import PropertyImageCarousel from "./PropertyImage";
import { Property } from "@heuvera/utils/props";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:size-56 2xl:size-72 rounded-2xl border border-[#E3E2D9] dark:border-[#555555] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <PropertyImageCarousel images={property.images} />
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
}
