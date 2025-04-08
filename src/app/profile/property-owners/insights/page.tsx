import { propertyListings } from '@heuvera/app/data/array';
import BookingContainer from '@heuvera/components/booking/BookingContainer';
import PropertyCard from '@heuvera/components/property/PropertyCard';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import { Button } from '@heuvera/components/ui/button';
import PageLayout from '@heuvera/components/ui/PageLayout';

export default function Page() {
  return (
    <PageLayout>
      <AccountHeader
        heading="Property Insights"
        subheading="Analyze booking trends, occupancy rates, and performance metrics for your listings."
      >
        <Button
          variant="default"
          className="bg-[#7B4F3A] font-medium cursor-pointer text-xs"
        >
          Export Analytics Report
        </Button>
      </AccountHeader>

      <div className="flex space-x-4 h-[60%]">
        <BookingContainer className="border w-[70%] text-xl pt-5 pl-5">
          Booking Trend
        </BookingContainer>
        <BookingContainer className="border w-[30%] h-full p-4">
          <PropertyCard showActBtns={false} className='w-fit h-fit' property={propertyListings[0]} />
        </BookingContainer>
      </div>
    </PageLayout>
  );
}
