"use client";

import { useState } from "react";

const LeaseRentStays = () => {
  const [selected, setSelected] = useState("Rent");

  return (
    <div className="h-10 md:h-9 lg:h-9 xl:h-9 2xl:h-9 bg-[#E3E2D9] dark:bg-[#555555] flex gap-1 items-center rounded-sm px-1 w-full md:w-auto md:min-w-fit">
      {["Rent", "Stays"].map((option) => (
        <button
          key={option}
          className={`h-8 md:h-7 lg:h-7 xl:h-7 2xl:h-7 px-0 w-full md:w-auto md:px-2 lg:px-2 xl:px-4 2xl:px-4 rounded-[4px] text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-serif font-medium transition-all ${
            selected === option
              ? "bg-[#FBFAF6] dark:bg-[#333333] text-black dark:text-gray-100"
              : "text-gray-600 dark:text-gray-200"
          }`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default LeaseRentStays;
