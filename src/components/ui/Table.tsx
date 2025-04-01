import Image from "next/image";
import { pastBookings } from "../../app/data/array";

export default function BookingTable() {
  const tableHeadings = [
    "S/N",
    "Property Image",
    "Property Name",
    "Location",
    "Check-In & Check-Out",
    "Booking Status",
    "Price Paid",
    "Guests",
  ];

  return (
    <div className="relative 2xl:w-full xl:w-full lg:overflow-x-auto md:overflow-x-auto sm:overflow-x-auto shadow-md">
      {/* Responsive Table (Hidden on Mobile) */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left rtl:text-right text-tableText">
          <thead className="bg-[#E3E2D966] text-[#898989]">
            <tr className="text-center">
              {tableHeadings.map((heading, index) => (
                <th
                  key={index}
                  className={`py-4 px-3 border-x ${
                    index === 2 || index === 3
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
            {pastBookings.map((booking, index) => (
              <tr
                key={index}
                className="bg-[#F8F7F2] border-b text-center border-gray-200 hover:bg-gray-50"
              >
                <td className="border-x py-2">{index + 1}</td>
                <td className="border-x flex justify-center items-center py-2">
                  <Image
                    src="https://picsum.photos/50/36"
                    className="rounded-sm my-1.5"
                    height={36}
                    width={70}
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
      <div className="block md:hidden space-y-4 p-4">
        {pastBookings.map((booking, index) => (
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
