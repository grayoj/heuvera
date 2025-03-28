"use client";

import { motion } from "framer-motion";
import { Button } from "@heuvera/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoShareSocialOutline, IoBed, IoPerson } from "react-icons/io5";
import { FaBath, FaStar } from "react-icons/fa";
import PropertyCard from "@heuvera/components/cards/PropertyCards/PropertyCard";
import { PropertyData } from "@heuvera/components/data/PropertyData";
import { Property } from "@heuvera/types/map";

interface PropertyDetailTrayProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetailTray({
  property,
  onClose,
}: PropertyDetailTrayProps) {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/explore/${property.id}`);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed right-0 bottom-0 h-[calc(100vh-6rem)] w-1/2 bg-[#F3F2EC] shadow-lg z-[1000] overflow-y-auto"
    >
      <div className="w-full p-5 flex flex-col gap-6">
        {PropertyData.length > 0 && (
          <div className="w-full flex flex-row gap-6">
            <div className="w-5/6 h-96 flex-grow rounded-3xl overflow-hidden">
              <Image
                src={PropertyData[0].images[0]}
                alt="Property Image"
                className="w-full h-full object-cover"
                height={500}
                width={500}
              />
            </div>

            <div className="w-full rounded-2xl flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center">
                <div className="cursor-pointer flex flex-row items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full hover:bg-[#E3E2D9]"
                  >
                    <X className="h-5 w-5 text-[#3E3E3E]" />
                  </Button>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex gap-2 items-center text-[#898989] hover:bg-[#E3E2D9]"
                  >
                    <span className="text-sm">Share</span>
                    <IoShareSocialOutline className="text-lg" />
                  </Button>
                </div>
              </div>

              <h1 className="text-2xl font-serif font-semibold text-[#3E3E3E]">
                {PropertyData[0].propertyName}
              </h1>

              <div className="flex flex-row gap-2 items-center">
                <h1 className="text-lg font-medium font-serif text-[#323232]">
                  4.5
                </h1>
                <div className="flex flex-row">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
              </div>

              <p className="text-base font-serif font-normal text-[#3E3E3E]">
                {PropertyData[0].propertyDetails.location}
              </p>

              <div className="flex flex-row gap-5 py-2">
                <div className="gap-1 flex items-center">
                  <IoBed className="text-[#6A6A6A] text-lg" />
                  <h1 className="text-[#6A6A6A] text-sm font-serif">
                    3 Bedrooms
                  </h1>
                </div>
                <div className="border-r border-[#C4C3B8]" />
                <div className="gap-1 flex items-center">
                  <FaBath className="text-[#6A6A6A] text-lg" />
                  <h1 className="text-[#6A6A6A] text-sm font-serif">
                    5 Bathrooms
                  </h1>
                </div>
                <div className="border-r border-[#C4C3B8]" />
                <div className="gap-1 flex items-center">
                  <IoPerson className="text-[#6A6A6A] text-lg" />
                  <h1 className="text-[#6A6A6A] text-sm font-serif">
                    4 Guests
                  </h1>
                </div>
              </div>

              <p className="text-base font-serif font-normal text-[#3E3E3E] py-2">
                {PropertyData[0].propertyDescription}
              </p>

              <h1 className="text-2xl text-[#3F3B2B] font-semibold font-serif">
                ₦{PropertyData[0].propertyDetails.price}
                <span className="text-sm text-[#3E3E3E] font-serif font-normal">
                  {" "}
                  /night
                </span>
              </h1>

              <Button
                className="w-full h-12 rounded-full bg-[#7B4F3A] hover:bg-[#6A432F] transition-colors"
                onClick={goToDetails}
              >
                Show Details
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-serif font-semibold text-[#3E3E3E] mb-3">
          Similar Properties
        </h3>
        <div className="w-full flex overflow-x-auto gap-4 pb-4">
          {PropertyData.map((property, index) => (
            <div key={index} className="min-w-64 flex-shrink-0">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
