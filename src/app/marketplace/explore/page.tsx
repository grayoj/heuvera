import { PropertyData } from "@heuvera/app/components/Arrays/PropertyData";
import PropertyCard from "@heuvera/app/components/cards/PropertyCards/PropertyCard";
import Categories from "@heuvera/app/components/Categories/Categories";
import MarketplaceLayout from "../page";


export default function Explore() {
    return (
        <>
            <MarketplaceLayout>
                <div className="flex flex-col flex-1 h-full w-full">
                    <Categories />
                    <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-10 justify-items-stretch">
                        {PropertyData.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </MarketplaceLayout>
        </>
    )
}