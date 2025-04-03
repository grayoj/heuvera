import React, { memo } from "react";
import { LucideSearch } from "lucide-react";
import { MobileSearchBarProps } from "@heuvera/utils/props";


export const MobileSearchBar = memo(({ openSearchModal }: MobileSearchBarProps) => {
    return (
        <div
            onClick={openSearchModal}
            className="w-full rounded-full h-16 bg-[#FBFAF6] dark:bg-[#444444] pl-4 pr-2 shadow-sm flex flex-row items-center justify-between"
        >
            <div className="flex flex-col justify-center h-full">
                <h1 className="font-serif font-medium text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                    Where
                </h1>
                <h1 className="font-serif text-sm text-[#323232] dark:text-[#FBFAF6]">
                    Anywhere
                </h1>
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]"></div>
            <div className="flex flex-col justify-center h-full">
                <h1 className="font-serif font-medium text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                    When
                </h1>
                <h1 className="font-serif text-sm text-[#323232] dark:text-[#FBFAF6]">
                    Any week
                </h1>
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]"></div>
            <div className="flex flex-col justify-center h-full">
                <h1 className="font-serif font-medium text-sm text-[#7B4F3A] dark:text-[#8B5F4D]">
                    Who
                </h1>
                <h1 className="font-serif text-sm text-[#323232] dark:text-[#FBFAF6]">
                    Add guests
                </h1>
            </div>
            <div className="bg-[#7B4F3A] dark:bg-[#8B5F4D] size-13 rounded-full flex items-center justify-center">
                <LucideSearch className="text-[#FBFAF6] text-2xl" />
            </div>
        </div>
    );
});