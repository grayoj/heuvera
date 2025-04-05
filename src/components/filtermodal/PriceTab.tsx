import { useState } from "react";
import Currency from "../icons/svgs/currency";
import { Slider } from "../ui/slider";
import { PriceTabProps } from "@heuvera/utils/props";

export function PriceTab({ priceRange, setPriceRange }: PriceTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <h3 className="font-medium font-serif text-sm sm:text-base md:text-lg mb-2 sm:mb-4">
        Price range
      </h3>
      <div className="space-y-4 sm:space-y-6">
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={200000}
          step={1000}
          className="w-full"
        />
        <div className="w-full flex items-end justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs sm:text-sm text-[#A7A7A7] underline"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-2 rounded-full p-[1px] bg-[#E3E2D9] dark:bg-[#555555]">
          {isEditing ? (
            <>
              <div className="w-1/2 rounded-full bg-[#E3E2D9] dark:bg-[#555555] p-0.5">
                <div className="w-full rounded-full bg-[#F3F2EC] dark:bg-[#444444] gap-0.5 flex items-center justify-center font-serif">
                  <Currency
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5"
                    color="[#323223]"
                  />
                  <span className="text-xs sm:text-sm">Min:</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-1/2 rounded-full bg-[#F3F2EC] dark:bg-[#444444] sm:py-2 font-serif font-semibold h-9"
                  />
                </div>
              </div>
              <span className="text-xs sm:text-sm">to</span>
              <div className="w-1/2 rounded-full bg-[#E3E2D9] dark:bg-[#555555] p-0.5">
                <div className="w-full rounded-full bg-[#F3F2EC] dark:bg-[#444444] flex items-center justify-center gap-0.5 font-serif">
                  <Currency
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5"
                    color="[#323223]"
                  />
                  <span className="text-xs sm:text-sm">Max:</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-1/2 rounded-full bg-[#F3F2EC] dark:bg-[#444444] sm:py-2 font-serif font-semibold h-9"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-1/2 rounded-full bg-[#E3E2D9] dark:bg-[#555555] p-0.5">
                <div className="w-full rounded-full bg-[#F3F2EC] dark:bg-[#444444] p-1 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 font-serif">
                  <Currency
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    color="[#323223]"
                  />
                  <span className="text-xs sm:text-sm">
                    Min:{" "}
                    <span className="font-semibold font-serif">
                      {priceRange[0].toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
              <div className="border-b border-b-1 border-b-[#E3E2D9] dark:border-b-[#444444] w-6" />
              <div className="w-1/2 rounded-full bg-[#E3E2D9] dark:bg-[#555555] p-0.5">
                <div className="w-full rounded-full bg-[#F3F2EC] dark:bg-[#444444] p-1 sm:p-2 flex items-center justify-center gap-1 sm:gap-2 font-serif">
                  <Currency
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    color="[#323223]"
                  />
                  <span className="text-xs sm:text-sm">
                    Max:{" "}
                    <span className="font-semibold font-serif">
                      {priceRange[1].toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
