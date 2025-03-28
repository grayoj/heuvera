import {
  LucideLeaf,
  LucideWifi,
  LucideUtensils,
  LucideBone,
  LucideWashingMachine,
  LucideVideo,
} from "lucide-react";
import Divider from "../Divider";
import SectionHeaderText from "../text/SectionHeaderText";

export default function PropertyAmenities() {
  const amenities = [
    {
      icon: (
        <LucideLeaf className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Garden View",
    },
    {
      icon: (
        <LucideWifi className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Wifi",
    },
    {
      icon: (
        <LucideUtensils className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Kitchen",
    },
    {
      icon: (
        <LucideBone className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Pets allowed",
    },
    {
      icon: (
        <LucideWashingMachine className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Free Washer - in building",
    },
    {
      icon: (
        <LucideVideo className="text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-[#3e3e3e]" />
      ),
      name: "Security Cameras on property",
    },
  ];

  return (
    <>
      <Divider />
      <div className="flex flex-col">
        <SectionHeaderText title="What this place offers" />
        <div className="flex gap-2 items-center">
          <div className="flex flex-row flex-wrap gap-12">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-row gap-8">
                <div className="flex flex-row gap-3 items-center rounded-xl p-2 transition-transform duration-300 hover:scale-105 hover:shadow-md">
                  {amenity.icon}
                  <h1 className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-base text-[#3E3E3E]">
                    {amenity.name}
                  </h1>
                </div>
                <div className="border-l border-[#E3E2D9] h-10 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
