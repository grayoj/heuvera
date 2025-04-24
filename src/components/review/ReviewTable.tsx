"use client";

import { useState } from "react";
import { reviews } from "../../app/data/array";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ReviewTable() {
  const TableHeadings = [
    {
      title: "S/N",
    },
    {
      title: "Guest Name",
    },
    {
      title: "Review Date",
    },
    {
      title: "Ratings",
    },
    {
      title: "Review Content",
    },
  ];
  const [expand, setExpand] = useState(false);
  return (
    <div className="relative overflow-x-auto ">
      <div className="rounded-md border border-[#D3D2C9] dark:border-[#666666] bg-[#F8F7F2] dark:bg-bg-[#333333] overflow-hidden">
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
            {reviews.map((review, index) => (
              <TableRow
                key={index}
                className="hover:bg-[#F0EFE9] dark:hover:bg-[#44444422] border-b border-b-[#D3D2C9] dark:border-b-[#666666] last:border-b-0"
              >
                <TableCell className="text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666] first:border-l-0">
                  {index + 1}
                </TableCell>
                <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                  {review.guestName}
                </TableCell>
                <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                  {review.date}
                </TableCell>
                <TableCell className="break-words text-center border-x border-x-[#D3D2C9] dark:border-x-[#666666]">
                  {review.rating}
                </TableCell>
                <TableCell className="text-center break-words border-x border-x-[#D3D2C9] dark:border-x-[#666666] last:border-r-0">
                  {review.content.length > 50 ? (
                    <>
                      {expand
                        ? review.content
                        : `${review.content.slice(0, 50)} ...`}
                      ...
                      <span
                        className="text-[#333333] underline ml-1.5 cursor-pointer"
                        onClick={() => setExpand((expand) => !expand)}
                      >
                        read {expand ? "less" : "more"}
                      </span>
                    </>
                  ) : (
                    review.content
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
