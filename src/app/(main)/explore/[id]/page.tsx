"use client";

import { memo, useState, useEffect } from "react";
import BookingSection from "@heuvera/components/property/BookingSection";
import ImportantInfo from "@heuvera/components/property/ImportantInfo";
import LocationSection from "@heuvera/components/property/LocationSection";
import PageHeader from "@heuvera/components/property/PageHeader";
import PropertyAmenities from "@heuvera/components/property/PropertyAmenities";
import PropertyDetails from "@heuvera/components/property/PropertyDetails";
import HostInfo from "@heuvera/components/property/PropertyHost";
import PropertyImages from "@heuvera/components/property/PropertyImages";
import ReviewsSection from "@heuvera/components/property/ReviewsSection";
import PropertyDetailsSkeletalPreloader from "@heuvera/components/skeletalpreloader/propertydetails";
import { Property } from "@heuvera/utils/props";
import { useParams } from "next/navigation";
import { PropertyData } from "@heuvera/components/data/PropertyData";

const ExploreViewPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const propertyId = Number(id);

    if (!isNaN(propertyId)) {
      const selectedProperty = PropertyData.find((p) => p.id === propertyId);
      if (selectedProperty) {
        setProperties([selectedProperty]);
      }
    }

    setTimeout(() => setLoading(false), 2000);
  }, [params.id]);

  if (loading) return <PropertyDetailsSkeletalPreloader />;

  return (
    <div className="w-full flex flex-col pb-10 gap-10 px-4 md:px-20 lg:px-20 xl:px-20 2xl:px-20">
      <PageHeader />
      {properties.map((property, index) => (
        <div key={index}>
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-10 h-full">
            <div className="flex flex-col w-12/12 md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 gap-6">
              <PropertyImages images={property.images} />
            </div>
            <div className="flex flex-col w-12/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12">
              <div className="w-full flex flex-col">
                <PropertyDetails
                  propertyName={property.propertyName}
                  propertyDetails={property.propertyDetails}
                  propertyDescription={property.propertyDescription}
                />
                <BookingSection />
                <div>
                  <HostInfo propertyHost={property.propertyHost} />
                </div>
                <div className="flex flex-col">
                  <PropertyAmenities amenities={property.amenities} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReviewsSection reviews={property.reviews || []} />
          </div>
          <div>
            <LocationSection
              position={property.location?.position}
              locationName={property.location?.name}
              locationDetails={property.location?.details}
            />
          </div>
          <div>
            <ImportantInfo
              title={property.importantInfo?.title || "Important Information"}
              items={property.importantInfo?.items || []}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ExploreViewPage);
