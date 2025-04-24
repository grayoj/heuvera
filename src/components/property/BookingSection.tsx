"use client";

import { useState } from "react";
import { Button } from "@heuvera/components/ui/button";
import { IoCalendarOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import Divider from "../Divider";
import { DateRange } from "react-day-picker";
import { format, addDays } from "date-fns";
import { Calendar } from "@heuvera/components/ui/calendar";
import SectionHeaderText from "../text/SectionHeaderText";

export default function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState("1 Guest");
  const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"];

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const formatDateRange = () => {
    if (!dateRange || !dateRange.from) return "Select dates";

    if (!dateRange.to) {
      return format(dateRange.from, "MMM d");
    }

    return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
  };

  return (
    <>
      <Divider />
      <SectionHeaderText title="Create Booking" />
      <div className="flex flex-col gap-8 mt-1">
        <div className="w-full gap-8 flex flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between">
          <div className="flex flex-col gap-2 md:gap-4 w-12/12 md:w-12/12 lg:w-12/12 xl:w-6/12 2xl:w-6/12 relative">
            <h1 className="text-sm md:text-base font-normal text-[#333333] dark:text-[#666666]">
              Check Availability
            </h1>
            <div className="h-14 w-full border border-[#333333] dark:border-[#555555] rounded-full flex items-center justify-between relative px-6">
              <h1 className="text-[#333333] dark:text-[#555555] text-base font-serif">
                {formatDateRange()}
              </h1>
              <button
                className="rounded-full size-10 bg-[#7B4F3A] dark:bg-[#8B5F4D] absolute right-2 flex items-center justify-center"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                type="button"
              >
                <IoCalendarOutline className="text-xl text-white dark:text-[#333333]" />
              </button>
            </div>

            {isCalendarOpen && (
              <div className="absolute top-[100px] left-0 bg-[#F3F2EC] dark:bg-[#333333] border border-[#333333] dark:border-[#666666] rounded-xl shadow-lg z-20 p-4 pt-6">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                  className="bg-transparent scale-110 origin-center"
                  styles={{
                    day: { width: "40px", height: "40px" },
                    month: { width: "100%" },
                    caption_label: { fontSize: "1rem" },
                    head_cell: { fontSize: "0.9rem", width: "40px" },
                  }}
                />
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white hover:bg-[#6a4331] h-12 w-full text-base rounded-lg"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 md:gap-4 relative w-12/12 md:w-12/12 lg:w-12/12 xl:w-6/12 2xl:w-6/12">
            <h1 className="text-sm md:text-base font-serif font-normal text-[#333333] dark:text-[#666666]">
              Guests:
            </h1>

            <div
              className="h-14 w-full border border-[#333333] dark:border-[#666666] rounded-full flex items-center justify-between px-6 cursor-pointer relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h1 className="text-[#333333] dark:text-[#666666] text-base font-serif">
                {selectedGuests}
              </h1>

              <div className="text-[#333333] dark:text-[#666666]">
                {isOpen ? (
                  <IoChevronUp className="text-2xl" />
                ) : (
                  <IoChevronDown className="text-2xl" />
                )}
              </div>
            </div>

            {isOpen && (
              <div className="absolute top-[100px] w-full bg-[#F3F2EC] dark:bg-[#333333] border border-[#333333] rounded-xl shadow-lg py-3 z-10">
                {guestOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 text-[#333333] dark:text-[#666666] hover:bg-[#7B4F3A] dark:hover:bg-[#8B5F4D] hover:text-white dark:hover:text-[#F3F2EC] cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedGuests(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="default"
          className="h-14 w-full bg-[#7B4F3A] dark:bg-[#8B5F4D] rounded-lg font-serif font-semibold hover:bg-[#7B4F3A] transition-transform duration-300 hover:scale-105 hover:shadow-lg text-"
        >
          Book Now
        </Button>
      </div>
    </>
  );
}
