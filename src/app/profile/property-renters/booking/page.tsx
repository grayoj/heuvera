import AccountHeader from '@heuvera/components/ui/AccountHeader';
import BookingTable from '@heuvera/components/ui/Table';
import { Button } from '@heuvera/components/ui/button';
import { ArrowDown, Newspaper } from 'lucide-react';

export default function BookingHistory() {
  return (
    <div>
      <AccountHeader heading='Booking Management' subheading='Track upcoming, ongoing, and past bookings in one place' />

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium text-[1.125rem]">Past Bookings</h2>
        <div className="flex space-x-[0.6875rem]">
          <Button
            variant="default"
            className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full hover:bg-[#664130] hover:cursor-pointer"
          >
            Rebook
          </Button>
          <Button
            variant="outline"
            className="py-[0.6875rem] px-[2.5rem] rounded-full hover:cursor-pointer"
          >
            Export booking report
            <Newspaper />
          </Button>
          <Button
            variant="outline"
            className="py-[0.6875rem] px-[2.5rem] rounded-full  hover:cursor-pointer"
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
