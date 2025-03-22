"use client";

import { useRouter } from "next/navigation";
import FilterButton from "./FilterButton";
import LeaseRentStays from "./LeaseRentStays";
import CategoryList from "./CategoryList";
import useIsMobile from "@heuvera/hooks/IsMobile";
import MapButton from "./MapButton";

const Categories = () => {
    const router = useRouter();

    // Function to navigate to /explore/map
    const handleMapNavigation = () => {
        router.push("/explore/map");
    };

    return (
        <div className="w-full border-t border-b border-[#E3E2D9] h-[88px] flex flex-row items-center">
            {/* Map Button */}
            <MapButton onClick={handleMapNavigation} />

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

            {/* Filter Button */}
            <FilterButton />
        </div>
    );
};

export default Categories;
