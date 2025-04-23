"use client";

import PastBookingTable from "@heuvera/components/booking/PastBookingTable";
import UpcomingBookingTable from "@heuvera/components/booking/UpcomingBookingTable";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import { Button } from "@heuvera/components/ui/button";
import PageLayout from "@heuvera/components/ui/PageLayout";
import { MessageSquare, Pencil, X } from "lucide-react";
import { useState } from "react";

export default function BookingManagementPage() {
  const [active, setActive] = useState("upcoming");
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  return (
    <PageLayout>
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
        className="relative"
        toggleHelp={toggleHelp} 
        isHelpVisible={isHelpVisible}
      >
        <div className="absolute right-30 bottom-0 flex justify-end items-end mt-4">
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
      </AccountHeader>

      <div className="flex justify-between items-center mb-4">
        <h3>Upcoming Bookings</h3>
        <div className="flex justify-between gap-3 text-[#E3E2D9]">
          <Button variant="outline" className="cursor-pointer bg-transparent">
            Modify <Pencil />{" "}
          </Button>
          <Button variant="outline" className="cursor-pointer bg-transparent">
            Cancel <X />
          </Button>
          <Button variant="default" className="cursor-pointer bg-[#7B4F3A]">
            Contact Guest <MessageSquare />
          </Button>
        </div>
      </div>
      {active === "upcoming" ? <UpcomingBookingTable /> : <PastBookingTable />}
    </PageLayout>
  );
}
