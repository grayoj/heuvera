import { propertyListings } from '@heuvera/app/data/array';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import { Button } from '@heuvera/components/ui/button';
import PropertyCard from '@heuvera/components/property/PropertyCard'; // Import the new reusable component

export default function Page() {
  return (
    <div>
      <AccountHeader
        heading="Property Listings"
        subheading="Manage and view all properties you’ve listed for rent or lease"
      >
        <Button variant="outline" className="rounded-full">
          + Add another property
        </Button>
      </AccountHeader>

      {propertyListings.map((property, index) => (
        <PropertyCard key={index} property={property} /> // Use the reusable component
      ))}
    </div>
  );
}
