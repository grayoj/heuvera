import MapButton from "./MapButton";
import FilterButton from "./FilterButton";
import LeaseRentStays from "./LeaseRentStays";
import CategoryList from "./CategoryList";

const Categories = () => {
    return (
        <div className="w-full border-t border-b border-[#E3E2D9] h-[88px] flex flex-row items-center">
            {/* Map Button */}
            <MapButton />

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
