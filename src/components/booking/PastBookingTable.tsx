import Image from "next/image";
import { pastAdminBookings } from "../../app/data/array";
import { CheckCircle2, CircleOff, XCircle } from "lucide-react";
import { UserStatus } from "../ui/BookingTable";
import ErrorState from "../errors/table/bookingHistory/ErrorState";
import EmptyState from "../errors/table/bookingHistory/EmptyState";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

export type BookingStatus = "Active" | "Pending" | "Banned";
export type PastBooking = {
  id: string | number;
  propertyImage: string;
  propertyName: string;
  location: string;
  date: string;
  status: BookingStatus;
  pricePaid: number;
  numberOfGuests: number;
};

const getStatusInfo = (
  status: UserStatus,
): {
  icon: React.ReactNode;
  color: string;
  badgeClass: string;
} => {
  switch (status) {
    case "Active":
      return {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        color: "text-green-600",
        badgeClass:
          "text-green-600 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800",
      };
    case "Pending":
      return {
        icon: <CircleOff className="h-4 w-4 text-orange-500" />,
        color: "text-orange-600",
        badgeClass:
          "text-orange-600 border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800",
      };
    case "Banned":
      return {
        icon: <XCircle className="h-4 w-4 text-[#A7A7A7]" />,
        color: "text-red-600",
        badgeClass:
          "text-red-600 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800",
      };
    default:
      const _exhaustiveCheck: never = status;
      return {
        icon: null,
        color: "text-gray-600",
        badgeClass:
          "text-gray-600 border-gray-300 bg-gray-50 dark:bg-gray-900/20 dark:border-[#333333]",
      };
  }
};

type SortOption =
  | "latest"
  | "oldest"
  | "priceHighToLow"
  | "priceLowToHigh"
  | "name";

interface PastBookingTableProps {
  bookings?: PastBooking[];
  isLoading?: boolean;
  error?: string;
  sortBy: SortOption;
}

export default function BookingTable({
  bookings = [],
  isLoading = false,
  error,
  sortBy = "latest",
}: PastBookingTableProps) {
  const PastBookings = useMemo(() => {
    if (bookings.length === 0) return [];

    const sortedList = [...bookings];

    switch (sortBy) {
      case "latest":
        return sortedList.sort((a, b) => {
          const dateA = a.date.split(" - ")[0].split("/").reverse().join("");
          const dateB = b.date.split(" - ")[0].split("/").reverse().join("");
          return dateB.localeCompare(dateA);
        });
      case "oldest":
        return sortedList.sort((a, b) => {
          const dateA = a.date.split(" - ")[0].split("/").reverse().join("");
          const dateB = b.date.split(" - ")[0].split("/").reverse().join("");
          return dateA.localeCompare(dateB);
        });
      case "name":
        return sortedList.sort((a, b) =>
          a.propertyName.localeCompare(b.propertyName),
        );
      default:
        return sortedList;
    }
  }, [bookings, sortBy]);

  // // Show error state
  if (error) {
    return (
      <ErrorState
        errorMessage="Failed to load booking history."
        error={error}
      />
    );
  }

  // // // Show empty state
  if (!isLoading && bookings.length === 0) {
    return (
      <EmptyState
        errorMessage="No Bookings History"
        errorSubMessage="You don't have any past bookings yet."
      />
    );
  }

  const TableHeadings = [
    {
      title: "S/N",
    },
    {
      title: "Property Image",
    },
    {
      title: "Property Name",
    },
    {
      title: "Location",
    },
    {
      title: "Check-In Date & Check-Out Date",
    },
    {
      title: "Booking Status",
    },
    {
      title: "Price Paid",
    },
    {
      title: "Number of Guests",
    },
  ];
  return (
    <div className="rounded-md border border-[#D3D2C9] dark:border-[#666666] relative 2xl:w-full xl:w-full lg:overflow-x-auto md:overflow-x-auto sm:overflow-x-auto">
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#E3E2D9] border-b border-[#D3D2C9] dark:border-b-[#666666] dark:bg-[#555555] hover:bg-[#E3E2D999] dark:hover:bg-[#666666]">
              {TableHeadings.map((heading) => (
                <TableHead className="text-[#444444] dark:text-[#F7F7F7] text-center border-x border-[#D3D2C9] dark:border-[#666666] last:border-x-0 first:border-x-0">
                  {heading.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#F8F7F2] dark:bg-[#333333]">
            {PastBookings.map((booking, index) => {
              const statusInfo = getStatusInfo(booking.status);
              return (
                <TableRow
                  key={booking.id}
                  className="hover:bg-[#F0EFE9] dark:hover:bg-[#44444422]"
                >
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] first:border-l-0">
                    {index + 1}
                  </TableCell>
                  <TableCell className="flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <Image
                        src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="rounded-sm"
                        height={36}
                        width={72}
                        alt="booking history"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] break-words">
                    {booking.propertyName}
                  </TableCell>
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] break-words">
                    {booking.location}
                  </TableCell>
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] whitespace-nowrap">
                    {booking.date}
                  </TableCell>
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      {statusInfo.icon}
                      <Badge
                        variant="outline"
                        className={statusInfo.badgeClass}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] whitespace-nowrap">
                    {booking.pricePaid}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {booking.numberOfGuests}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Cards (Visible on Small Screens) */}
      <div className="block md:hidden space-y-4 gap-5">
        {pastAdminBookings.map((booking, index) => (
          <div
            key={index}
            className="bg-[#F8F7F2] dark:bg-[#333333] p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <Image
                src="https://picsum.photos/50/36"
                className="rounded-md"
                height={36}
                width={50}
                alt="Property Image"
              />
              <div>
                <h3 className="font-semibold text-[#333333] dark:text-[#]">
                  {booking.name}
                </h3>
                <p className="text-xs text-[#898989] dark:text-[#666666]">
                  {booking.location}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm space-y-1">
              <p>
                <span className="font-medium">Check-In & Out:</span>{" "}
                {booking.date}
              </p>
              <p>
                <span className="font-medium">Status:</span> {booking.status}
              </p>
              <p>
                <span className="font-medium">Price Paid:</span>{" "}
                {booking.pricePaid}
              </p>
              <p>
                <span className="font-medium">Guests:</span>{" "}
                {booking.noOfGuests}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
