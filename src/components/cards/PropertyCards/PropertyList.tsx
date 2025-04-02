"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BookmarkButton from "@heuvera/components/buttons/BookmarkButton";
import { FaBath } from "react-icons/fa";
import { IoBed, IoPerson } from "react-icons/io5";
import { Button } from "@heuvera/components/ui/button";

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
  listedDate: string;
}

export default function PropertyListView({ property }: { property: Property }) {
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <motion.div
        key={property.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="flex flex-row md:flex-row border border-[#E3E2D9] dark:border-[#555555] rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 h-40 md:h-48 lg:h-52 xl:h-60 2xl:h-80 font-serif">
          {/* Property Image */}
          <div className="relative w-1/3 h-full">
            <Image
              src={property.images?.[0] || "/img3.jpeg"}
              alt={property.propertyName || "Property"}
              width={500}
              height={500}
              className="object-cover h-40 md:h-48 lg:h-52 xl:h-60 2xl:h-80 w-full"
            />
            <div className="absolute top-2 right-2 size-5 md:size-8 bg-[#F3F2EC] dark:bg-[#333333] flex items-center justify-center rounded-full shadow-md">
              <BookmarkButton className="text-base md:text-xl lg:text-base xl:text-base 2xl:text-2xl" />
            </div>
          </div>

          {/* Property Details */}
          <div className="p-3 md:p-4 lg:p-4 xl:p-6 2xl:p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm md:text-xl font-semibold text-[#323232] dark:text-[#FBFAF6]">
                  {property.propertyName}
                </h3>
                <p className="text-sm md:text-xl font-bold text-[#7B4F3A] dark:text-[#8B5F4D]">
                  ${property.propertyDetails?.price?.toLocaleString()}
                </p>
              </div>

              <p className="text-[#646464] mt-0 md:mt-2 lg:mt-0 xl:mt-4 2xl:mt-4 text-xs md:text-base">
                {property.propertyDetails.location}
              </p>

              <div className="flex gap-2 md:gap-4 mt-2 md:mt-2 lg:mt-0 xl:mt-4 2xl:mt-4">
                {property.propertyDetails?.bedrooms && (
                  <div className="flex items-center gap-1">
                    <IoBed className="text-[#898989] dark:text-[#666666] text-sm md:text-base" />
                    <span className="text-[#898989] dark:text-[#666666] text-xs md:text-base">
                      {property.propertyDetails.bedrooms} Beds
                    </span>
                  </div>
                )}
                {property.propertyDetails?.bathrooms && (
                  <div className="flex items-center gap-1">
                    <FaBath className="text-[#898989] dark:text-[#666666] text-sm md:text-base" />
                    <span className="text-[#898989] dark:text-[#666666] text-xs md:text-base">
                      {property.propertyDetails.bathrooms} Baths
                    </span>
                  </div>
                )}
                {property.propertyDetails?.guests && (
                  <div className="flex items-center gap-1">
                    <IoPerson className="text-[#898989] dark:text-[#666666] text-sm md:text-base" />
                    <span className="text-[#898989] dark:text-[#666666] text-xs md:text-base">
                      {property.propertyDetails.guests} Guests
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[#646464] line-clamp-2 mt-2 md:mt-2 lg:mt-0 xl:mt-4 2xl:mt-4 text-xs md:text-base">
                {property.propertyDescription || "No description available."}
              </p>
            </div>

            <div className="mt-2 md:mt-0 lg:mt-0 xl:mt-4 2xl:mt-4 flex flex-row justify-between items-center gap-2">
              <span className="text-xs md:text-sm text-[#646464]">
                Listed{" "}
                {property.listedDate
                  ? new Date(property.listedDate).toLocaleDateString()
                  : "Recently"}
              </span>
              <Link href={`/explore/${property.id}`}>
                <Button
                  variant="default"
                  className="bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white hover:bg-[#6A432F] dark:hover:bg-[#7B4F3A] hidden md:block"
                >
                  View Details
                </Button>
                <button className="underline text-[#7B4F3A] dark:dark:text-[#8B5F4D] hover:bg-[#6A432F] dark:hover:bg-[#7B4F3A] text-xs block md:hidden">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
