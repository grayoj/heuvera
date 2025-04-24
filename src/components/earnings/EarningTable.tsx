import { CheckCircle2, CircleOff, XCircle } from "lucide-react";
import { earningsTable } from "../../app/data/array";
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

export type PaymentStatus = "Successful" | "Pending" | "Unsuccessful";
export type PastBooking = {
  id: string | number;
  paymentMethod: string;
  date: string;
  status: PaymentStatus;
  pricePaid: number;
};

const getStatusInfo = (
  status: PaymentStatus,
): {
  icon: React.ReactNode;
  color: string;
  badgeClass: string;
} => {
  switch (status) {
    case "Successful":
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
    case "Unsuccessful":
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

interface EarningsTableProps {
  bookings?: PastBooking[];
  isLoading?: boolean;
  error?: string;
}

export default function EarningTable({
  bookings = [],
  isLoading = false,
  error,
}: EarningsTableProps) {
  // // Show error state
  if (error) {
    return (
      <ErrorState
        errorMessage="Failed to load earnings history."
        error={error}
      />
    );
  }

  // // Show empty state
  if (!isLoading && bookings.length === 0) {
    return (
      <EmptyState
        errorMessage="No Earnings History"
        errorSubMessage="You don't have any past earnings yet."
      />
    );
  }

  const EarningsTableHeadings = [
    {
      title: "S/N",
    },
    {
      title: "Payment Method",
    },
    {
      title: "Date of Payment",
    },
    {
      title: "Amount",
    },
    {
      title: "Payment Status",
    },
  ];

  const EarningsData = [
    {
      method: "",
      date: "",
      amount: "",
      status: "Pending" as PaymentStatus,
    },
    {
      method: "",
      date: "",
      amount: "",
      status: "Successful" as PaymentStatus,
    },
  ];

  return (
    <div className="relative overflow-x-auto rounded-md border border-[#D3D2C9] dark:border-[#666666]">
      <Table className="text-14px w-full text-sm text-left rtl:text-right text-tableText">
        <TableHeader>
          <TableRow className="bg-[#E3E2D9] border-b border-[#D3D2C9] dark:border-b-[#666666] dark:bg-[#555555] hover:bg-[#E3E2D999] dark:hover:bg-[#666666]">
            {EarningsTableHeadings.map((heading, index) => (
              <TableHead className="text-[#444444] dark:text-[#F7F7F7] text-center border-x border-[#D3D2C9] dark:border-[#666666] first:border-l-0 last:border-r-0">
                {heading.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {EarningsData.map((booking, index) => {
            const statusInfo = getStatusInfo(booking.status);
            return (
              <TableRow
                key={index}
                className="bg-[#F8F7F2] dark:bg-[#333333] border-b text-center border-[#D3D2C9] hover:bg-[#F0EFE9] dark:hover:bg-[#44444422]"
              >
                <TableCell className="border-x border-x-[#D3D2C9] dark:border-x-[#666666] border-l-0 break-words">
                  {index + 1}
                </TableCell>
                <TableCell className="border-x border-x-[#D3D2C9] dark:border-x-[#666666] break-words">
                  {booking.method}
                </TableCell>
                <TableCell className="border-x border-x-[#D3D2C9] dark:border-x-[#666666] break-words">
                  {booking.date}
                </TableCell>
                <TableCell className="border-x border-x-[#D3D2C9] dark:border-x-[#666666] break-words">
                  {booking.amount}
                </TableCell>
                <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    {statusInfo.icon}
                    <Badge variant="outline" className={statusInfo.badgeClass}>
                      {booking.status}
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
