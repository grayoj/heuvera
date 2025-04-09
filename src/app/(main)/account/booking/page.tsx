"use client";

import AccountHeader from "@heuvera/components/ui/AccountHeader";
import BookingTable from "@heuvera/components/ui/BookingTable";
import ProfileBanner from "@heuvera/components/ui/ProfileBanner";
import { Button } from "@heuvera/components/ui/button";
import { ArrowDown, Newspaper } from "lucide-react";
import { RotateCw } from "lucide-react";
import { useState } from "react";

export default function BookingHistory() {
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  return (
    <div>
      <ProfileBanner toggleHelp={toggleHelp} isHelpVisible={isHelpVisible} />
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
      />

      <div className="flex flex-wrap justify-between items-center">
        <h2 className="font-medium text-base pt-5 md:pt-0">Past Bookings</h2>
        <div className="flex space-x-3 md:space-x-5 py-3 items-center">
          <Button
            variant="default"
            className="bg-[#7B4F3A] hover:bg-[#664130] text-white hover:cursor-pointer px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
          >
            Rebook
            <RotateCw />
          </Button>
          <Button
            variant="outline"
            className="hover:cursor-pointer px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
          >
            Export booking report
            <Newspaper />
          </Button>
          <Button
            variant="outline"
            className="hover:cursor-pointer px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
          >
            Sort by:
            <ArrowDown />
          </Button>
        </div>
      </div>

      <BookingTable />
    </div>
  );
}
