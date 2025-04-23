"use client";

import dynamic from "next/dynamic";

const PropertyListingsPage = dynamic(()=> import("@heuvera/components/profile/hosts/PropertyListing"));

export default function PropertyListings() {

  return (
<PropertyListingsPage/>
  );
}
