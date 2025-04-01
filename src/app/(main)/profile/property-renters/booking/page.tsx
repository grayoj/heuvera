import AccountHeader from "@heuvera/components/ui/AccountHeader";
import BookingTable from "@heuvera/components/ui/Table";
import { Button } from "@heuvera/components/ui/button";
import { ArrowDown, Newspaper } from "lucide-react";
import { RotateCw } from "lucide-react";

export default function BookingHistory() {
  return (
    <div>
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
      />

      <div className="flex justify-between items-center">
        <h2 className="font-medium text-base">Past Bookings</h2>
        <div className="flex space-x-5 py-3 items-center">
          <Button
            variant="default"
            className="bg-[#7B4F3A] hover:bg-[#664130] hover:cursor-pointer"
          >
            Rebook
          <RotateCw/>
          </Button>
          <Button
            variant="outline"
            className="hover:cursor-pointer bg-[#F8F7F2]"
          >
            Export booking report
            <Newspaper />
          </Button>
          <Button
            variant="outline"
            className="hover:cursor-pointer bg-[#F8F7F2]"
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
