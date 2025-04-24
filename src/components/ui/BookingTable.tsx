import { useMemo } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  CircleOff,
  XCircle,
  Calendar,
  CalendarPlus,
  Users,
} from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./dialog";
import { FormLabel } from "./form";
import { Input } from "./input";
import { Calendar as CalendarComponent } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { format } from "date-fns";
import { useState } from "react";
import ErrorState from "../errors/table/bookingHistory/ErrorState";
import EmptyState from "../errors/table/bookingHistory/EmptyState";

export type UserStatus = "Active" | "Pending" | "Banned";
export type Booking = {
  id: string | number;
  name: string;
  location: string;
  date: string;
  status: UserStatus;
  pricePaid: string;
  noOfGuests: number;
  imageUrl: string;
  propertyId?: string | number;
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

interface BookingTableProps {
  bookings?: Booking[];
  isLoading?: boolean;
  error?: string;
  onRebook?: (
    propertyId: string | number,
    startDate: Date,
    endDate: Date,
    guests: number,
  ) => void;
  sortBy: SortOption;
}

export default function BookingTable({
  bookings = [],
  isLoading = false,
  error,
  onRebook,
  sortBy = "latest",
}: BookingTableProps) {
  const [isRebookModalOpen, setIsRebookModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

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
      case "priceHighToLow":
        return sortedList.sort((a, b) => {
          const priceA = parseFloat(a.pricePaid.replace(/[^0-9.]/g, ""));
          const priceB = parseFloat(b.pricePaid.replace(/[^0-9.]/g, ""));
          return priceB - priceA;
        });
      case "priceLowToHigh":
        return sortedList.sort((a, b) => {
          const priceA = parseFloat(a.pricePaid.replace(/[^0-9.]/g, ""));
          const priceB = parseFloat(b.pricePaid.replace(/[^0-9.]/g, ""));
          return priceA - priceB;
        });
      case "name":
        return sortedList.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedList;
    }
  }, [bookings, sortBy]);

  const openRebookModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setGuests(booking.noOfGuests);
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setIsRebookModalOpen(true);
  };

  const handleModalClose = () => {
    setIsRebookModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSubmitRebook = () => {
    if (selectedBooking && checkInDate && checkOutDate && onRebook) {
      onRebook(
        selectedBooking.propertyId || selectedBooking.id,
        checkInDate,
        checkOutDate,
        guests,
      );
      handleModalClose();
    }
  };

  // Show error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Show empty state
  if (!isLoading && bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#E3E2D9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-bg-[#333333] overflow-hidden">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E3E2D944] dark:bg-[#33333366] hover:bg-[#E3E2D955] dark:hover:bg-[#44444466]">
                <TableHead>S/N</TableHead>
                <TableHead>Property Image</TableHead>
                <TableHead>Property Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Check-In & Check-Out</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Price Paid</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.map((booking, index) => {
                const statusInfo = getStatusInfo(booking.status);

                return (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-[#F0EFE9] dark:hover:bg-[#44444422]"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="flex justify-center items-center py-2">
                      <Image
                        src={booking.imageUrl}
                        className="rounded-sm my-1.5"
                        height={36}
                        width={72}
                        alt={`${booking.name} property image`}
                      />
                    </TableCell>
                    <TableCell className="break-words">
                      {booking.name}
                    </TableCell>
                    <TableCell className="break-words">
                      {booking.location}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {booking.date}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {statusInfo.icon}
                        <Badge
                          variant="outline"
                          className={statusInfo.badgeClass}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {booking.pricePaid}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {booking.noOfGuests}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => openRebookModal(booking)}
                        size="sm"
                        className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-3 py-1 h-8 text-xs font-medium flex items-center gap-1"
                      >
                        <CalendarPlus className="h-3.5 w-3.5" />
                        Rebook
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
                  <Image
                    src={booking.imageUrl}
                    className="rounded-md"
                    height={36}
                    width={50}
                    alt={`${booking.name} property image`}
                  />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {booking.name}
                    </h3>
                    <p className="text-xs text-[#898989] dark:text-gray-300">
                      {booking.location}
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
                      <Badge
                        variant="outline"
                        className={statusInfo.badgeClass}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </p>
                  <p>
                    <span className="font-medium">Price Paid:</span>{" "}
                    {booking.pricePaid}
                  </p>
                  <p>
                    <span className="font-medium">Guests:</span>{" "}
                    {booking.noOfGuests}
                  </p>
                  <div className="mt-3">
                    <Button
                      onClick={() => openRebookModal(booking)}
                      size="sm"
                      className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white rounded px-4 py-2 h-9 text-sm font-medium flex items-center gap-1 w-full justify-center"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      Rebook This Property
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rebook Modal */}
      <Dialog open={isRebookModalOpen} onOpenChange={setIsRebookModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" />
              Rebook Property
            </DialogTitle>
            <DialogDescription>
              {selectedBooking
                ? `Rebook your stay at ${selectedBooking.name}`
                : "Rebook your stay"}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="flex items-center gap-4 p-2 bg-[#F0EFE9] dark:bg-[#333333] rounded-md">
              <Image
                src={selectedBooking.imageUrl}
                className="rounded-md"
                height={60}
                width={80}
                alt={`${selectedBooking.name} property image`}
              />
              <div>
                <h3 className="font-medium dark:text-white">
                  {selectedBooking.name}
                </h3>
                <p className="text-xs text-[#898989] dark:text-gray-300">
                  {selectedBooking.location}
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Check-in Date */}
              <div className="space-y-2">
                <FormLabel>Check-in Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!checkInDate && "text-gray-400"}`}
                    >
                      {checkInDate ? (
                        format(checkInDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <FormLabel>Check-out Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!checkOutDate && "text-gray-400"}`}
                    >
                      {checkOutDate ? (
                        format(checkOutDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) =>
                        date < new Date() ||
                        (checkInDate ? date <= checkInDate : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Number of Guests */}
            <div className="space-y-2">
              <FormLabel>Number of Guests</FormLabel>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  value={guests}
                  onChange={(e) =>
                    setGuests(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  className="border-[#E3E2D9] dark:border-[#555555]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="text-gray-500">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="bg-[#7B4F3A] hover:bg-[#6A4230] text-white"
              onClick={handleSubmitRebook}
              disabled={!checkInDate || !checkOutDate}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Complete Rebooking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
