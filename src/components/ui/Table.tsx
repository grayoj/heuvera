import { pastBookings } from '../../app/data/array';

export default function BookingTable() {
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="text-14px w-fit text-sm text-left rtl:text-right text-tableText">
        <thead className="bg-[#E3E2D9]">
          <tr>
            <th scope="col" className="px-2 py-3 w-[5%] border-x">
              S/N
            </th>
            <th scope="col" className="px-2 py-3 w-[10%] border-x">
              Property Image
            </th>
            <th scope="col" className="px-6 py-3 w-[20%] border-x">
              Property Name
            </th>
            <th scope="col" className="px-6 py-3 w-[20%] border-x">
              Location
            </th>
            <th scope="col" className="px-6 py-3 w-[25%] border-x">
              Check-In Date & Check-Out Date
            </th>
            <th scope="col" className="px-6 py-3 w-[10%] border-x">
              Booking Status
            </th>
            <th scope="col" className="px-6 py-3 w-[10%] border-x">
              Price Paid
            </th>
            <th scope="col" className="px-6 py-3 w-[10%] border-x">
              Number of Guests
            </th>
          </tr>
        </thead>
        <tbody>
          {pastBookings.map((booking, index) => (
            <tr
              key={index}
              className="bg-[#F8F7F2] border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-2 py-4 w-[5%] border-x">{index + 1}</td>
              <td className="px-2 py-4 w-[10%] border-x">{booking.image}</td>
              <td className="px-6 py-4 w-[20%] border-x">{booking.name}</td>
              <td className="px-6 py-4 w-[20%] border-x">{booking.location}</td>
              <td className="px-6 py-4 w-[25%] border-x">{booking.date}</td>
              <td className="px-6 py-4 w-[10%] border-x">{booking.status}</td>
              <td className="px-6 py-4 w-[10%] border-x">
                {booking.pricePaid}
              </td>
              <td className="px-6 py-4 w-[10%] border-x">
                {booking.noOfGuests}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
