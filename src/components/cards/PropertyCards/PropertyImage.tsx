import BookmarkButton from "@heuvera/components/buttons/BookmarkButton";
import Image from "next/image";

export default function PropertyImage({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="relative w-full h-60 md:h-36 lg:h-28 xl:h-32 2xl:h-40">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Property"
          width={500}
          height={500}
          className="w-full h-full rounded-t-2xl object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-2xl">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      <div className="absolute top-3 right-3 size-8 md:size-8 lg:size-6 xl:size-6 2xl:size-8 bg-[#F8F7F2] dark:bg-[#333333] text-[#3e3e3e] dark:text-[#F8F7F2] font-bold flex items-center justify-center rounded-full shadow-md">
        <BookmarkButton />
      </div>
    </div>
  );
}
