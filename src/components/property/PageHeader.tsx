'use client';

import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IoShareSocialOutline } from 'react-icons/io5';

export default function PageHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between">
      <div
        onClick={() => router.back()}
        className="cursor-pointer flex flex-row gap-5 items-center"
      >
        <BsArrowLeft className="text-[#898989] text-xl md:text-base lg:text-base xl:text-xl 2xl:text-xl" />
        <h1 className="text-base md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif text-[#898989]">
          Island
        </h1>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <h1 className="text-base md:text-sm lg:text-sm xl:text-base 2xl:text-base font-serif text-[#898989]">
          Share
        </h1>
        <IoShareSocialOutline className="text-[#898989] text-xl md:text-base lg:text-base xl:text-xl 2xl:text-xl" />
      </div>
    </div>
  );
}
