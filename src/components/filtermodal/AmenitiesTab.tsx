import { AMENITIES_CONFIG } from "@heuvera/app/data/array";
import { cn } from "@heuvera/lib/utils";
import { AmenitiesTabProps } from "@heuvera/utils/props";
import { CheckIcon } from "lucide-react";

export function AmenitiesTab({ amenities, toggleAmenity }: AmenitiesTabProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="font-medium text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
        Amenities
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {AMENITIES_CONFIG.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={cn(
              "flex items-center gap-1 sm:gap-2 rounded-full py-2 px-3 sm:py-3 sm:px-4 border text-xs sm:text-sm",
              amenities.includes(name)
                ? "bg-[#7B4F3A44] dark:bg-[#8B5F4D44] border-[#7B4F3A] dark:border-[#8B5F4D]"
                : "bg-[#f0efe9] dark:bg-[#555555]",
            )}
            onClick={() => toggleAmenity(name)}
          >
            <div
              className={cn(
                "flex items-center justify-center",
                amenities.includes(name)
                  ? "bg-[#f8efe9] dark:bg-[#555555]"
                  : "",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5",
                  amenities.includes(name)
                    ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                    : "text-black dark:text-gray-100",
                )}
              />
            </div>
            <span
              className={cn(
                "",
                amenities.includes(name)
                  ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                  : "text-black dark:text-gray-100",
              )}
            >
              {name}
            </span>
            {amenities.includes(name) && (
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4 sm:h-5 sm:w-5",
                  amenities.includes(name)
                    ? "text-[#7B4F3A] dark:text-[#8B5F4D]"
                    : "text-[#7B4F3A] dark:text-[#8B5F4D]",
                )}
              />
            )}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-1 text-xs sm:text-sm mt-2 sm:mt-4">
        Show more
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
