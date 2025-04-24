export default function PropertyCardSkeleton() {
  return (
    <div className="h-96 w-full md:size-60 lg:h-52 lg:w-56 xl:w-80 xl:h-70 2xl:size-80 rounded-2xl border border-[#D3D2C9] overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative w-full h-60 md:h-36 lg:h-28 xl:h-36 2xl:h-44 bg-gray-200 animate-pulse">
        <div className="absolute top-3 right-3 size-8 md:size-8 lg:size-6 xl:size-8 2xl:size-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Details Skeleton */}
      <div className="p-3 md:p-3 lg:p-3 xl:p-3 2xl:p-4 space-y-3">
        {/* Price and Verified Badge */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
        </div>

        {/* Address */}
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>

        {/* Icons and Rating */}
        <div className="flex justify-between items-center">
          {/* Icon Details */}
          <div className="flex space-x-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-1">
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-3 w-6 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="h-3 w-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
