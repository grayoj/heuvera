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
  return (
    <PageLayout>
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
        className="relative"
      >
        <div className="absolute right-0 bottom-0 flex justify-end items-end mt-4">
          <div
            onClick={() => setActive("upcoming")}
            className={`${active === "upcoming" ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "bg-transparent text-white"} py-2 px-6 rounded-t-xl hover:cursor-pointer`}
          >
            Upcoming Bookings
          </div>
          <div
            onClick={() => setActive("past")}
            className={`${active === "past" ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] text-white" : "bg-transparent text-white"} py-2.5 px-12 rounded-t-xl rounded-b-[0px] hover:cursor-pointer text-black`}
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
