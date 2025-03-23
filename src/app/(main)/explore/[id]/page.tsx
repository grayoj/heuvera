import BookingSection from '@heuvera/components/property/BookingSection';
import ImportantInfo from '@heuvera/components/property/ImportantInfo';
import LocationSection from '@heuvera/components/property/LocationSection';
import PageHeader from '@heuvera/components/property/PageHeader';
import PropertyAmenities from '@heuvera/components/property/PropertyAmenities';
import PropertyDetails from '@heuvera/components/property/PropertyDetails';
import HostInfo from '@heuvera/components/property/PropertyHost';
import PropertyImages from '@heuvera/components/property/PropertyImages';
import ReviewsSection from '@heuvera/components/property/ReviewsSection';

export default function ExploreViewPage() {
  return (
    <div className="w-full flex flex-col pb-10 gap-10 px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20">
      <PageHeader />
      {/*  */}
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-10 h-full">
        <div className="flex flex-col w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 gap-6">
          <PropertyImages />
        </div>
        <div className="flex flex-col w-12/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12">
          <div className="w-full flex flex-col">
            <PropertyDetails />
            <BookingSection />
            <div className="">
              <HostInfo />
            </div>
            <div className="flex flex-col">
              <PropertyAmenities />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ReviewsSection />
      </div>
      <div className="">
        <LocationSection />
      </div>
      <div className="">
        <ImportantInfo />
      </div>
    </div>
  );
}
