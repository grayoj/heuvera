"use client";

import { IoBed, IoPerson } from "react-icons/io5";
import { FaBath, FaStar } from "react-icons/fa6";
import PropertyDescription from "./PropertyDescription";
import Divider from "../Divider";

interface PropertyDetailsProps {
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
}

export default function PropertyDetails({
  propertyName,
  propertyDetails,
  propertyDescription,
}: PropertyDetailsProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="gap-3 md:gap-5 flex flex-col">
        <div className="flex flex-col justify-between gap-1">
          <h1 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-serif font-semibold text-[#3E3E3E] dark:text-[#A7A7A7]">
            {propertyName}
          </h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-medium font-serif text-[#323232] dark:text-[#a7a7a7]">
              {propertyDetails.rating}
            </h1>
            <div className="flex flex-row gap-2 mt-0 md:mt-0.5 lg:mt-0.5 xl:mt-0 2xl:mt-0">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-yellow-400 text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl"
                />
              ))}
            </div>
          </div>
        </div>
        <h1 className="text-base md:text-base lg:text-base xl:text-xl 2xl:text-xl font-serif font-normal text-[#3E3E3E] dark:text-[#666666]">
          {propertyDetails.location}
        </h1>
        <h1 className="text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl text-[#3F3B2B] dark:text-[#A7A7A7] font-semibold font-serif">
          {propertyDetails.price}
          <span className="text-sm text-[#3E3E3E] dark:text-[#666666] font-serif font-normal">
            {" "}
            /night
          </span>
        </h1>
        <div className="flex flex-row gap-5">
          <div className="gap-1 flex items-center">
            <IoBed className="text-[#6A6A6A] dark:text-[#666666] text-xl md:text-xl lg:text-xl xl:text-base 2xl:text-base" />
            <h1 className="text-[#6A6A6A] dark:text-[#666666] text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif">
              {propertyDetails.bedrooms}
            </h1>
          </div>
          <div className="gap-1 flex items-center">
            <FaBath className="text-[#6A6A6A] dark:text-[#666666] text-base md:text-sm lg:text-sm xl:text-base 2xl:text-base" />
            <h1 className="text-[#6A6A6A] dark:text-[#666666] text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif">
              {propertyDetails.bathrooms}
            </h1>
          </div>
          <div className="gap-1 flex items-center">
            <IoPerson className="text-[#6A6A6A] dark:text-[#666666] text-base md:text-sm lg:text-sm xl:text-base 2xl:text-base" />
            <h1 className="text-[#6A6A6A] dark:text-[#666666] text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif">
              {propertyDetails.guests}
            </h1>
          </div>
        </div>
      </div>
      <Divider />
      <PropertyDescription propertyDescription={propertyDescription} />
    </div>
  );
}
