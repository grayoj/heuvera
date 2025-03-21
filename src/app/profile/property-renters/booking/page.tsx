import BookingTable from '@heuvera/components/ui/Table';
import { Button } from '@heuvera/components/ui/button';

export default function BookingHistory() {
  return (
    <div>
      <div className="border-b pb-5 mb-5">
        <h2 className="text-[1.25rem] font-medium">Booking Management</h2>
        <p className="text-[#898989] font-normal text-[14px]">
          Track upcoming, ongoing, and past bookings in one place
        </p>
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium text-[1.125rem]">Past Bookings</h2>
        <div className="flex space-x-[0.6875rem]">
          <Button
            variant="default"
            className="bg-[#7B4F3A] py-[0.6875rem] px-[2.5rem] rounded-full"
          >
            Rebook
          </Button>
          <Button
            variant="outline"
            className="py-[0.6875rem] px-[2.5rem] rounded-full"
          >
            Export booking report
          </Button>
          <Button
            variant="outline"
            className="py-[0.6875rem] px-[2.5rem] rounded-full"
          >
            Sort by:
          </Button>
        </div>
      </div>

      <BookingTable />
    </div>
  );
}
