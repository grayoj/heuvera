import Image from 'next/image';
import { pastBookings } from '../../app/data/array';

export default function BookingTable() {
  const tableHeadings = [
    'S/N',
    'Property Image',
    'Property Name',
    'Location',
    'Check-In Date & Check-Out Date',
    'Booking Status',
    'Price Paid',
    'Number of Guests',
  ];
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="text-14px w-fit text-sm text-left rtl:text-right text-tableText">
        <thead className="bg-[#E3E2D966] text-[#898989]">
          <tr className="text-center">
            {tableHeadings.map((heading, index) => (
              <th
                key={index}
                scope="col"
                className={`py-4 px-3 whitespace-nowrap border-x ${
                  index === tableHeadings.length - 1 ? 'border-r' : ''
                }`}
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
              <td className="border-x">{index + 1}</td>
              <td className="border-x flex justify-center items-center">
                <Image
                  src="https://picsum.photos/50/36"
                  className="rounded-md my-1.5"
                  height={36}
                  width={50}
                  alt="fun"
                />
              </td>
              <td className="border-x">{booking.name}</td>
              <td className="border-x">{booking.location}</td>
              <td className="border-x">{booking.date}</td>
              <td className="border-x">{booking.status}</td>
              <td className="border-x">{booking.pricePaid}</td>
              <td className="border-x">{booking.noOfGuests}</td>
            </tr>
          ))}
          {/* Default last row */}
          <tr className="bg-[#F8F7F2] border-b text-center border-gray-200 hover:bg-gray-50 h-[20vh]">
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
            <td className="border-x"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
