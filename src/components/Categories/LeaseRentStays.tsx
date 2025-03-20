"use client";
import { useState } from "react";

const LeaseRentStays = () => {
    const [selected, setSelected] = useState("Lease");

    return (
        <div className="h-10 bg-[#E3E2D9] flex gap-1 items-center rounded-sm px-1 min-w-fit">
            {["Lease", "Rent", "Stays"].map((option) => (
                <button
                    key={option}
                    className={`h-8 px-4 rounded-sm text-base font-serif font-medium transition-all ${selected === option ? "bg-[#F5F5F0] text-black" : "text-gray-600"
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
