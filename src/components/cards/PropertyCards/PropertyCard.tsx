'use client';

import PropertyImage from './PropertyImage';
import PropertyDetails from './PropertyDetails';
import Link from 'next/link';

interface Property {
  id: number;
  propertyName: string;
  propertyDetails: {
    price: number;
    currency: string;
    period: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    rating: number;
  };
  propertyDescription: string;
  propertyHost: {
    name: string;
    profilePicture: string;
  };
  images: string[];
  amenities: string[];
  isBookmarked: boolean;
  isVerified: boolean;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="w-80 h-80 rounded-2xl border border-[#E3E2D9] transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
      <PropertyImage imageUrl={property.images[0]} />
      <Link href={`/explore/${property.id}`} key={property.id}>
        <div className="h-36 p-4 flex flex-col justify-evenly">
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
