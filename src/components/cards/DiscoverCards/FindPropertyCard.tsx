import Image from "next/image";

interface FindPropertyCard {
  category: string;
  count: number;
  imageUrl: string;
  width: string;
  height?: string;
}

export function FindPropertyCard({
  category,
  count,
  imageUrl,
  width = "w-3/12",
  height,
}: FindPropertyCard) {
  return (
    <div className={`${width} ${height} rounded-2xl bg-red-200 relative`}>
      <Image
        src={imageUrl || "/apartment.jpg"}
        width={500}
        height={500}
        alt={`${category} property`}
        className="h-full w-full object-cover rounded-2xl"
      />
      <div className="absolute inset-0 bg-black/50 rounded-2xl z-10"></div>

      <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-14 md:left-14 md:transform-none z-20 max-w-fit text-center whitespace-nowrap">
        <h1 className="text-xl font-medium font-serif text-white">
          {category}
        </h1>
        <h1 className="text-base font-normal font-serif text-white">
          {count} Properties
        </h1>
      </div>
    </div>
  );
}
