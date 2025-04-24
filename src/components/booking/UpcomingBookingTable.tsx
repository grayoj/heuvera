import {
  CheckCircle2,
  CircleOff,
  MessageSquare,
  Pencil,
  X,
  XCircle,
} from "lucide-react";
import { upcomingBookings } from "../../app/data/array";
import { UserStatus } from "../ui/BookingTable";
import { useMemo } from "react";
import EmptyState from "../errors/table/bookingHistory/EmptyState";
import ErrorState from "../errors/table/bookingHistory/ErrorState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export type BookingStatus = "Active" | "Pending" | "Banned";
export type Booking = {
  id: string | number;
  guestName: string;
  propertyName: string;
  date: string;
  status: BookingStatus;
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

interface UpcomingBookingTableProps {
  bookings?: Booking[];
  isLoading?: boolean;
  error?: string;
  sortBy: SortOption;
}

export default function UpcomingBookingTable({
  bookings = [],
  isLoading = false,
  error,
  sortBy = "latest",
}: UpcomingBookingTableProps) {
  const sortedBookings = useMemo(() => {
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
          a.guestName.localeCompare(b.guestName),
        );
      default:
        return sortedList;
    }
  }, [bookings, sortBy]);

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
      title: "Guest Name",
    },
    {
      title: "Check-In Date & Check-Out Date",
    },
    {
      title: "Property Name",
    },
    {
      title: "Booking Status",
    },
    {
      title: "Actions",
    },
  ];
  return (
    <div className="relative overflow-x-auto space-y-4">
      <div className="rounded-md border border-[#D3D2C9] dark:border-[#666666] bg-[#F8F7F2] dark:bg-bg-[#333333] overflow-hidden">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E2D9] dark:bg-[#555555] hover:bg-[#E3E2D999] dark:hover:bg-[#666666] border-b border-[#D3D2C9] dark:border-b-[#666666]">
                {TableHeadings.map((heading) => (
                  <TableHead className="text-center border-x border-[#D3D2C9] dark:border-[#666666] last:border-x-0 first:border-x-0">
                    {heading.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#F8F7F2] dark:bg-[#333333]">
              {sortedBookings.map((booking, index) => {
                const statusInfo = getStatusInfo(booking.status);
                return (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-[#F0EFE9] dark:hover:bg-[#44444422]"
                  >
                    <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] first:border-l-0">
                      {index + 1}
                    </TableCell>
                    <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                      {booking.guestName}
                    </TableCell>
                    <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                      {booking.date}
                    </TableCell>
                    <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                      {booking.propertyName}
                    </TableCell>
                    <TableCell className="break-words border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
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
                    <TableCell className="flex justify-center items-center">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                        >
                          Modify
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                        >
                          Rebook
                          <X className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                        >
                          Rebook
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View: Cards (Visible on Small Screens) */}
      <div className="block md:hidden space-y-4 p-4">
        {sortedBookings.map((booking) => {
          const statusInfo = getStatusInfo(booking.status);
          return (
            <div
              key={booking.id}
              className="bg-[#F8F7F2] dark:bg-[#333333] p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {booking.guestName}
                  </h3>
                  <p className="text-xs text-[#898989] dark:text-[#666666]">
                    {booking.propertyName}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-sm space-y-1 dark:text-gray-200">
                <p>
                  <span className="font-medium">Check-In & Out:</span>{" "}
                  {booking.date}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <div className="inline-flex items-center gap-1">
                    {statusInfo.icon}
                    <Badge variant="outline" className={statusInfo.badgeClass}>
                      {booking.status}
                    </Badge>
                  </div>
                </p>
                <div className="mt-3 flex gap-3 flex-wrap">
                  <Button
                    size="sm"
                    className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                  >
                    Modify
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                  >
                    Cancel
                    <X className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                  >
                    Contact Guest
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
