import AdminBookingTable from '@heuvera/components/booking/AdminBookingTable';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import { Button } from '@heuvera/components/ui/button';

export default function Page() {
  return (
    <div>
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
      >
        <div className="relative">
            <Button
              variant="outline"
              className="py-[0.6875rem] px-[2.5rem] rounded-t-xl hover:cursor-pointer bg-[#F5F5F0] absolute right-36 rounded-b-[0px]"
            >Upcoming Bookings</Button>
            <Button
              variant="default"
              className="py-[0.6875rem] px-[2.5rem] rounded-t-xl rounded-b-[0px] hover:cursor-pointer bg-[#E3E2D9]"
            >Past Bookings</Button>
        </div>
      </AccountHeader>

      <AdminBookingTable />
    </div>
  );
}
