"use client";
import { PropertyData } from "./components/Arrays/PropertyData";
import PropertyCard from "./components/cards/PropertyCards/PropertyCard";
import Categories from "./components/Categories/Categories";
import NavigationBar from "./components/navigation/navigationbar";



export default function Home() {
  return (
    <>
      <div className="bg-[#F3F2EC] px-20 h-screen">
        <NavigationBar />
        <Categories />
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-10 justify-items-stretch">
          {PropertyData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
