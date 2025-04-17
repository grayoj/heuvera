import { upcomingBookings } from "../../app/data/array";

export default function UpcomingBookingTable() {
  const tableHeadings = [
    "S/N",
    "Guest Name",
    "Check-In Date & Check-Out Date",
    "Property Name",
    "Booking Status",
  ];
  return (
    <div className="relative overflow-x-auto ">
      <table className="text-14px w-full text-sm text-left rtl:text-right text-tableText">
      <thead className="bg-[#E3E2D966] dark:bg-[#55555566] text-[#898989] dark:text-[#666666]">
            <tr className="text-center">
              {tableHeadings.map((heading, index) => (
                <th
                  key={index}
                  className={`py-4 px-3 border-x ${index === 2 || index === 3
                    ? "break-words"
                    : "whitespace-nowrap"
                    } ${index === tableHeadings.length - 1 ? "border-r" : ""}`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
        <tbody>
          {upcomingBookings.map((booking, index) => (
            <tr
              key={index}
              className="bg-[#F8F7F2] dark:bg-[#333333] border-b text-center border-gray-200 dark:border-[#555555] hover:bg-gray-50"
            >
              <td className="border-x">{index + 1}</td>
              <td className="border-x py-3 px-14">{booking.guestName}</td>
              <td className="border-x ">{booking.date}</td>
              <td className="border-x">{booking.propertyName}</td>
              <td
                className={`${booking.status === "Pending" ? "text-[#FF9500]" : "text-[#03B10F]"} border-x`}
              >
                {booking.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
