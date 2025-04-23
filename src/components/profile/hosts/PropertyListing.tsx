"use client";

import { propertyListings } from "@heuvera/app/data/array";
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import { Button } from "@heuvera/components/ui/button";
import PropertyCard from "@heuvera/components/property/PropertyCard";
import PageLayout from "@heuvera/components/ui/PageLayout";
import { useState } from "react";
import AddPropertyModal from "@heuvera/components/property/Modals/AddPropertyModal";
import EditPropertyModal from "@heuvera/components/property/Modals/EditPropertyModal";

export default function PropertyListingsPage() {
  const [open, setOpen] = useState("");
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  return (
    <PageLayout>
      <AccountHeader
        heading="Property Listings"
        subheading="Manage and view all properties you’ve listed for rent or lease"
        toggleHelp={toggleHelp} 
        isHelpVisible={isHelpVisible}
      >
        <Button
          onClick={() => setOpen("add")}
          variant="outline"
          className="bg-transparent cursor-pointer"
        >
          + Add another property
        </Button>
      </AccountHeader>

      {propertyListings.map((property, index) => (
        <PropertyCard
          open={open}
          setOpen={setOpen}
          showActBtns={true}
          key={index}
          property={property}
        />
      ))}

      {open === "add" && <AddPropertyModal open={open} setOpen={setOpen} />}
      {open === "edit" && <EditPropertyModal open={open} setOpen={setOpen} />}
    </PageLayout>
  );
}
