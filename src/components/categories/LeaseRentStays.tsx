'use client';

import { useState } from 'react';

const LeaseRentStays = () => {
  const [selected, setSelected] = useState('Rent');

  return (
    <div className="h-9 md:h-9 lg:h-9 xl:h-10 2xl:h-10 bg-[#E3E2D9] flex gap-1 items-center rounded-sm px-1 w-full md:w-auto md:min-w-fit">
      {['Rent', 'Stays'].map((option) => (
        <button
          key={option}
          className={`h-7 md:h-7 lg:h-7 xl:h-8 2xl:h-8 px-0 w-full md:w-auto md:px-2 lg:px-2 xl:px-4 2xl:px-4 rounded-sm text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif font-medium transition-all ${
            selected === option ? 'bg-[#F5F5F0] text-black' : 'text-gray-600'
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
