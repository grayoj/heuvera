import { NUMBER_OPTIONS } from "@heuvera/app/data/array";
import { cn } from "@heuvera/lib/utils";
import { RoomsTabProps } from "@heuvera/utils/props";

export function RoomsTab({
  bedrooms,
  beds,
  bathrooms,
  onSelect,
}: RoomsTabProps) {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5 overflow-y-auto">
      {Object.entries(NUMBER_OPTIONS).map(([type, options], index, array) => (
        <div key={type}>
          <h3 className="font-medium mb-2 text-sm capitalize">{type}</h3>
          <div className="flex gap-1 sm:gap-2 flex-wrap bg-[#E3E2D9] dark:bg-[#555555] rounded-full min-w-fit max-w-fit p-1">
            {options.map((num) => (
              <button
                key={`${type}-${num}`}
                className={cn(
                  "rounded-full py-1 px-1 sm:py-2 sm:px-2 md:py-1 md:px-3 text-xs sm:text-smzz",
                  { bedrooms, beds, bathrooms }[type] === num
                    ? "bg-[#F3F2EC] dark:bg-[#444444] shadow shadow-lg"
                    : "bg-[#E3E2D9] dark:bg-[#555555]",
                )}
                onClick={() =>
                  onSelect(type as "bedrooms" | "beds" | "bathrooms", num)
                }
              >
                {num}
              </button>
            ))}
          </div>
          {index < array.length - 1 && (
            <div className="border-b border-[#E3E2D9] dark:border-[#555555] w-full my-3 sm:my-4 md:my-5" />
          )}
        </div>
      ))}
    </div>
  );
}
