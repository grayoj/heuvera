import {
  LucideLeaf,
  LucideWifi,
  LucideUtensils,
  LucideBone,
  LucideWashingMachine,
  LucideVideo,
} from "lucide-react";
import Divider from "../Divider";

export default function PropertyAmenities() {
  const amenities = [
    {
      icon: <LucideLeaf className="text-2xl text-[#3e3e3e]" />,
      name: "Garden View",
    },
    { icon: <LucideWifi className="text-2xl text-[#3e3e3e]" />, name: "Wifi" },
    {
      icon: <LucideUtensils className="text-2xl text-[#3e3e3e]" />,
      name: "Kitchen",
    },
    {
      icon: <LucideBone className="text-2xl text-[#3e3e3e]" />,
      name: "Pets allowed",
    },
    {
      icon: <LucideWashingMachine className="text-2xl text-[#3e3e3e]" />,
      name: "Free Washer - in building",
    },
    {
      icon: <LucideVideo className="text-2xl text-[#3e3e3e]" />,
      name: "Security Cameras on property",
    },
  ];

  return (
    <>
      <Divider />
      <div className="flex flex-col">
        <h1 className="text-2xl font-serif font-medium text-[#3E3E3E] pb-5">
          What this place offers
        </h1>
        <div className="flex gap-2 items-center">
          <div className="flex flex-row flex-wrap gap-12">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-row gap-8">
                <div className="flex flex-row gap-3 items-center">
                  {amenity.icon}
                  <h1 className="text-base text-[#3E3E3E]">{amenity.name}</h1>
                </div>
                <div className="border-l border-[#E3E2D9] h-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
