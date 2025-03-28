"use client";

import { IoBed, IoPerson } from "react-icons/io5";
import { FaBath, FaStar } from "react-icons/fa6";
import PropertyDescription from "./PropertyDescription";
import Divider from "../Divider";

export default function PropertyDetails() {
  return (
    <div className="w-full flex flex-col">
      <div className="gap-5 flex flex-col">
        <div className="flex flex-col justify-between gap-1">
          <h1 className="text-3xl font-serif font-semibold text-[#3E3E3E]">
            Luxury Apartment in Maitama
          </h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-xl font-medium font-serif text-[#323232]">
              4.5
            </h1>
            <div className="flex flex-row gap-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
            </div>
          </div>
        </div>
        <h1 className="text-xl font-serif font-normal text-[#3E3E3E]">
          Federal Capital Territory, Abuja
        </h1>
        <h1 className="text-2xl text-[#3F3B2B] font-semibold font-serif">
          ₦50,000
          <span className="text-sm text-[#3E3E3E] font-serif font-normal">
            {" "}
            /night
          </span>
        </h1>
        <div className="flex flex-row gap-5">
          <div className="gap-1 flex items-center">
            <IoBed className="text-[#6A6A6A] text-xl" />
            <h1 className="text-[#6A6A6A] text-base font-serif">3 Bedrooms</h1>
          </div>
          <div className="gap-1 flex items-center">
            <FaBath className="text-[#6A6A6A] text-base" />
            <h1 className="text-[#6A6A6A] text-base font-serif">5 Bathrooms</h1>
          </div>
          <div className="gap-1 flex items-center">
            <IoPerson className="text-[#6A6A6A] text-base" />
            <h1 className="text-[#6A6A6A] text-base font-serif">4 Guests</h1>
          </div>
        </div>
      </div>
      <Divider />
      <PropertyDescription />
    </div>
  );
}
