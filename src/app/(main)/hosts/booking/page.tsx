"use client";

import PastBookingTable from "@heuvera/components/booking/PastBookingTable";
import UpcomingBookingTable from "@heuvera/components/booking/UpcomingBookingTable";
import SettingsHeader from "@heuvera/components/header/SettingsHeader";
import PageLayout from "@heuvera/components/ui/PageLayout";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@heuvera/components/ui/select";
import { useState } from "react";

type SortOption =
  | "latest"
  | "oldest"
  | "priceHighToLow"
  | "priceLowToHigh"
  | "name";


export default function BookingManagementPage() {
  const [active, setActive] = useState("past");
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  return (
    <PageLayout>
      <SettingsHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
        className="relative"
      >
        <div className="absolute right-0 bottom-0 flex justify-end items-end mt-4">
          <div
            onClick={() => setActive("upcoming")}
            className={`${active === "upcoming" ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "bg-transparent text-[#898989] dark:text-[#666666]"} py-2 px-4 text-sm rounded-t-xl hover:cursor-pointer`}
          >
            Upcoming Bookings
          </div>
          <div
            onClick={() => setActive("past")}
            className={`${active === "past" ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "bg-transparent text-[#898989] dark:text-[#666666]"} py-2 px-8 rounded-t-xl text-sm rounded-b-[0px] hover:cursor-pointer`}
          >
            Past Bookings
          </div>
        </div>
      </SettingsHeader>

      <div className="flex justify-between items-center mb-4">
        <h3>{active === "upcoming" ? "Upcoming Bookings" : "Past Bookings"}</h3>
        <div className="flex justify-between gap-3 text-[#E3E2D9]">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="hover:cursor-pointer text-[#898989] dark:text-[#666666] ">
              Sort by:
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="name">Property Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {active === "upcoming" ?
        <UpcomingBookingTable
          sortBy={sortBy}
        />
        :
        <PastBookingTable 
        sortBy={sortBy}/>}
    </PageLayout>
  );
}
