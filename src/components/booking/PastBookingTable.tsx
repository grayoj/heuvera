import Image from "next/image";
import { pastAdminBookings } from "../../app/data/array";

export default function BookingTable() {
  const tableHeadings = [
    "S/N",
    "Property Image",
    "Property Name",
    "Location",
    "Check-In Date & Check-Out Date",
    "Booking Status",
    "Price Paid",
    "Number of Guests",
  ];
  return (
    <div className="relative 2xl:w-full xl:w-full lg:overflow-x-auto md:overflow-x-auto sm:overflow-x-auto shadow-none md:shadow-md">
      <div className="hidden md:block">
        <table className="w-full text-sm text-left rtl:text-right text-tableText">
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
            {pastAdminBookings.map((booking, index) => (
              <tr
                key={index}
                className="bg-[#F8F7F2] dark:bg-[#333333] border-b text-center border-gray-200 dark:border-[#555555] hover:bg-gray-50"
              >
                <td className="border-x py-2">{index + 1}</td>
                <td className="border-x flex justify-center items-center py-2">
                  <Image
                    src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="rounded-sm my-1.5"
                    height={36}
                    width={72}
                    alt="booking history"
                  />
                </td>
                <td className="border-x py-2 px-2 break-words">
                  {booking.name}
                </td>
                <td className="border-x py-2 px-2 break-words">
                  {booking.location}
                </td>
                <td className="border-x py-2 whitespace-nowrap">
                  {booking.date}
                </td>
                <td className="border-x py-2 whitespace-nowrap">
                  {booking.status}
                </td>
                <td className="border-x py-2 whitespace-nowrap">
                  {booking.pricePaid}
                </td>
                <td className="border-x py-2 whitespace-nowrap">
                  {booking.noOfGuests}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Cards (Visible on Small Screens) */}
      <div className="block md:hidden space-y-4 gap-5">
        {pastAdminBookings.map((booking, index) => (
          <div key={index} className="bg-[#F8F7F2] p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <Image
                src="https://picsum.photos/50/36"
                className="rounded-md"
                height={36}
                width={50}
                alt="Property Image"
              />
              <div>
                <h3 className="font-semibold">{booking.name}</h3>
                <p className="text-xs text-[#898989]">{booking.location}</p>
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
