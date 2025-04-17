"use client";

import { useState } from "react";
import { reviews } from "../../app/data/array";

export default function ReviewTable() {
  const tableHeadings = [
    "S/N",
    "Guest Name",
    "Review Date",
    "Rating",
    "Review Content",
  ];
  const [expand, setExpand] = useState(false);
  return (
    <div className="relative overflow-x-auto ">
      <table className="text-14px w-full text-sm text-left rtl:text-right text-tableText">
        <thead className="bg-[#E3E2D966] dark:bg-[#55555566] text-[#898989] dark:text-[#666666]">
          <tr className="text-center">
            {tableHeadings.map((heading, index) => (
              <th
                key={index}
                scope="col"
                className={`${index === 0 && "py-4 px-3"} py-4 px-3 whitespace-nowrap border-x ${index === tableHeadings.length - 1 ? "border-r" : ""
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
              className="bg-[#F8F7F2] dark:bg-[#333333] border-b text-center border-gray-200 dark:border-[#555555] hover:bg-gray-50"
            >
              <td className="border-x">{index + 1}</td>
              <td className="border-x py-3 px-14">{review.guestName}</td>
              <td className="border-x ">{review.date}</td>
              <td className="border-x">{review.rating}</td>
              <td className="border-x px-4">
                {review.content.length > 50 ? (
                  <>
                    {expand
                      ? review.content
                      : `${review.content.slice(0, 50)} ...`}
                    ...
                    <span
                      className="text-[#323232] underline ml-1.5 cursor-pointer"
                      onClick={() => setExpand((expand) => !expand)}
                    >
                      read {expand ? "less" : "more"}
                    </span>
                  </>
                ) : (
                  review.content
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
