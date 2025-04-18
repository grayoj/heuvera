import { IoBed, IoPerson } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import BadgeCheck from "@heuvera/components/icons/svgs/badgeCheck";

export default function PropertyDetails({
  price,
  address,
  beds,
  baths,
  guests,
  isVerified,
  rating,
}: {
  price: number;
  address: string;
  beds: number;
  baths: number;
  guests: number;
  isVerified: boolean;
  rating: number;
}) {
  return (
    <div className="h-24 md:h-24 lg:h-24 xl:h-24 2xl:h-28 flex flex-col justify-evenly">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl text-[#3F3B2B] dark:text-[#A7A7A7] font-semibold font-serif">
          ₦{(price ?? 0).toLocaleString()}
          <span className="text-sm text-[#898989] dark:text-[#666666] font-serif font-normal">
            {" "}
            /night
          </span>
        </h1>
        {isVerified && (
          <BadgeCheck
            className="dark:#8B5F4D size-6 md:size-6 lg:size-5 xl:size-4 2xl:size-6"
            color="#7B4F3A"
          />
        )}
      </div>
      <div className="flex flex-row">
        <h1 className="text-sm md:text-sm lg:text-xs xl:text-xs 2xl:text-sm text-[#505050] dark:text-[#666666] font-normal font-serif">
          {address}
        </h1>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 md:gap-5 lg:gap-3 xl:gap-3 2xl:gap-5">
          <div className="gap-1 flex items-center">
            <IoBed className="text-[#898989] dark:text-[#666666] text-xl md:text-base lg:text-sm xl:text-base 2xl:text-xl" />
            <h1 className="text-[#898989] dark:text-[#666666] text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-serif">
              {beds}
            </h1>
          </div>
          <div className="gap-1 flex items-center">
            <FaBath className="text-[#898989] dark:text-[#666666] text-base md:text-base lg:text-xs xl:text-sm 2xl:text-base" />
            <h1 className="text-[#898989] dark:text-[#666666] text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-serif">
              {baths}
            </h1>
          </div>
          <div className="gap-1 flex items-center">
            <IoPerson className="text-[#898989] dark:text-[#666666] text-xl md:text-base lg:text-sm xl:text-base 2xl:text-xl" />
            <h1 className="text-[#898989] dark:text-[#666666] text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-serif">
              {guests}
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <h1 className="text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-medium font-serif text-[#898989] dark:text-[#666666]">
            {rating}
          </h1>
          <FaStar className="text-yellow-400 dark:text-yellow-400 text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base md:text-sm lg:text-base xl:text-base 2xl:text-base" />
        </div>
      </div>
    </div>
  );
}
