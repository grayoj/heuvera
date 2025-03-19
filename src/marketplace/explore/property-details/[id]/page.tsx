"use client";

import NavigationLayout from "@heuvera/components/navigation/navigationbar";
import BookingSection from "@heuvera/components/Property/BookingSection";
import ImportantInfo from "@heuvera/components/Property/ImportantInfo";
import LocationSection from "@heuvera/components/Property/LocationSection";
import PageHeader from "@heuvera/components/Property/PageHeader";
import PropertyAmenities from "@heuvera/components/Property/PropertyAmenities";
import PropertyDetails from "@heuvera/components/Property/PropertyDetails";
import HostInfo from "@heuvera/components/Property/PropertyHost";
import PropertyImages from "@heuvera/components/Property/PropertyImages";
import ReviewsSection from "@heuvera/components/Property/ReviewsSection";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function PropertyDetailsPage() {
    const params = useParams();
    const propertyId = params.id; // Dynamic ID from the URL

    const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"];

    return (
        <NavigationLayout>
            <div className="w-full flex flex-col pb-10 gap-10">
                <PageHeader />
                {/*  */}
                <div className="flex flex-row justify-between gap-10 h-full">
                    <div className="flex flex-col w-7/12 gap-6">
                        <PropertyImages />
                    </div>
                    <div className="flex flex-col w-5/12">
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
        </NavigationLayout>
    );
}
