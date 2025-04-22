"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import AccountHeader from "@heuvera/components/ui/AccountHeader";
import ProfileBanner from "@heuvera/components/ui/ProfileBanner";
import { Button } from "@heuvera/components/ui/button";
import { ArrowUpDown, Newspaper } from "lucide-react";
import { Booking } from "@heuvera/components/ui/BookingTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@heuvera/components/ui/select";
import BookingSkeleton from "@heuvera/components/skeletalpreloader/BookingSkeleton";

const BookingTable = dynamic(
  () => import("@heuvera/components/ui/BookingTable"),
  {
    loading: () => <BookingSkeleton />,
    ssr: false,
  }
);

type SortOption =
  | "latest"
  | "oldest"
  | "priceHighToLow"
  | "priceLowToHigh"
  | "name";

export default function BookingHistory() {
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // Simulating data fetching with loading state
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/bookings/history');

        if (!response.ok) {
          throw new Error('Failed to fetch booking history');
        }

        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchBookings();
  }, []);

  const handleRebook = async (
    propertyId: string | number,
    startDate: Date,
    endDate: Date,
    guests: number
  ) => {
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          checkInDate: startDate.toISOString(),
          checkOutDate: endDate.toISOString(),
          noOfGuests: guests
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      // Add toast notification here
      // toast.success('Booking successful! You can view it in your upcoming bookings.');

    } catch (err) {
      // toast.error('Booking failed. Please try again.');
      console.error(err);
    }
  };

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div>
      <AccountHeader
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
        toggleHelp={toggleHelp} 
        isHelpVisible={isHelpVisible}
      />

      <div className="flex flex-wrap justify-between items-center">
        <h2 className="font-medium text-base pt-5 md:pt-0">Past Bookings</h2>
        <div className="flex space-x-3 md:space-x-5 py-3 items-center">
          <Button
            variant="outline"
            className="hover:cursor-pointer px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
          >
            Export booking report
            <Newspaper className="ml-2 h-4 w-4" />
          </Button>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="hover:cursor-pointer">
              Sort by:
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="name">Property Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <BookingTable
        bookings={bookings}
        isLoading={isLoading}
        error={error}
        onRebook={handleRebook}
        sortBy={sortBy}
      />
    </div>
  );
}