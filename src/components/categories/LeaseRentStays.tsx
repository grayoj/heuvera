"use client";

import { useState } from "react";

const LeaseRentStays = () => {
  const [selected, setSelected] = useState("Lease");

  return (
    <div className="h-9 md:h-10 lg:h-10 xl:h-10 2xl:h-10 bg-[#E3E2D9] flex gap-1 items-center rounded-sm px-1 min-w-fit">
      {["Lease", "Rent", "Stays"].map((option) => (
        <button
          key={option}
          className={`h-7 md:h-8 lg:h-8 xl:h-8 2xl:h-8 px-2 md:px-4 lg:px-4 xl:px-4 2xl:px-4 rounded-sm text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-serif font-medium transition-all ${selected === option ? "bg-[#F5F5F0] text-black" : "text-gray-600"
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
