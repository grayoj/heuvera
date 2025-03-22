"use client";

import { useRouter } from "next/navigation";
import MapButton from "./MapButton";
import FilterButton from "./FilterButton";
import LeaseRentStays from "./LeaseRentStays";
import CategoryList from "./CategoryList";
import useIsMobile from "@heuvera/hooks/IsMobile";

const Categories = () => {
    const router = useRouter();
    const isMobile = useIsMobile(); // Check if it's mobile

    const ToMap = () => {
        router.push("/explore/map");
    };

    return (
        <div
            className={`w-full border-b border-[#E3E2D9] ${isMobile ? "h-[130px]" : "h-[88px] border-t"} flex flex-row items-center`}
        >
            {isMobile ? (
                // Mobile Layout
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex justify-between">
                        <MapButton onClick={ToMap} />
                        <LeaseRentStays />
                        <FilterButton />
                    </div>
                    <CategoryList />
                </div>
            ) : (
                // Desktop Layout
                <>
                    <MapButton onClick={ToMap} />

                    {/* Lease, Rent, Stays Section */}
                    <div className="flex items-center w-full justify-evenly">
                        <LeaseRentStays />

                        {/* Divider */}
                        <div className="h-8 border-[#E3E2D9] border-l" />

                        {/* Categories List */}
                        <CategoryList />

                        {/* Divider */}
                        <div className="h-8 border-[#E3E2D9] border-l" />
                    </div>

                    <FilterButton />
                </>
            )}
        </div>
    );
};

export default Categories;