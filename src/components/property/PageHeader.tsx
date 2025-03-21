'use client';

import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation'; // Import useRouter
import { IoShareSocialOutline } from 'react-icons/io5';

export default function PageHeader() {
  const router = useRouter(); // Initialize router
  return (
    <div className="flex flex-row justify-between">
      <div
        onClick={() => router.back()}
        className="cursor-pointer flex flex-row gap-5 items-center"
      >
        {' '}
        {/* Clickable for navigation */}
        <BsArrowLeft className="text-[#898989] text-xl" />
        <h1 className="text-base font-serif text-[#898989]">Island</h1>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-base font-serif text-[#898989]">Share</h1>
        <IoShareSocialOutline className="text-[#898989] text-xl" />
      </div>
    </div>
  );
}
