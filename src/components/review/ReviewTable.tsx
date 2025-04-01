import { reviews } from '../../app/data/array';

export default function ReviewTable() {
  const tableHeadings = [
    'S/N',
    'Guest Name',
    'Review Date',
    'Rating',
    'Review Content',
  ];
  return (
    <div className="relative overflow-x-auto ">
      <table className="text-14px w-full text-sm text-left rtl:text-right text-tableText">
        <thead className="bg-[#E3E2D966] text-[#898989]">
          <tr className="text-center">
            {tableHeadings.map((heading, index) => (
              <th
                key={index}
                scope="col"
                className={`${index === 0 && 'py-4 px-3'} py-4 px-3 whitespace-nowrap border-x ${
                  index === tableHeadings.length - 1 ? 'border-r' : ''
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr
              key={index}
              className="bg-[#F8F7F2] border-b text-center border-gray-200 hover:bg-gray-50 "
            >
              <td className="border-x">{index + 1}</td>
              <td className="border-x py-3 px-14">{review.guestName}</td>
              <td className="border-x ">{review.date}</td>
              <td className="border-x">{review.rating}</td>
              <td className="border-x px-4">{review.content}...<span className="text-[#323232] underline ml-1.5">  read more</span></td>
            </tr>
          ))}
          {/* Default last row */}
          <tr className="bg-[#F8F7F2] border-b text-center border-gray-200 hover:bg-gray-50 h-[20vh]">
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
