import Image from "next/image";

interface PropertyCategoryCard {
  category: string;
  count: number;
  imageUrl: string;
}

export function PropertyCategoryCard({
  category,
  count,
  imageUrl,
}: PropertyCategoryCard) {
  return (
    <div className="w-full h-96 md:h-56 lg:h-52 xl:h-60 2xl:h-96 rounded-2xl bg-red-200 relative">
      <Image
        src={imageUrl || "/town.jpg"}
        width={500}
        height={500}
        alt={`${category} property`}
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="flex flex-col absolute left-14 md:left-6 lg:left-6 xl:left-8 2xl:left-14 top-14 md:top-6 lg:top-6 xl:top-8 2xl:top-14">
        <h1 className="text-xl md:text-base lg:text-base xl:text-xl font-medium font-serif">
          {category || "Town House"}
        </h1>
        <h1 className="text-base md:text-base lg:text-sm xl:text-base font-normal font-serif">
          {count || 2} Properties
        </h1>
      </div>
    </div>
  );
}
