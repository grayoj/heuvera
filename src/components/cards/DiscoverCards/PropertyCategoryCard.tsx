import Image from "next/image";

interface PropertyCategoryCardProps {
  category: string;
  count: number;
  imageUrl: string;
}

export function PropertyCategoryCard({
  category,
  count,
  imageUrl,
}: PropertyCategoryCardProps) {
  return (
    <div className="relative w-full h-96 md:h-56 lg:h-52 xl:h-60 2xl:h-96 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageUrl || "/town.jpg"}
        width={500}
        height={500}
        alt={`${category} property`}
        className="w-full h-full object-cover rounded-2xl"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl z-10"></div>

      {/* Text Content */}
      <div className="absolute left-14 md:left-6 lg:left-6 xl:left-8 2xl:left-14 top-14 md:top-6 lg:top-6 xl:top-8 2xl:top-14 text-white z-20">
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
